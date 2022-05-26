import createMenu from "./components/common/createMenu.js";
import { apiUrl } from "./utils/api.js";

const heroBanner = apiUrl + "home";

const heroContainer = document.querySelector(".container__hero--img");

createMenu();

async function getHeroBanner() {
  try {
    const response = await fetch(heroBanner);
    const json = await response.json();

    heroContainer.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${json.data.attributes.hero_image_url})`;
  } catch (error) {
    console.log(error);
  }
}
getHeroBanner();
