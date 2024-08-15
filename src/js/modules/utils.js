// utils.js
const createElement = (tag, attributes = {}) => {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) =>
    element.setAttribute(key, value)
  );
  return element;
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => parent.querySelectorAll(selector);

const formatPrice = (price, no) =>
  no ? "" : "$" + parseFloat(price).toFixed(2);
const Actions = {
  AddMore: "Add_More",
  RemoveCompletly: "Remove_Completly",
  DeleteProduct: "Remove_Product",
  AddToCart: "AddToCart",
};

const getProductData = (product) => {
  const { dataset } = product;
  return {
    id: dataset.id,
    price: dataset.price,
    name: dataset.name,
    quantity: dataset.quantity,
    thumbnail: dataset.thumbnail,
  };
};

const load = () => {
  const data = JSON.parse(localStorage.getItem("cart"));
  return {
    items: data?.items || [],
    itemsCount: data?.itemsCount || 0,
    total: data?.total || 0,
  };
};

// const UUID = () =>
//   "xxxx-xxx-xxx".replace(/[xy]/g, (c) => {
//     var r = (Math.random() * 16) | 0,
//       v = c == "x" ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });
const UUID = () => Math.random().toString(36).substr(2, 9);
export {
  UUID,
  load,
  getProductData,
  $,
  $$,
  createElement,
  formatPrice,
  Actions,
};
