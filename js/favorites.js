/* ==========================================================================
   favorites.js — Feature 3: Favorites / "My Collection" (localStorage)
   Loaded on every page for the shared header count; fully active on the
   Gallery page where the artwork cards live.

   Behaviour
   ---------
   - Favorites persist as a JSON array of artwork ids in localStorage under
     the key "vm_favorites" (JSON.parse / JSON.stringify).
   - Clicking any .fav-btn toggles that artwork's id in the stored array and
     swaps its icon/label (♡ "Save"  <->  ♥ "Saved") plus aria-pressed.
   - A single delegated click listener on #gallery-grid handles every card, so
     re-rendering the grid (e.g. by a later filter feature) keeps working.
   - On load the ♥ state is re-applied to already-saved cards and the shared
     header counter, and the optional "My Collection" panel is refreshed.
   - Guarded everywhere: pages without cards (About, Visit, etc.) simply keep
     the header count in sync without touching anything else.

   Viva talking points: why localStorage (no backend, yet persistent), JSON
   serialization, syncing UI state with stored state on load.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "vm_favorites";

  // --- Persistence helpers --------------------------------------------------

  // Read the saved ids. Wrapped in try/catch because localStorage can throw
  // (private browsing, disabled storage, quota) — we degrade to an empty list.
  function getFavorites() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      var list = JSON.parse(raw);
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function saveFavorites(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      /* storage unavailable — keep changes in memory only for this session */
    }
    window.dispatchEvent(new CustomEvent("favorites-updated", { detail: { favorites: list } }));
  }

  // --- UI updates -----------------------------------------------------------

  // Update every header's "Saved (n)" pill and gallery chip from the stored count.
  function updateCounter() {
    var count = getFavorites().length;
    var el = document.getElementById("fav-count");
    if (el) {
      el.textContent = String(count);
    }
    var chipCount = document.getElementById("chip-saved-count");
    if (chipCount) {
      chipCount.textContent = String(count);
    }
  }

  // Reflect one button's saved/unsaved state in its icon, label and aria.
  function setButtonState(btn, saved) {
    btn.setAttribute("aria-pressed", saved ? "true" : "false");
    var heart = btn.querySelector(".fav-heart");
    var label = btn.querySelector(".fav-label");
    if (heart) {
      heart.textContent = saved ? "\u2665" : "\u2661"; // ♥ / ♡
    }
    if (label) {
      label.textContent = saved ? "Saved" : "Save";
    }
  }
// Re-apply the stored state to every card on the gallery grid.
  function syncCards() {
    var grid = document.getElementById("gallery-grid");
    if (!grid) {
      return;
    }
    var favs = getFavorites();
    var cards = grid.querySelectorAll(".art-card");
    for (var i = 0; i < cards.length; i++) {
      var btn = cards[i].querySelector(".fav-btn");
      if (btn) {
        setButtonState(btn, favs.indexOf(btn.getAttribute("data-art-id")) !== -1);
      }
    }
  }
// (Re)build the optional "My Collection" panel that lists only saved works.
  function renderCollection() {
    var listEl = document.getElementById("my-collection-list");
    if (!listEl) {
      return;
    }
    var favs = getFavorites();

    // Look up saved artworks from the shared dataset when it is present.
    var saved = [];
    if (typeof artworks !== "undefined" && Array.isArray(artworks)) {
      for (var i = 0; i < favs.length; i++) {
        for (var j = 0; j < artworks.length; j++) {
          if (artworks[j].id === favs[i]) {
            saved.push(artworks[j]);
            break;
          }
        }
      }
    }

    if (!saved.length) {
      listEl.innerHTML =
        '<li class="my-collection-empty">Nothing saved yet — tap a ♡ on any work to keep it here.</li>';
      return;
    }

    var items = saved.map(function (art) {
      return (
        '<li class="my-collection-item">' +
        '  <img class="my-collection-thumb" src="' + art.image + '"' +
        '       alt="' + art.title + ' by ' + art.artist + '" />' +
        '  <span class="my-collection-info">' +
        '    <span class="my-collection-title">' + art.title + '</span>' +
        '    <span class="my-collection-meta">' + art.artist + ' · ' + art.year + '</span>' +
        '  </span>' +
        '</li>'
      );
    }).join("");

    listEl.innerHTML = items;
  }

// --- Wiring ---------------------------------------------------------------

  function init() {
    // 1) State sync that must not depend on script order:
    syncCards();
    updateCounter();
    renderCollection();

    // 2) Delegated click handling for every favorite button. Attached once to
    //    the persistent grid container, so re-rendered cards keep working.
    var grid = document.getElementById("gallery-grid");
    if (grid) {
      // Re-sync ♥ state whenever the grid is re-rendered (e.g. after a
      // search/filter in gallery.js). gallery.js dispatches a "gallery-rendered"
      // CustomEvent on the grid; this listener restores the saved state that
      // fresh cards are built without.
      grid.addEventListener("gallery-rendered", function () {
        syncCards();
        renderCollection();
      });

      grid.addEventListener("click", function (event) {
        var target = event.target;
        var btn = target && target.closest ? target.closest(".fav-btn") : null;
        if (!btn) {
          return;
        }

        var id = btn.getAttribute("data-art-id");
        var favs = getFavorites();
        var idx = favs.indexOf(id);
        if (idx === -1) {
          favs.push(id);
        } else {
          favs.splice(idx, 1);
        }

        saveFavorites(favs);
        setButtonState(btn, idx === -1); // true when we just added it
        updateCounter();
        renderCollection();
      });
    }

    // 3) Optional "My Collection" panel toggle (Gallery page).
    var toggleBtn = document.getElementById("my-collection-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        var panel = document.getElementById("my-collection");
        if (!panel) {
          return;
        }
        panel.classList.toggle("open");
        renderCollection(); // keeps the list fresh if it was opened before
      });
    }

    // 4) "Clear all saved" button inside the panel.
    var clearBtn = document.getElementById("my-collection-clear");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        saveFavorites([]);
        updateCounter();
        syncCards();
        renderCollection();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();