/* ==========================================================================
   gallery.js — Gallery page artwork grid renderer
   Used on the Gallery page (plan §5, Feature 3 — Favorites needs the cards).

   Responsibility
   --------------
   Builds the <article class="art-card"> grid in #gallery-grid from the
   `artworks` array in js/data.js. Each card carries a favorite button whose
   click state is managed by js/favorites.js (this file only renders the base
   card markup; it never reads or writes localStorage).

   Later Features (4 = Live search & filter, 5 = Lightbox) will re-use this
   same renderer to draw the *filtered* list — js/favorites.js uses event
   delegation on the persistent #gallery-grid container, so re-rendering the
   cards does not break favorite toggling.

   Requires js/data.js to be loaded first (provides the `artworks` array).
   ========================================================================== */
(function () {
  "use strict";

  // Escape text so it is safe to interpolate into an HTML attribute.
  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // Render every artwork as a card. Accepts a list so later Features can pass
  // a filtered subset without changing how cards are built.
  function renderGallery(cards) {
    var grid = document.getElementById("gallery-grid");
    if (!grid) {
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
  }

  function init() {
    if (typeof artworks === "undefined" || !Array.isArray(artworks)) {
      return;
    }
    renderGallery(artworks);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();