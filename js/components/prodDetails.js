import createMenu from "../components/common/createMenu.js";
import { apiUrl } from "../utils/api.js";
import { addToCart, getFromCart } from "../storage/storage.js";

createMenu();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");
const queryUrl = apiUrl + "products/" + id;

const detailsContainer = document.querySelector(".container__details");

detailsContainer.innerHTML = "";

async function getProductId() {
  const response = await fetch(queryUrl);
  const json = await response.json();

  detailsContainer.innerHTML += `<div class="product__details">
                                  <div class="details__container--img">
                                    <img src=${json.data.attributes.image_url} class="product__img details__img" alt="#" />
                                  </div>
                                  <div class="details__container--info">
                                    <h2 class="details__title">${json.data.attributes.title}</h2>
                                    <p class="details__description">${json.data.attributes.description}</p>
                                    <p><span class="details__span--bold">Price:</span> ${json.data.attributes.price} $</p>
                                    <div class="details__container--cta">
                                      <button class="cta details__cta" id="cart__btn" data-id="${json.data.id}" data-title="${json.data.attributes.title}" data-price="${json.data.attributes.price}" data-img="${json.data.attributes.image_url}">Add to Cart</button>
                                      <a href="shoppingCart.html" class="product__btn cta details__cta">Cart</a>
                                    </div>
                                  </div>
                                </div>`;

  document.title = `${json.data.attributes.title} | Allez`;

  const addToCartBtn = document.querySelector("#cart__btn");
  const shoppingCart = getFromCart();

  const findInCart = shoppingCart.find(function (product) {
    return parseInt(product.id) === json.id;
  });

  if (!findInCart) {
    addToCartBtn.classList.add("addToCart");
    addToCartBtn.innerHTML = "Add to cart";
    addToCartBtn.style.backgroundColor = "#f26e50";
  } else {
    addToCartBtn.classList.add("removeFromCart");
    addToCartBtn.innerHTML = "Remove from cart";
    addToCartBtn.style.backgroundColor = "#fc615f";
  }

  addToCartBtn.addEventListener("click", function () {
    this.classList.toggle("removeFromCart");
    this.classList.toggle("addToCart");

    if (addToCartBtn.classList.contains("addToCart")) {
      addToCartBtn.innerHTML = "Add to cart";
      addToCartBtn.style.backgroundColor = "#f26e50";
    } else {
      addToCartBtn.innerHTML = "Remove from cart";
      addToCartBtn.style.backgroundColor = "#fc615f";
    }
  });

  addToCartBtn.addEventListener("click", handleStorage);
}
getProductId();

function handleStorage() {
  const id = this.dataset.id;
  const title = this.dataset.title;
  const price = this.dataset.price;
  const image = this.dataset.img;

  const checkStorage = getFromCart();

  const prodInCart = checkStorage.find(function (cartBtn) {
    return cartBtn.id === id;
  });

  if (prodInCart === undefined) {
    const saveSelected = {
      id: id,
      title: title,
      price: price,
      img: image,
    };
    checkStorage.push(saveSelected);
    addToCart(checkStorage);
  } else {
    const newShopCart = checkStorage.filter(function (newCart) {
      if (newCart.id !== id) {
        return true;
      }
    });
    addToCart(newShopCart);
  }
}

//Localhost
/*   detailsContainer.innerHTML += `<div class="product__details">
                                  <div class="details__container--img">
                                    <img src=http://localhost:1337${json.image.formats.medium.url} class="product__img details__img" alt="${json.image.alternativeText}" />
                                  </div>
                                  <div class="details__container--info">
                                    <h2 class="details__title">${json.title}</h2>
                                    <p class="details__description">${json.description}</p>
                                    <p><span class="details__span--bold">Price:</span> ${json.price} $</p>
                                    <div class="details__container--cta">
                                      <button class="cta details__cta" id="cart__btn" data-id="${json.id}" data-title="${json.title}" data-price="${json.price}" data-img="http://localhost:1337${json.image.formats.small.url}">Add to Cart</button>
                                      <a href="shoppingCart.html" class="product__btn cta details__cta">Cart</a>
                                    </div>
                                  </div>
                                </div>`; */
