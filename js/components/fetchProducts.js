import createMenu from "../components/common/createMenu.js";
import { apiUrl } from "../utils/api.js";
import { createProducts } from "./createProducts.js";
import { searchFilter } from "../components/common/searchFilter.js";

createMenu();

const products = apiUrl + "products/";

(async function () {
  try {
    const response = await fetch(products);
    const json = await response.json();

    createProducts(json.data);
    searchFilter(json.data);
  } catch (error) {
    console.log(error);
  }
})();
