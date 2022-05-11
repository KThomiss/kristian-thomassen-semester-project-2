import { clearStorage } from "../storage/storage.js";

export function logoutBtn() {
  const btnLogout = document.querySelectorAll(".signOut");

  if (btnLogout) {
    btnLogout.forEach(function (button) {
      button.onclick = function () {
        const doLogout = confirm("Do you wish to continue?");

        if (doLogout) {
          clearStorage();
          location.href = "/";
        }
      };
    });
  }
}
