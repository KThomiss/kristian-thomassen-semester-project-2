import { createProducts } from "../createProducts.js";

export function sortByType(types) {
  const typeContainer = document.querySelector(".filter__types");

  let seen = [];
  seen = [...new Set(types.map((type) => type.attributes.type))];
  seen.forEach(function (test) {
    if (test === null) {
      return true;
    }

    typeContainer.innerHTML += `<div class="sortByName">
    <input type="checkbox" id="${test}" class="checkbox__types" value="${test}"/>
    <label for=${test} class="label__types">${test}</label>
    </div>`;
  });

  const checkboxes = document.querySelectorAll(".checkbox__types");

  checkboxes.forEach(function (check) {
    check.addEventListener("change", handleSort);
  });

  function handleSort(e) {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      const filteredByType = types.filter(function (type) {
        if (type.attributes.type === checkboxValue) {
          return true;
        }
      });
      createProducts(filteredByType);
    } else {
      createProducts(types);
    }
  }
}
