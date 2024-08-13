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

const formatPrice = (price) => {
  return (+price).toFixed(2);
};
const Actions = {
  AddMore: "Add_More",
  RemoveCompletly: "Remove_Completly",
  DeleteProduct: "Remove_Product",
  AddToCart: "AddToCart",
};

const getObj = (product) => {
  const { dataset } = product;
  return {
    id: dataset.id,
    price: formatPrice(dataset.price),
    name: dataset.name,
    quantity: dataset.quantity,
    image: dataset.image,
  };
};

const UUID = () =>
  "xxxx-xxx-xxx".replace(/[xy]/g, (c) => {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
export { UUID, getObj, $, $$, createElement, formatPrice, Actions };
