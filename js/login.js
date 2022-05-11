import displayMessage from "./components/common/message.js";
import { saveToken, saveUser } from "./storage/storage.js";
import { apiUrl } from "./utils/api.js";

const form = document.querySelector(".form__login");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".container__message");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue.length === 0 || passwordValue.length === 0) {
    return displayMessage("warning", "invalid values", ".container__message");
  }

  presentLogin(usernameValue, passwordValue);
}

async function presentLogin(username, password) {
  const postUrl = apiUrl + "auth/local";

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(postUrl, options);
    const json = await response.json();
    console.log(json);

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);

      location.href = "/";
    }

    if (json.error) {
      displayMessage("error", "invalid login details", ".container__message");
    }
  } catch (error) {
    console.log(error);
  }
}

/*
email: admin@admin.com
username: admin
password: Pass1234
*/
