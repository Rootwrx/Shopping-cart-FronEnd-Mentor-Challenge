// utils.js
const createElement = (tag, attributes = {}) => {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) =>
    element.setAttribute(key, value)
  );
  return element;
};

const get = (selector, parent = document) => parent.querySelector(selector);
const getAll = (selector, parent = document) =>
  parent.querySelectorAll(selector);

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

const UUID = () => Math.random().toString(36).substr(2, 9);

const debouncer = (fn, s) => {
  let timer;
  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(context, args), s);
  };
};

HTMLElement.prototype.get = function (selector) {
  this.querySelector(selector);
};
HTMLElement.prototype.getAll = function (selector) {
  this.querySelector(selector);
};
// function extractPathExtension(imagePath) {
//   // Find the last dot in the path to split the extension
//   const lastDotIndex = imagePath.lastIndexOf(".");

//   // Separate the path without the extension and the extension itself
//   const pathWithoutExtension = imagePath.slice(0, lastDotIndex);
//   const extension = imagePath.slice(lastDotIndex + 1);

//   return [pathWithoutExtension, extension];
// }

export {
  UUID,
  load,
  getProductData,
  get,
  getAll,
  createElement,
  formatPrice,
  Actions,
  debouncer,
};
