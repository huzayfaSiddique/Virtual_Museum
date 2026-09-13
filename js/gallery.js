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
   - FEATURE 5: clicking a card opens a lightbox modal (image, title, artist,
      year, medium, description) with Next/Previous that walk the *currently
      filtered* list, and closes via the × button, the backdrop, or Escape.

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
  var currentList = []; // artworks currently shown — the lightbox pivots on this

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
    currentList = cards; // keep the exact list the grid shows

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

  // Combine the current search term AND the selected era, then re-render.
  function applyFilters() {
    var term = currentSearch.trim().toLowerCase();
    var list = artworks.filter(function (art) {
      var matchesSearch =
        !term ||
        art.title.toLowerCase().includes(term) ||
        art.artist.toLowerCase().includes(term);
      var matchesEra = currentEra === "all" || art.era === currentEra;
      return matchesSearch && matchesEra;
    });
    renderGallery(list);
  }

  // --- Lightbox / modal (FEATURE 5) ----------------------------------------
  // One reusable modal lives in gallery.html; this code only populates and
  // shows/hides it. Next/Previous walk `currentList`, i.e. the *currently
  // filtered* set, per the plan.

  var lightbox = null;
  var lightboxImage = null;
  var lightboxTitle = null;
  var lightboxMeta = null;
  var lightboxDesc = null;
  var lightboxCounter = null;
  var lightboxPrev = null;
  var lightboxNext = null;
  var lightboxClose = null;
  var currentIndex = 0;

  function findIndexById(id) {
    for (var i = 0; i < currentList.length; i++) {
      if (currentList[i].id === id) {
        return i;
      }
    }
    return -1; // id not in the currently shown list
  }

  // Fill the (already visible) modal from the artwork at currentIndex.
  function renderLightbox() {
    var art = currentList[currentIndex];
    if (!art) {
      return;
    }
    lightboxImage.src = art.image;
    lightboxImage.alt = art.title + " by " + art.artist;
    lightboxTitle.textContent = art.title;
    lightboxMeta.textContent = art.artist + " · " + art.year + " · " + art.medium;
    lightboxDesc.textContent = art.desc;
    lightboxCounter.textContent = currentIndex + 1 + " of " + currentList.length;
    lightboxPrev.disabled = currentIndex <= 0;
    lightboxNext.disabled = currentIndex >= currentList.length - 1;
  }

  function openLightbox(id) {
    currentIndex = findIndexById(id);
    if (currentIndex === -1) {
      return;
    }
    renderLightbox();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open"); // lock background scroll
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  }

  function nextLightbox() {
    if (currentIndex < currentList.length - 1) {
      currentIndex++;
      renderLightbox();
    }
  }

  function prevLightbox() {
    if (currentIndex > 0) {
      currentIndex--;
      renderLightbox();
    }
  }

  // Escape closes; ArrowLeft/ArrowRight browse (keyboard accessibility).
  function handleLightboxKey(event) {
    if (!lightbox.classList.contains("open")) {
      return; // ignore keys unless the modal is open
    }
    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      nextLightbox();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      prevLightbox();
    }
  }

  function init() {
    if (typeof artworks === "undefined" || !Array.isArray(artworks)) {
      return;
    }

    // Draw the full catalogue first.
    renderGallery(artworks);

    // --- Grid click → open the lightbox (FEATURE 5) -------------------------
    var grid = document.getElementById("gallery-grid");
    if (grid) {
      grid.addEventListener("click", function (event) {
        var target = event.target;
        if (!target || !target.closest) {
          return;
        }
        // Let favorites.js own the ♥ button — never open a modal from it.
        if (target.closest(".fav-btn")) {
          return;
        }
        var card = target.closest(".art-card");
        if (card) {
          openLightbox(card.getAttribute("data-art-id"));
        }
      });
    }

    // --- Lightbox controls and keyboard handling (FEATURE 5) -----------------
    lightbox = document.getElementById("lightbox");
    if (lightbox) {
      lightboxImage = document.getElementById("lightbox-image");
      lightboxTitle = document.getElementById("lightbox-title");
      lightboxMeta = document.getElementById("lightbox-meta");
      lightboxDesc = document.getElementById("lightbox-desc");
      lightboxCounter = document.getElementById("lightbox-counter");
      lightboxPrev = document.getElementById("lightbox-prev");
      lightboxNext = document.getElementById("lightbox-next");
      lightboxClose = document.getElementById("lightbox-close");

      lightboxClose.addEventListener("click", closeLightbox);
      lightboxPrev.addEventListener("click", prevLightbox);
      lightboxNext.addEventListener("click", nextLightbox);

      // Clicking the dark backdrop (the .lightbox itself, not its dialog) closes.
      lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
          closeLightbox();
        }
      });

      document.addEventListener("keydown", handleLightboxKey);
    }

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