// script for index buttons/actions

// Wait for page to load
document.addEventListener("DOMContentLoaded", () => {
  const loginPopup = document.getElementById("loginPopup");
  const loginButton = document.getElementById("loginButton");
  const closeButton = document.getElementById("closeButton");
  const loginForm = document.getElementById("loginForm");

  // Show login popup
  loginButton.addEventListener("click", () => {
    loginPopup.style.display = "block";
  });

  // Close login popup
  closeButton.addEventListener("click", () => {
    loginPopup.style.display = "none";
  });
});
