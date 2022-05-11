import { apiUrl } from "../utils/api.js";

const featured = apiUrl + "products/?featured=true";

(async function () {
  try {
    const response = await fetch(featured);
    const json = await response.json();

    fetchFeatured(json);
  } catch (error) {
    console.log(error);
  }
})();

function fetchFeatured(featured) {
  const featuredContainer = document.querySelector(".container__featured");

  featuredContainer.innerHTML = "";

  featured.forEach(function (feature) {
    featuredContainer.innerHTML += `<div class="content__product product__featured">
                                      <a href="prodDetails.html?id=${feature.id}">
                                        <img src=http://localhost:1337${feature.image.formats.small.url} class="product__img featured__img" alt="${feature.image.alternativeText}" />
                                      </a>   
                                      <div class="product__info">
                                        <h3>${feature.title}</h3>
                                        <p>${feature.price} $</p>
                                        <a href="prodDetails.html?id=${feature.id}" class="product__btn cta">Shop now</a>
                                      </div>
                                    </div>`;
  });
}
