import { Cart } from "../app.js";
import { createCartItem } from "./createCartItem.js";
import { createProduct } from "./createProduct.js";
import { fetchProducts } from "./fetchProducts.js";
import {
  UUID,
  getProductData,
  get,
  getAll,
  createElement,
  formatPrice,
  Actions,
  load,
} from "./utils.js";
export {
  load,
  UUID,
  getProductData,
  get,
  getAll,
  createElement,
  formatPrice,
  Actions,
  Cart,
  createProduct,
  fetchProducts,
  createCartItem,
};
export const UISelectors = {
  ProductsContainer: get(".products"),
  CartContainer: get(".cart .cart-items"),
  ProductsContainer: get(".products"),
  ItemsCount: get(".cart .item-count"),
  CartEmpty: get(".cart .cart-empty"),
  CartHolder: get(".cart .cart-holder"),
  CartBody: get(".cart .cart-body"),
  CartTotalamount: get(".cart .total-amount"),
  Loader: get(".page-loader"),
  CartElement: get(".cart"),
  ConfirmOrder: get(".cart .confirm-order"),
  OrderConfirmed: get(".order-confirmed"),
  Overlay: get(".overlay"),
  CartIcon: get(".header .cart-icon"),
  StartNewOrder: get(".order-confirmed .start-new-order"),
  Header: get(".header"),
};
