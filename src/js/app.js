import {
  UISelectors,
  fetchProducts,
  getProductData,
  createCartItem,
  getAll,
  get,
  formatPrice,
  load,
} from "./modules/exporter.js";
import { LazyLoader } from "./modules/lazyloader.js";
import { debouncer } from "./modules/utils.js";
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
      get(
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

  //end lazyloader
  productsClick(event) {
    const { target } = event;
    if (!target.closest(".product")) return;
    const product = target.closest(".product");
    const obj = getProductData(product);
    if (target.closest(".remove")) Cart.removeItem(obj);
    if (target.closest(".addtocart, .addmore")) Cart.addItem(obj);
  },

  removeCartItem(id) {
    get(`[data-id="${id}"]`, UISelectors.ProductsContainer).classList.remove(
      "added"
    );
    get(`[data-id="${id}"]`, UISelectors.CartContainer).remove();
  },

  updateCartTotals() {
    UISelectors.ItemsCount.textContent = Cart.itemsCount;
    UISelectors.CartTotalamount.textContent = formatPrice(Cart.total);
  },

  renderCartItem(obj) {
    UISelectors.CartContainer.prepend(createCartItem(obj));
    get(`[data-id="${obj.id}"]`, UISelectors.ProductsContainer).classList.add(
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
      getAll(`[data-id="${id}"]`).forEach((element) => {
        get(".item-quantity", element).textContent = item.quantity + "x";
      });
      const CartItem = get(`[data-id="${id}"]`, UISelectors.CartContainer);
      getAll(`.item-total`, CartItem).forEach(
        (el) => (el.textContent = formatPrice(item.quantity * item.price))
      );
    } else this.removeCartItem(id);

    get(`[data-id="${id}"]`, UISelectors.ProductsContainer).dataset.quantity =
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
  resetUI() {
    Cart.items = [];
    Cart.total = 0;
    Cart.itemsCount = 0;
    Cart.save();

    // Update UI in batch
    UISelectors.CartContainer.innerHTML = "";
    this.updateCartTotals();
    this.toggleCartContent();

    // Remove 'added' class from all products
    getAll(".product.added", UISelectors.ProductsContainer).forEach((el) =>
      el.classList.remove("added")
    );

    // Hide cart
    this.CartVisibility(false);
    UISelectors.OrderConfirmed.querySelector(".cloned").remove();
    UISelectors.OrderConfirmed.classList.remove("show");
    this.clonedCartBody = false;
  },

  showHeader() {
  let previousScroll = 0; // Initialize to track previous scroll position

  return function () {
    const currentScroll = window.scrollY; 

    if (currentScroll > 50) {
      if (currentScroll > previousScroll) {
        // Scrolling down
        UISelectors.Header.classList.remove("show");
        UISelectors.Header.classList.add("hidden");
      } else {
        // Scrolling up
        UISelectors.Header.classList.remove("hidden");
        UISelectors.Header.classList.add("show");
      }
    } else {
      // Scrolling less than 50 pixels
      UISelectors.Header.classList.remove("show", "hidden");
    }

    previousScroll = currentScroll; 
  };
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
  ConfirmOrder() {
    // Create a document fragment to build the clone off-DOM
    const fragment = document.createDocumentFragment();
    const clone = UISelectors.CartBody.cloneNode(true);
    clone.classList.add("cloned");
    fragment.appendChild(clone);

    // Update the OrderConfirmed section in one DOM operation
    if (this.clonedCartBody) {
      UISelectors.OrderConfirmed.replaceChild(
        fragment,
        get(".cloned", UISelectors.OrderConfirmed)
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
    new LazyLoader().observe(getAll(".lazy-load"));

    UISelectors.ProductsContainer.addEventListener("click", this.productsClick);
    UISelectors.CartContainer.addEventListener("click", this.ClickCart);
    UISelectors.Overlay.addEventListener("click", this.ClickOverlay.bind(this));
    UISelectors.StartNewOrder.addEventListener(
      "click",
      this.resetUI.bind(this)
    );
    UISelectors.CartIcon.addEventListener(
      "click",
      this.CartIconClick.bind(this)
    );
    UISelectors.ConfirmOrder.addEventListener(
      "click",
      this.ConfirmOrder.bind(this)
    );
    this.initializeCart();
    window.addEventListener("scroll", debouncer(this.showHeader(), 10));
  },
};

window.addEventListener("DOMContentLoaded", UI.init.bind(UI));

export { Cart };
/*


*/
