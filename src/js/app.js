import {
  UISelectors,
  fetchProducts,
  getProductData,
  createCartItem,
  $$,
  $,
  formatPrice,
  load,
} from "./modules/exporter.js";
const Cart = {
  ...load(),
  save() {
    localStorage.setItem("cart", JSON.stringify(this));
  },
  addItem(obj) {
    const index = this.items.findIndex((el) => el.id == obj.id);
    let item = Cart.items[index];
    if (index == -1) {
      item = { ...obj, quantity: 1 };
      this.items.push(item);
      UI.renderCartItem(item);
    } else item.quantity++;
    this.UpdateTotal({ amount: item.price });
    UI.updateUi(item.id);
  },

  UpdateTotal({ amount }, op = "+", count) {
    Cart.total = eval(`${Cart.total} ${op} ${amount}`);
    if (count) Cart.itemsCount -= count;
    else Cart.itemsCount += op == "+" ? 1 : -1;
  },

  removeItem({ id, quantity, price }) {
    if (quantity == 1)
      $(
        `[data-id="${id}"] .remove-cart-item`,
        UISelectors.CartContainer
      ).click();
    else {
      const item = this.items.find((el) => el.id == id);
      item.quantity--;
      this.UpdateTotal({ amount: price }, "-");
      UI.updateUi(item.id);
    }
  },

  removeCompletly(id) {
    const index = this.items.findIndex((el) => el.id == id);
    const item = Cart.items[index];
    this.UpdateTotal(
      { amount: item.quantity * item.price },
      "-",
      item.quantity
    );
    this.items.splice(index, 1);
    UI.updateUi(id);
  },
};

const UI = {
  clonedCartBody: false,

  productsClick(event) {
    const { target } = event;
    if (!target.closest(".product")) return;
    const product = target.closest(".product");
    const obj = getProductData(product);
    if (target.closest(".remove")) Cart.removeItem(obj);
    if (target.closest(".addtocart, .addmore")) Cart.addItem(obj);
  },

  removeCartItem(id) {
    $(`[data-id="${id}"]`, UISelectors.ProductsContainer).classList.remove(
      "added"
    );
    $(`[data-id="${id}"]`, UISelectors.CartContainer).remove();
  },

  updateCartTotals() {
    UISelectors.ItemsCount.textContent = Cart.itemsCount;
    UISelectors.CartTotalamount.textContent = formatPrice(Cart.total);
  },

  renderCartItem(obj) {
    UISelectors.CartContainer.prepend(createCartItem(obj));
    $(`[data-id="${obj.id}"]`, UISelectors.ProductsContainer).classList.add(
      "added"
    );
  },

  ClickCart(event) {
    const { target } = event;
    if (!target.closest(".remove-cart-item")) return;
    const id = target.closest("[data-id]").dataset.id;
    Cart.removeCompletly(id);
  },

  updateUi(id) {
    const item = Cart.items.find((obj) => obj.id == id);
    if (item) {
      $$(`[data-id="${id}"]`).forEach((element) => {
        $(".item-quantity", element).textContent = item.quantity + "x";
      });
      const CartItem = $(`[data-id="${id}"]`, UISelectors.CartContainer);
      $$(`.item-total`, CartItem).forEach(
        (el) => (el.textContent = formatPrice(item.quantity * item.price))
      );
    } else this.removeCartItem(id);

    $(`[data-id="${id}"]`, UISelectors.ProductsContainer).dataset.quantity =
      item?.quantity || 0;
    this.updateCartTotals();
    this.toggleCartContent();
    Cart.save();
  },

  toggleCartContent() {
    const Cond = Cart.items.length > 0;
    UISelectors.CartEmpty.classList.toggle("hidden", Cond);
    UISelectors.CartHolder.classList.toggle("hidden", !Cond);
  },

  initializeCart() {
    if (Cart.itemsCount == 0) return;
    const fragment = document.createDocumentFragment();
    Cart.items.forEach((obj) =>
      fragment.prepend(createCartItem(obj, Cart.items))
    );
    UISelectors.CartContainer.appendChild(fragment);
    UI.toggleCartContent();
    UI.updateCartTotals();
  },
  ClickStartNewOrder() {
    Cart.items = [];
    Cart.total = 0;
    Cart.itemsCount = 0;
    Cart.save();

    // Update UI in batch
    UISelectors.CartContainer.innerHTML = "";
    this.updateCartTotals();
    this.toggleCartContent();

    // Remove 'added' class from all products
    $$(".product.added", UISelectors.ProductsContainer).forEach((el) =>
      el.classList.remove("added")
    );

    // Hide cart
    this.CartVisibility(false);
    UISelectors.OrderConfirmed.querySelector(".cloned").remove();
    UISelectors.OrderConfirmed.classList.remove("show");
    this.clonedCartBody = false;
  },

  CartVisibility(show) {
    UISelectors.Overlay.classList.toggle("show", show);
    UISelectors.CartElement.classList.toggle("show", show);
  },

  CartIconClick() {
    this.CartVisibility(true);
  },
  ClickOverlay() {
    this.CartVisibility(false);
    UISelectors.OrderConfirmed.classList.remove("show");
  },
  ClickConfirmOrder() {
    // Create a document fragment to build the clone off-DOM
    const fragment = document.createDocumentFragment();
    const clone = UISelectors.CartBody.cloneNode(true);
    clone.classList.add("cloned");
    fragment.appendChild(clone);

    // Update the OrderConfirmed section in one DOM operation
    if (this.clonedCartBody) {
      UISelectors.OrderConfirmed.replaceChild(
        fragment,
        $(".cloned", UISelectors.OrderConfirmed)
      );
    } else {
      UISelectors.OrderConfirmed.insertBefore(
        fragment,
        UISelectors.OrderConfirmed.lastElementChild
      );
      this.clonedCartBody = true;
    }

    // Show the confirmation and overlay
    UISelectors.OrderConfirmed.classList.add("show");
    UISelectors.Overlay.classList.add("show");
  },

  async init() {
    await fetchProducts(
      UISelectors.ProductsContainer,
      UISelectors.Loader,
      Cart
    );
    UISelectors.ProductsContainer.addEventListener("click", this.productsClick);
    UISelectors.CartContainer.addEventListener("click", this.ClickCart);
    UISelectors.Overlay.addEventListener("click", this.ClickOverlay.bind(this));
    UISelectors.StartNewOrder.addEventListener(
      "click",
      this.ClickStartNewOrder.bind(this)
    );
    UISelectors.CartIcon.addEventListener(
      "click",
      this.CartIconClick.bind(this)
    );
    UISelectors.ConfirmOrder.addEventListener(
      "click",
      this.ClickConfirmOrder.bind(this)
    );
    this.initializeCart();
  },
};

window.addEventListener("DOMContentLoaded", UI.init.bind(UI));

export { Cart };
