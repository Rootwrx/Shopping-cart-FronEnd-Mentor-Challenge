import { Cart } from "../app.js";
import { createCartItem } from "./createCartItem.js";
import { createProduct } from "./createProduct.js";
import { fetchProducts } from "./fetchProducts.js";
import {
  UUID,
  getProductData,
  $,
  $$,
  createElement,
  formatPrice,
  Actions,
  load,
} from "./utils.js";
export {
  load,
  UUID,
  getProductData,
  $,
  $$,
  createElement,
  formatPrice,
  Actions,
  Cart,
  createProduct,
  fetchProducts,
  createCartItem,
};

export const UISelectors = {
  ProductsContainer: $(".products"),
  CartContainer: $(".cart .cart-items"),
  ProductsContainer: $(".products"),
  ItemsCount: $(".cart .item-count"),
  CartEmpty: $(".cart .cart-empty"),
  CartHolder: $(".cart .cart-holder"),
  CartBody: $(".cart .cart-body"),
  CartTotalamount: $(".cart .total-amount"),
  Loader: $(".loader"),
  CartElement: $(".cart"),
  ConfirmOrder: $(".cart .confirm-order"),
  OrderConfirmed: $(".order-confirmed"),
  Overlay: $(".overlay"),
  CartIcon: $(".header .cart-icon"),
  StartNewOrder: $(".order-confirmed .start-new-order"),
};
