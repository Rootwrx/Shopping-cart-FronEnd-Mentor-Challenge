import { CreateProduct } from "./exporter.js";

const FetchProducts = async (container, Cart) => {
  try {
    const res = await fetch("/src/js/data.json");
    if (!res.ok) throw new Error("Wrong path to data.js");
    const data = await res.json();
    const fragment = document.createDocumentFragment();
    data.map((obj) => fragment.appendChild(CreateProduct(obj, Cart)));
    container.appendChild(fragment);
  } catch (error) {
    console.error(error);
  }
};

export { FetchProducts };
