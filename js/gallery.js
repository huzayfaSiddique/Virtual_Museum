/* ==========================================================================
   gallery.js — Gallery page: artwork grid + FEATURE 4 (Live Search & Filter)
   Used on the Gallery page (plan §5, Features 3, 4 & 5).

   Responsibilities
   -----------------
   - Builds the <article class="art-card"> grid in #gallery-grid from the
     `artworks` array in js/data.js (also used, with a filtered list, to
     re-render on search/filter).
   - FEATURE 4: a text search box + era filter chips re-render the grid in
     real time. Search text AND selected era are combined; an empty result
     shows a "No results" message.

   Interaction with favorites (js/favorites.js)
   ---------------------------------------------
   This file only renders card markup and never reads/writes localStorage.
   js/favorites.js listens for clicks on the persistent #gallery-grid (event
   delegation) and re-applies saved ♥ state whenever the grid fires a
   "gallery-rendered" custom event — so filtering stays in sync with the
   saved state without coupling the two files.

   Requires js/data.js to be loaded first (provides the `artworks` array).
   ========================================================================== */
(function () {
  "use strict";

  var currentSearch = ""; // raw text in the search box
  var currentEra = "all"; // active era chip ("all" = no era filter)

  // Escape text so it is safe to interpolate into an HTML attribute.
  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // Render a list of artworks as cards. An empty list shows a friendly
  // "No results" message instead. Always signals listeners (via a custom
  // event) so favorites.js can restore ♥ state on re-rendered cards.
  function renderGallery(cards) {
    var grid = document.getElementById("gallery-grid");
    if (!grid) {
      return;
    }

    if (!cards.length) {
      grid.innerHTML =
        '<p class="no-results">No works match — try another title or artist, or clear the filters.</p>';
      grid.dispatchEvent(new CustomEvent("gallery-rendered"));
      return;
    }

    var html = cards.map(function (art) {
      return (
        '<article class="art-card" data-art-id="' + esc(art.id) + '">' +
        '  <div class="art-thumb">' +
        '    <img src="' + esc(art.image) + '"' +
        '         alt="' + esc(art.title) + ' by ' + esc(art.artist) + '"' +
        '         loading="lazy" />' +
        '    <button class="fav-btn" type="button"' +
        '            data-art-id="' + esc(art.id) + '"' +
        '            aria-pressed="false"' +
        '            aria-label="Save ' + esc(art.title) + ' to My Collection">' +
        '      <span class="fav-heart" aria-hidden="true">♡</span>' +
        '      <span class="fav-label">Save</span>' +
        '    </button>' +
        '  </div>' +
        '  <h3 class="art-title">' + esc(art.title) + '</h3>' +
        '  <p class="art-meta">' + esc(art.artist) + ' · ' + esc(art.year) + '</p>' +
        '  <p class="art-era">' + esc(art.medium) + '</p>' +
        '</article>'
      );
    }).join("");

    grid.innerHTML = html;
    grid.dispatchEvent(new CustomEvent("gallery-rendered"));
  }

  // Read saved artwork IDs from localStorage.
  function getSavedIds() {
    try {
      var raw = localStorage.getItem("vm_favorites");
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  // Combine the current search term AND the selected era / saved state, then re-render.
  function applyFilters() {
    var term = currentSearch.trim().toLowerCase();
    var savedIds = getSavedIds();

    var list = artworks.filter(function (art) {
      var matchesSearch =
        !term ||
        art.title.toLowerCase().includes(term) ||
        art.artist.toLowerCase().includes(term);

      var matchesCategory = false;
      if (currentEra === "all") {
        matchesCategory = true;
      } else if (currentEra === "saved") {
        matchesCategory = savedIds.indexOf(art.id) !== -1;
      } else {
        matchesCategory = art.era === currentEra;
      }

      return matchesSearch && matchesCategory;
    });

    if (currentEra === "saved" && !list.length && !term) {
      var grid = document.getElementById("gallery-grid");
      if (grid) {
        grid.innerHTML =
          '<p class="no-results">You have no saved artworks yet. Browse the catalogue and click the \u2661 icon on any artwork to save it here.</p>';
        grid.dispatchEvent(new CustomEvent("gallery-rendered"));
        return;
      }
    }

    renderGallery(list);
  }

  // Switch the active chip UI and filter to "saved" mode.
  function activateSavedFilter(shouldScroll) {
    currentEra = "saved";
    var chips = document.getElementById("filter-chips");
    if (chips) {
      var all = chips.querySelectorAll(".chip");
      for (var i = 0; i < all.length; i++) {
        if (all[i].getAttribute("data-era") === "saved") {
          all[i].classList.add("is-active");
        } else {
          all[i].classList.remove("is-active");
        }
      }
    }
    applyFilters();

    if (shouldScroll) {
      var gallerySection = document.getElementById("gallery");
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  function init() {
    if (typeof artworks === "undefined" || !Array.isArray(artworks)) {
      return;
    }

    // Check if the page loaded with the #saved hash.
    if (window.location.hash === "#saved") {
      activateSavedFilter(false);
    } else {
      // Draw the full catalogue first.
      renderGallery(artworks);
    }

    // Listen for hash changes (e.g. back/forward navigation or link clicks)
    window.addEventListener("hashchange", function () {
      if (window.location.hash === "#saved") {
        activateSavedFilter(true);
      }
    });

    // Header "Saved" button: if clicked on the gallery page, switch filter directly.
    var navFav = document.querySelector(".nav-fav");
    if (navFav) {
      navFav.addEventListener("click", function (event) {
        event.preventDefault();
        if (window.location.hash !== "#saved") {
          history.pushState(null, "", "#saved");
        }
        activateSavedFilter(true);
      });
    }

    // Re-filter when favorites are updated (e.g. if user unsaves a card while in saved mode)
    window.addEventListener("favorites-updated", function () {
      if (currentEra === "saved") {
        applyFilters();
      }
    });

    // --- FEATURE 4a: live text search (lightly debounced) ---
    var searchInput = document.getElementById("filter-search");
    var debounceTimer = null;
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        // Debounce so we only re-render ~120ms after the user pauses typing.
        window.clearTimeout(debounceTimer);
        debounceTimer = window.setTimeout(function () {
          currentSearch = searchInput.value;
          applyFilters();
        }, 120);
      });
    }

    // --- FEATURE 4b: era filter chips (delegated). One has .is-active at a time.
    var chips = document.getElementById("filter-chips");
    if (chips) {
      chips.addEventListener("click", function (event) {
        var target = event.target;
        var chip = target && target.closest ? target.closest(".chip") : null;
        if (!chip) {
          return;
        }

        currentEra = chip.getAttribute("data-era") || "all";

        // Update URL hash state when user selects a chip
        if (currentEra === "saved") {
          if (window.location.hash !== "#saved") {
            history.pushState(null, "", "#saved");
          }
        } else if (window.location.hash === "#saved") {
          history.pushState(null, "", window.location.pathname);
        }

        // Move the .is-active state to the clicked chip.
        var all = chips.querySelectorAll(".chip");
        for (var i = 0; i < all.length; i++) {
          if (all[i] === chip) {
            all[i].classList.add("is-active");
          } else {
            all[i].classList.remove("is-active");
          }
        }

        applyFilters();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();