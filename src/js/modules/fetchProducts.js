import { createProduct } from "./exporter.js";

const fetchProducts = async (container, loader, Cart) => {
  try {
    const res = await fetch("/src/js/data.json");
    if (!res.ok) throw new Error("data.json doesn't exit,or Wrong Path !");
    const data = await res.json();
    const fragment = document.createDocumentFragment();
    data.forEach((obj) => fragment.prepend(createProduct(obj, Cart)));
    container.appendChild(fragment);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    setTimeout(() => loader?.remove(), 100);
  }
};

export { fetchProducts };
