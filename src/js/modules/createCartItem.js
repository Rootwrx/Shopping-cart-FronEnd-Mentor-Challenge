import { createElement, formatPrice } from "./exporter.js";

const createCartItem = ({ price, name, quantity, id, thumbnail }, Items) => {
  const FromCart = Items?.find((ob) => ob.id == id);
  const cartItem = createElement("div", {
    class: "cart-item item",
    "data-id": id,
  });

  cartItem.innerHTML = `
                <div class="item-details">
                  <img src="${thumbnail}" alt="${name}" />
                  <div>
                    <h4 class="item-name">${name}</h4>
                    <p class="item-pricing">
                      <span class="item-quantity">${quantity}x</span>
                      <span class="item-price">@${price}</span>
                      <span class="item-total">${formatPrice(
                        FromCart ? FromCart.quantity * price : price
                      )}</span>
                    </p>
                  </div>
                </div>
                <span class="item-total toclone">${formatPrice(
                  FromCart ? FromCart.quantity * price : price
                )}</span>
                <button class="remove-cart-item btn-action">
                    <img src="assets/images/icon-remove-item.svg" alt="icon-remove-item" />
                </button>
  `;
  return cartItem;
};

export { createCartItem };
