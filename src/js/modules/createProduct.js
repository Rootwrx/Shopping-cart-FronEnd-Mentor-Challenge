import { createElement, formatPrice, UUID } from "./exporter.js";
const createProduct = (
  { price, category, name, image: { thumbnail, mobile, desktop, tablet } },
  Cart
) => {
  const FromCart = Cart?.items.find((ob) => ob.name == name);
  const product = createElement("div", {
    class: `product loader ${FromCart ? "added" : ""}`,
    "data-id": FromCart ? FromCart.id : UUID(),
    "data-quantity": FromCart ? FromCart.quantity : 0,
    "data-price": price,
    "data-name": name,
    "data-thumbnail": thumbnail,
  });
  product.innerHTML = `
            <div class="product-image">
              <div class="image">
                <img
                  src="${mobile}"
                  srcset="
                    ${mobile}  654w,
                    ${tablet}  427w,
                    ${desktop} 502w
                  "
                  alt="${name}"
                  class="lazy"
                />
               
              </div>
              <div class="product-actions" aria-label="Product actions">
                <button data-action="addtocart" class="addtocart main-btn" aria-label="Add to cart">
                  <img
                    src="./src/assets/images/icon-add-to-cart.svg"
                    alt=""
                    aria-hidden="true"
                  />
                  <span> Add to Cart </span>
                </button>

                <div class="product-quantity-controls main-btn" role="button">
                  <button data-action="removefromcart" class="btn-action remove" aria-label="Decrease quantity">
                    <img
                      src="./src/assets/images/icon-decrement-quantity.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </button>

                  <span class="product-quantity item-quantity" aria-live="polite">${
                    FromCart?.quantity + "x"
                  }</span>

                  <button data-action="addmore" class="btn-action addmore" aria-label="Increase quantity">
                    <img
                      src="./src/assets/images/icon-increment-quantity.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
            <section class="product-details">
              <h3 class="product-category">${category}</h3>
              <h4 class="product-name">${name}</h4>
              <span class="product-price">${formatPrice(price)}</span>
            </section>
  `;
  return product;
};

export { createProduct };
