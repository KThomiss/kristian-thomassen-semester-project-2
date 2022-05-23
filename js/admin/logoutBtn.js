export function logoutBtn() {
  const btnLogout = document.querySelectorAll(".signOut");

  if (btnLogout) {
    btnLogout.forEach(function (button) {
      button.onclick = function () {
        const doLogout = confirm("Do you wish to continue?");

        if (doLogout) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          location.href = "/index.html";
        }
      };
    });
  }
}
