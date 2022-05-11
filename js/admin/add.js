import displayMessage from "../components/common/message.js";
import createMenu from "../components/common/createMenu.js";
import { apiUrl } from "../utils/api.js";
import { getToken } from "../storage/storage.js";

createMenu();

const form = document.querySelector(".form__add");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const featured = document.querySelector("#featured__checkbox");
const message = document.querySelector(".container__message");
const imageFile = document.querySelector("#imageFile");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  let featuredValue = featured.value;

  if (featured.checked) {
    featuredValue = "true";
  }

  if (
    titleValue.lengt === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue) ||
    descriptionValue.length === 0
  ) {
    return displayMessage(
      "warning",
      "Please apply proper values",
      ".container__message"
    );
  }

  addProduct(titleValue, priceValue, descriptionValue, featuredValue);
}

async function addProduct(title, price, description, featured) {
  const formData = new FormData();

  if (imageFile.files.length === 0) {
    return alert("Please select an image");
  }

  const file = imageFile.files[0];

  const adminUrl = apiUrl + "products";

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
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(adminUrl, options);
    const json = await response.json();

    if (json.created_at) {
      displayMessage("success", "Product created", ".container__message");
      form.reset();
    }

    if (json.error) {
      displayMessage("error", json.message, ".container__message");
    }
  } catch (error) {
    console.log(error);
    displayMessage("error", "An error occured", ".container__message");
  }
}
