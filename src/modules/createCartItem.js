import { createElement, formatPrice } from "./exporter.js";

const createCartItem = ({ price, name, quantity, id, thumbnail }, Items) => {
  const FromCart = Items?.find((ob) => ob.id == id);
  const cartItem = createElement("article", {
    class: "cart-item item",
    "data-id": id,
  });

  cartItem.innerHTML = `
                <div class="item-details">
                  <img src="${thumbnail}" alt="${name}" />
                  <div>
                    <h4 class="item-name">${name}</h4>
                    <p class="item-pricing">
                      <span class="item-quantity" aria-live="polite">${quantity}x</span>
                      <span class="item-price">@${price}</span>
                      <span class="item-total" aria-live="polite">${formatPrice(
                        FromCart ? FromCart.quantity * price : price
                      )}</span>
                    </p>
                  </div>
                </div>
                <span class="item-total toclone" aria-live="polite">${formatPrice(
                  FromCart ? FromCart.quantity * price : price
                )}</span>
                <button class="remove-cart-item btn-action" aria-label="Remove ${name} from cart">
                    <img src="images/icon-remove-item.svg"  aria-hidden="true" alt="" />
                     
                </button>
  `;
  return cartItem;
};

export { createCartItem };
