import displayMessage from "../components/common/message.js";
import createMenu from "../components/common/createMenu.js";
import { apiUrl } from "../utils/api.js";
import { getToken } from "../storage/storage.js";
import { deleteBtn } from "./delete.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const queryUrl = apiUrl + "products/" + id;

const form = document.querySelector(".form__edit");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const featured = document.querySelector("#featured__checkbox");
const imageFile = document.querySelector("#imageFile");
const idInput = document.querySelector("#id");
const message = document.querySelector(".container__message");

(async function () {
  try {
    const response = await fetch(queryUrl);
    const details = await response.json();

    title.value = details.title;
    price.value = details.price;
    description.value = details.description;
    featured.value = details.featured;
    idInput.value = details.id;

    deleteBtn(details.id);
  } catch (error) {
    console.log(error);
  }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const idValue = idInput.value;
  const featuredValue = featured.checked;

  if (
    titleValue.length === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue) ||
    descriptionValue.length === 0
  ) {
    return displayMessage(
      "warning",
      "please apply proper values",
      ".container__message"
    );
  }

  updateProduct(
    titleValue,
    priceValue,
    descriptionValue,
    featuredValue,
    idValue
  );
}

async function updateProduct(title, price, description, featured, id) {
  const putUrl = apiUrl + "products/" + id;
  const formData = new FormData();
  const file = imageFile.files[0];

  if (imageFile.files.length === 0) {
    return alert("Please select an image");
  }

  const data = {
    title: title,
    price: price,
    description: description,
    featured: featured,
  };

  formData.append("files.image", file, file.name);
  formData.append("data", JSON.stringify(data));

  const token = getToken();

  const options = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(putUrl, options);
    const json = await response.json();

    if (json.updated_at) {
      displayMessage("success", "Product updated", ".container__message");
    }

    if (json.error) {
      displayMessage("error", json.message, ".container__message");
    }
  } catch (error) {
    console.log(error);
  }
}
