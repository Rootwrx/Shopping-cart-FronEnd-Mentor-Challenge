import { createElement } from "./exporter.js";

const CreateCartItem = ({ price, name, quantity  ,id, image }) => {
  const cartItem = createElement("div", {
    class: "cart-item item",
    "data-id": id,
  });

  cartItem.innerHTML = `
                <div class="item-details">
                  <img src="${image}" alt="${name}" />
                  <div>
                    <h4 class="item-name">${name}</h4>
                    <p class="item-pricing">
                      <span class="item-quantity">${quantity}x</span>
                      <span class="item-price">@${price}</span>
                      <span class="item-total">$${price}</span>
                    </p>
                  </div>
                </div>
                <span class="item-total toclone">$${price}</span>
                <button class="remove-cart-item btn-xs">
                  <i class="bx bx-x"></i>
                </button>
  `;
  return cartItem;
};

export { CreateCartItem };
