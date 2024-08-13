import { createElement, formatPrice, UUID } from "./exporter.js";
const CreateProduct = (
  { price, category, name, image: { mobile, desktop, tablet } },
  Cart
) => {
  const FromCart = Cart?.items.find((ob) => ob.name == name);

  const product = createElement("div", {
    class: `product ${FromCart ? "added" : ""}`,
    "data-id": FromCart ? FromCart.id : UUID(),
    "data-quantity": FromCart ? FromCart.quantity : 0,
    "data-price": price,
    "data-name": name,
    "data-image": mobile,
  });
  product.innerHTML = `
    <div class="product-image">
      <picture>
        <source media="(min-width: 768px)" srcset="${desktop}"/>
        <source media="(min-width: 640px)" srcset="${tablet}"/>
        <img src="${mobile}" alt="${name}"/>
      </picture>
      <div class="btns">
        <button class="addtocart btn" data-action="add">
          <i class="bx bx-cart"></i> Add to Cart
        </button>

        <div class="product-quantity btn">
          <button class="btn-xs delete-product" data-action="delete">
            <i class="bx bx-minus"> </i>
          </button>

          <span class="item-quantity">${FromCart ? FromCart.quantity : 0}</span>

          <button class="btn-xs addmore" data-action="addmore">
            <i class="bx bx-plus"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="product-details">
      <h3 class="product-category">${category}</h3>
      <h4 class="product-name">${name}</h4>
      <span class="product-price">${formatPrice(price)}</span>
    </div>
  `;
  return product;
};

export { CreateProduct };
