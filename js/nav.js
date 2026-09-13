(function () {
  "use strict";

  var DESKTOP_BREAKPOINT = 768;

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.querySelector(".nav-menu");
    var overlay = document.querySelector(".nav-overlay");

    if (!toggle || !menu) {
      return;
    }

    toggle.setAttribute("aria-expanded", "false");

    function isOpen() {
      return menu.classList.contains("open");
    }

    function openMenu() {
      menu.classList.add("open");
      toggle.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-open");
      if (overlay) {
        overlay.classList.add("open");
      }
    }

    function closeMenu() {
      menu.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
      if (overlay) {
        overlay.classList.remove("open");
      }
    }

    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      if (isOpen()) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    if (overlay) {
      overlay.addEventListener("click", closeMenu);
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        closeMenu();
      }
    });

    document.addEventListener("click", function (event) {
      if (!isOpen()) {
        return;
      }
      if (menu.contains(event.target) || toggle.contains(event.target)) {
        return;
      }
      closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > DESKTOP_BREAKPOINT && isOpen()) {
        closeMenu();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNav);
  } else {
    initNav();
  }
})();
