export function createProducts(products) {
  const productsContainer = document.querySelector(".container__products");

  if (products.length === 0) {
    return (productsContainer.innerHTML = `<div class="message">No results</div>`);
  }

  productsContainer.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    productsContainer.innerHTML += `<div class="content__product product__list">
                                      <a href="prodDetails.html?id=${products[i].id}">
                                        <img src=${products[i].attributes.image.data.attributes.url} class="product__img" alt="#" />
                                      </a>   
                                      <div class="product__info">
                                        <h3 class="product__info--title">${products[i].attributes.title}</h3>
                                        <p class="product__info--price">${products[i].attributes.price} $</p>
                                        <a href="prodDetails.html?id=${products[i].id}" class="product__btn cta">Shop now</a>
                                      </div>
                                    </div>`;
  }
}

/*<img src=${products[i].attributes.image_url} class="product__img" alt="#" />*/
