import { getUsername } from "../../storage/storage.js";
import { logoutBtn } from "../../admin/logoutBtn.js";

export default function createMenu() {
  const { pathname } = document.location;

  const username = getUsername();

  let authLink = `<a href="login.html" class="${
    pathname === "/login.html" ? "active" : ""
  }">Login</a>`;

  let authAdmin = "";

  if (username) {
    authLink = `<span class="username__span">Hi ${username}!</span>
                <a class="signOut">Logout</a>`;

    authAdmin = `<a href="dashboard.html" class="${
      pathname === "/dashboard.html" ? "active" : ""
    }">Dashboard</a>`;
  }

  const navLogin = document.querySelector(".nav__ul--login");
  const navDropdownLogin = document.querySelector(".nav__dropdown--login");
  const adminPage = document.querySelector(".nav__admin");
  const adminDropdown = document.querySelector(".nav__dropdown--admin");

  navLogin.innerHTML = `<div>${authLink}</div>`;
  navDropdownLogin.innerHTML = `<div>${authLink}</div>`;
  adminPage.innerHTML = `<div>${authAdmin}</div>`;
  adminDropdown.innerHTML = `<div>${authAdmin}</div>`;

  logoutBtn();
}
