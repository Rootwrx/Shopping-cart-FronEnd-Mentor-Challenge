import {
  CreateCartItem,
  FetchProducts,
  formatPrice,
  $,
  Actions,
  $$,
  getObj,
} from "./exporter.js";

const ProductsContainer = $(".products"),
  CartContainer = $(".cart .cart-items"),
  CartHolder = $(".cart .cart-holder"),
  CartEmpty = $(".cart .cart-empty"),
  CartTotalElement = $(".cart .total-amount .cart-total"),
  CartIcon = $(".cart-icon"),
  CartElement = $(".cart"),
  ConfirmOrder = $(".confirm-order"),
  Overlay = $(".overlay"),
  OrderConfirmed = $(".order-confirmed"),
  StartNewOrder = $(".order-confirmed .start-new-order"),
  ItemsCount = $(".cart .item-count");

const Cart = JSON.parse(localStorage.getItem("cart")) || {
  items: [],
  total: 0,
  ItemsCount: 0,
};
const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(Cart));
};

const UpdateCart = (obj, action) => {
  const index = Cart.items.findIndex((el) => el.id === obj.id);
  let item = index !== -1 ? Cart.items[index] : null;

  switch (action) {
    case Actions.AddToCart:
      if (item) {
        item.quantity++;
      } else {
        CartInit(false);

        item = { ...obj, quantity: 1 };
        Cart.items.push(item);
        CartContainer.prepend(CreateCartItem(item));
      }
      $(`[data-id="${obj.id}"]`).classList.add("added");
      Cart.total += +obj.price;
      Cart.ItemsCount++;
      break;

    case Actions.AddMore:
      // if (item) {
      item.quantity++;
      Cart.total += +obj.price;
      Cart.ItemsCount++;

      // }
      break;

    case Actions.DeleteProduct:
      // if (item) {
      if (item.quantity > 1) {
        item.quantity--;
        Cart.ItemsCount--;
      } else
        $(`[data-id="${item.id}"] .remove-cart-item`, CartContainer).click();
      // else {
      //   Cart.items.splice(index, 1);
      //   $(`[data-id="${obj.id}"]`, CartContainer).remove();
      //   $(`[data-id="${obj.id}"]`).classList.remove("added");
      // }
      // Cart.total -= +obj.price;
      // }
      break;
  }

  UpdateItemUi(item);

  saveCart();
};

const CartInit = (empty = false) => {
  CartHolder.classList.toggle("hidden", empty);
  CartEmpty.classList.toggle("hidden", !empty);
};

const HandleClickConfirmOrder = () => {
  const clone = CartContainer.closest(".cart-body").cloneNode(true);
  clone.classList.add("cloned");
  OrderConfirmed.classList.add("show");
  OrderConfirmed.lastElementChild.before(clone);
  Overlay.classList.add("show");
  CartElement.classList.remove("show");
};
const HandleClickStartNewOrder = (event) => {
  Overlay.click();
  CartContainer.querySelectorAll(".cart-item .remove-cart-item").forEach((el) =>
    el.click()
  );
  $(".cart-body", OrderConfirmed)?.remove();
  Cart.ItemsCount = 0;
  saveCart();
};

const handleCartClick = (event) => {
  const { target } = event;
  if (!target.closest(".remove-cart-item")) return;
  const id = target.closest(".cart-item").dataset.id;
  const index = Cart.items.findIndex((el) => el.id === id);
  const item = Cart.items[index];
  $(`[data-id="${id}"]`, CartContainer).remove();
  $(`[data-id="${id}"]`, ProductsContainer).classList.remove("added");
  $(`[data-id="${id}"]`, ProductsContainer).dataset.quantity = 0;

  Cart.total = Cart.total - item.quantity * item.price;
  CartTotalElement.textContent = formatPrice(Cart.total);
  Cart.ItemsCount -= item.quantity;
  ItemsCount.textContent = Cart.ItemsCount;

  Cart.items.splice(index, 1);
  if (Cart.items.length < 1) CartInit(true);

  saveCart();
};

const UpdateItemUi = (item) => {
  CartTotalElement.textContent = formatPrice(Cart.total);
  ItemsCount.textContent = Cart.ItemsCount;

  if (Cart.items.length === 0) {
    CartInit(true);
  }
  if (item) {
    $$(`[data-id="${item.id}"]`).forEach((el) => {
      el.dataset.quantity = item.quantity;
      $(".item-quantity", el).textContent = item.quantity + "x";
    });
    $$(`[data-id="${item.id}"] .item-total`, CartContainer).forEach((el) => {
      el.textContent = "$" + formatPrice(item.quantity * item.price);
    });
  }
};

const HandleProductClick = (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const product = target.closest(".product");
  if (!product) return;

  const obj = getObj(product);
  const action = target.dataset.action;

  switch (action) {
    case "add":
      UpdateCart(obj, Actions.AddToCart);
      break;
    case "addmore":
      UpdateCart(obj, Actions.AddMore);
      break;
    case "delete":
      UpdateCart(obj, Actions.DeleteProduct);
      break;
  }
};

const toggleCart = (show) => {
  CartElement.classList.toggle("show", show);
  Overlay.classList.toggle("show", show);
};

const init = async () => {
  await FetchProducts(ProductsContainer, Cart);
  ProductsContainer.addEventListener("click", HandleProductClick);
  Initialize();
  ConfirmOrder.addEventListener("click", HandleClickConfirmOrder);
  CartContainer.addEventListener("click", handleCartClick);
  CartIcon.addEventListener("click", () => toggleCart(true));
  StartNewOrder.addEventListener("click", HandleClickStartNewOrder);
  Overlay.addEventListener("click", () => {
    toggleCart(false);
    OrderConfirmed.classList?.remove("show");
    $(".cart-body", OrderConfirmed)?.remove();
  });
};

const Initialize = () => {
  if (Cart.items.length > 0) {
    const fragment = document.createDocumentFragment();
    Cart.items.forEach((obj) => fragment.prepend(CreateCartItem(obj)));
    CartContainer.appendChild(fragment);
    CartInit();
    CartTotalElement.textContent = formatPrice(Cart.total);
    ItemsCount.textContent = Cart.ItemsCount;
  }
};

window.addEventListener("DOMContentLoaded", init);
