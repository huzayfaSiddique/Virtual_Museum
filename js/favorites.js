(function () {
  "use strict";

  var STORAGE_KEY = "vm_favorites";

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
    }
    window.dispatchEvent(new CustomEvent("favorites-updated", { detail: { favorites: list } }));
  }

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

  function setButtonState(btn, saved) {
    btn.setAttribute("aria-pressed", saved ? "true" : "false");
    var heart = btn.querySelector(".fav-heart");
    var label = btn.querySelector(".fav-label");
    if (heart) {
      heart.textContent = saved ? "\u2665" : "\u2661";
    }
    if (label) {
      label.textContent = saved ? "Saved" : "Save";
    }
  }

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

  function renderCollection() {
    var listEl = document.getElementById("my-collection-list");
    if (!listEl) {
      return;
    }
    var favs = getFavorites();

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

  function init() {
    syncCards();
    updateCounter();
    renderCollection();

    var grid = document.getElementById("gallery-grid");
    if (grid) {
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
        setButtonState(btn, idx === -1);
        updateCounter();
        renderCollection();
      });
    }

    var toggleBtn = document.getElementById("my-collection-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        var panel = document.getElementById("my-collection");
        if (!panel) {
          return;
        }
        panel.classList.toggle("open");
        renderCollection();
      });
    }

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
