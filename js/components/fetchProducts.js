import createMenu from "../components/common/createMenu.js";
import { apiUrl } from "../utils/api.js";
import { createProducts } from "./createProducts.js";
import { searchFilter } from "./common/searchFilter.js";
import { sortByType } from "./common/sortByType.js";

createMenu();

const products = apiUrl + "products?populate=*";

(async function () {
  try {
    const response = await fetch(products);
    const json = await response.json();
    console.log(json.data);

    createProducts(json.data);
    searchFilter(json.data);
    sortByType(json.data);
  } catch (error) {
    console.log(error);
  }
})();
