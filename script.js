(function () {
  "use strict";

  var root = document.documentElement;
  var themeToggle = document.querySelector(".theme-toggle");
  var menuToggle = document.querySelector(".menu-toggle");
  var primaryNav = document.querySelector(".primary-nav");
  var billingToggle = document.querySelector(".billing-toggle");
  var priceValues = document.querySelectorAll("[data-monthly]");
  var signupForm = document.querySelector(".signup-form");
  var nameInput = document.querySelector("#name");
  var emailInput = document.querySelector("#email");
  var formStatus = document.querySelector(".form-status");

  function setTheme(theme) {
    root.dataset.theme = theme;
    if (themeToggle) {
      var isLight = theme === "light";
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    }
    try {
      localStorage.setItem("orbitops-theme", theme);
    } catch (error) {
      // The visual theme still works when storage is unavailable.
    }
  }

  if (themeToggle) {
    setTheme(root.dataset.theme || "dark");
    themeToggle.addEventListener("click", function () {
      setTheme(root.dataset.theme === "light" ? "dark" : "light");
    });
  }

  function closeMenu() {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    primaryNav.classList.remove("is-open");
  }

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      primaryNav.classList.toggle("is-open", !isOpen);
    });
    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  if (billingToggle) {
    billingToggle.addEventListener("click", function () {
      var isAnnual = billingToggle.getAttribute("aria-pressed") === "true";
      var nextAnnual = !isAnnual;
      billingToggle.setAttribute("aria-pressed", String(nextAnnual));
      billingToggle.querySelector(".sr-only").textContent = nextAnnual ? "Switch to monthly billing" : "Switch to annual billing";
      priceValues.forEach(function (price) {
        price.textContent = nextAnnual ? price.dataset.annual : price.dataset.monthly;
      });
    });
  }

  function showFieldError(input, message) {
    var error = document.getElementById(input.id + "-error");
    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message;
    return !message;
  }

  function validateName() {
    return showFieldError(nameInput, nameInput.value.trim().length < 2 ? "Please enter your name." : "");
  }

  function validateEmail() {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return showFieldError(emailInput, !emailPattern.test(emailInput.value.trim()) ? "Please enter a valid work email." : "");
  }

  if (signupForm && nameInput && emailInput) {
    nameInput.addEventListener("blur", validateName);
    emailInput.addEventListener("blur", validateEmail);
    nameInput.addEventListener("input", function () { if (nameInput.getAttribute("aria-invalid") === "true") validateName(); });
    emailInput.addEventListener("input", function () { if (emailInput.getAttribute("aria-invalid") === "true") validateEmail(); });
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var isNameValid = validateName();
      var isEmailValid = validateEmail();
      formStatus.classList.remove("is-success");
      if (!isNameValid || !isEmailValid) {
        formStatus.textContent = "Please check the highlighted fields.";
        (isNameValid ? emailInput : nameInput).focus();
        return;
      }
      formStatus.classList.add("is-success");
      formStatus.textContent = "You’re on the list — we’ll be in touch shortly.";
      signupForm.reset();
      nameInput.setAttribute("aria-invalid", "false");
      emailInput.setAttribute("aria-invalid", "false");
      document.getElementById("name-error").textContent = "";
      document.getElementById("email-error").textContent = "";
    });
  }
})();
