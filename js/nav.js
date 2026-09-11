/* ==========================================================================
   nav.js — Feature 1: Responsive Navigation
   Shared by every page (loaded at the end of <body>).

   Behaviour
   ---------
   - Clicking .nav-toggle toggles an `.open` class on the .nav-menu list.
   - The menu closes when a nav link is clicked (better mobile UX).
   - The menu closes when the dim overlay is clicked.
   - The menu closes on the Escape key.
   - The menu closes when clicking outside the menu (document listener).
   - State is reset if the viewport grows back to the desktop layout.

   State is driven entirely by CSS classes (never inline styles), so the
   desktop/mobile presentation stays in the stylesheets.
   ========================================================================== */
(function () {
  "use strict";

  var DESKTOP_BREAKPOINT = 768; // matches the media query in responsive.css

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.querySelector(".nav-menu");
    var overlay = document.querySelector(".nav-overlay");

    // If the page has no nav (shouldn't happen on shared pages), bail safely.
    if (!toggle || !menu) {
      return;
    }

    // Make the JS the source of truth for the toggle's accessible state on load
    // (the markup ships aria-expanded="false"; this keeps them in sync).
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

    // 1. Toggle the menu from the hamburger button.
    toggle.addEventListener("click", function (event) {
      event.stopPropagation(); // keep the document click handler from closing it again
      if (isOpen()) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // 2. Close the menu when a link inside it is clicked (event delegation).
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    // 3. Close the menu when the dim overlay behind it is clicked.
    if (overlay) {
      overlay.addEventListener("click", closeMenu);
    }

    // 4. Close the menu on Escape (keyboard accessibility).
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        closeMenu();
      }
    });

    // 5. Close the menu when clicking anywhere outside it (document listener).
    document.addEventListener("click", function (event) {
      if (!isOpen()) {
        return;
      }
      if (menu.contains(event.target) || toggle.contains(event.target)) {
        return;
      }
      closeMenu();
    });

    // 6. Reset to the closed state when resizing back up to desktop width,
    //    so the panel never stays "open off-screen".
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
