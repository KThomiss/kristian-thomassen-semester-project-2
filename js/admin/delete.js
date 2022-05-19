import { apiUrl } from "../utils/api.js";
import { getToken } from "../storage/storage.js";

export function deleteBtn(id) {
  const deleteContainer = document.querySelector(".container__delete");
  deleteContainer.innerHTML = `<button type="button" class="form__login--btn form__delete--btn cta">Delete</button>`;

  const deleteBtn = document.querySelector(".form__delete--btn");

  deleteBtn.onclick = async function () {
    const deleteRequest = confirm("Do you wish to delete this product?");

    if (deleteRequest) {
      const deleteUrl = apiUrl + "products/" + id;

      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(deleteUrl, options);
        const json = await response.json();
        console.log(json);
        location.href = "/edit.html";
      } catch (error) {
        console.log(error);
      }
    }
  };
}
