(function () {
  "use strict";

  var currentSearch = "";
  var currentEra = "all";
  var currentList = [];

  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function renderGallery(cards) {
    currentList = cards;

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

  function getSavedIds() {
    try {
      var raw = localStorage.getItem("vm_favorites");
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

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
    return -1;
  }

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
    document.body.classList.add("lightbox-open");
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

  function handleLightboxKey(event) {
    if (!lightbox.classList.contains("open")) {
      return;
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

  function activateEraFilter(eraName, shouldScroll) {
    if (!eraName) return;
    var validEras = ["all", "Renaissance", "Impressionism", "Modern", "Sculpture", "saved"];
    var matchedEra = "all";
    for (var i = 0; i < validEras.length; i++) {
      if (validEras[i].toLowerCase() === eraName.toLowerCase()) {
        matchedEra = validEras[i];
        break;
      }
    }

    if (matchedEra === "saved") {
      activateSavedFilter(shouldScroll);
      return;
    }

    currentEra = matchedEra;
    var chips = document.getElementById("filter-chips");
    if (chips) {
      var all = chips.querySelectorAll(".chip");
      for (var j = 0; j < all.length; j++) {
        if (all[j].getAttribute("data-era") === matchedEra) {
          all[j].classList.add("is-active");
        } else {
          all[j].classList.remove("is-active");
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

    var urlParams = new URLSearchParams(window.location.search);
    var eraParam = urlParams.get("era");
    if (eraParam) {
      activateEraFilter(eraParam, true);
    } else if (window.location.hash === "#saved") {
      activateSavedFilter(false);
    } else if (window.location.hash) {
      var hashEra = window.location.hash.replace("#", "");
      var recognized = ["renaissance", "impressionism", "modern", "sculpture"];
      if (recognized.indexOf(hashEra.toLowerCase()) !== -1) {
        activateEraFilter(hashEra, true);
      } else {
        renderGallery(artworks);
      }
    } else {
      renderGallery(artworks);
    }

    var grid = document.getElementById("gallery-grid");
    if (grid) {
      grid.addEventListener("click", function (event) {
        var target = event.target;
        if (!target || !target.closest) {
          return;
        }

        if (target.closest(".fav-btn")) {
          return;
        }
        var card = target.closest(".art-card");
        if (card) {
          openLightbox(card.getAttribute("data-art-id"));
        }
      });
    }

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

      lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
          closeLightbox();
        }
      });

      document.addEventListener("keydown", handleLightboxKey);
    }

    window.addEventListener("hashchange", function () {
      if (window.location.hash === "#saved") {
        activateSavedFilter(true);
      }
    });

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

    window.addEventListener("favorites-updated", function () {
      if (currentEra === "saved") {
        applyFilters();
      }
    });

    var searchInput = document.getElementById("filter-search");
    var debounceTimer = null;
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        window.clearTimeout(debounceTimer);
        debounceTimer = window.setTimeout(function () {
          currentSearch = searchInput.value;
          applyFilters();
        }, 120);
      });
    }

    var chips = document.getElementById("filter-chips");
    if (chips) {
      chips.addEventListener("click", function (event) {
        var target = event.target;
        var chip = target && target.closest ? target.closest(".chip") : null;
        if (!chip) {
          return;
        }

        currentEra = chip.getAttribute("data-era") || "all";

        if (currentEra === "saved") {
          if (window.location.hash !== "#saved") {
            history.pushState(null, "", "#saved");
          }
        } else if (window.location.hash === "#saved") {
          history.pushState(null, "", window.location.pathname);
        }

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
