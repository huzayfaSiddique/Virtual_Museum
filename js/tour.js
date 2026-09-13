/* ==========================================================================
   tour.js — Feature 2: Curator's Random Tour Generator
   Used on the Home page and the Exhibitions page (plan §5, Feature 2).

   Behaviour
   ---------
   - "Start a Random Tour" picks 5 unique artworks from the artworks array
     using a Fisher–Yates shuffle, then renders the first one.
   - The hidden panel is revealed/hidden by toggling the `.open` class
     (no inline styles), and `.is-hidden` hides the start button while the
     tour is running.
   - Next / Previous move through the chosen five and re-render the panel.
   - Previous is disabled on step 1; Next becomes "Finish" on the last step.
   - Close (or Escape, or Finish) ends the tour and restores the start button.

   Requires js/data.js to be loaded first (provides the `artworks` array).
   ========================================================================== */
(function () {
  "use strict";

  var TOUR_LENGTH = 5; // plan: exactly 5 random artworks per tour

  function initTour() {
    var startBtn = document.getElementById("tour-start");
    var panel = document.getElementById("tour-panel");

    // Pages without a tour section simply do nothing.
    if (!startBtn || !panel) {
      return;
    }
    // Guard against data.js not being loaded / an empty dataset.
    if (typeof artworks === "undefined" || !artworks.length) {
      return;
    }

    var imageEl = document.getElementById("tour-image");
    var titleEl = document.getElementById("tour-title");
    var metaEl = document.getElementById("tour-meta");
    var descEl = document.getElementById("tour-desc");
    var counterEl = document.getElementById("tour-counter");
    var prevBtn = document.getElementById("tour-prev");
    var nextBtn = document.getElementById("tour-next");
    var closeBtn = document.getElementById("tour-close");

    // --- Tour state, held in this closure -------------------------------------
    var tour = []; // the 5 chosen artworks
    var index = 0; // where we are in that tour

    // Fisher–Yates shuffle. Runs on a copy so the source array is never
    // reordered, which keeps the dataset stable for the other features.
    function shuffle(source) {
      var arr = source.slice();
      for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var swap = arr[i];
        arr[i] = arr[j];
        arr[j] = swap;
      }
      return arr;
    }

    // Shuffle, then take the first five — unique by construction.
    function pickTour() {
      var count = Math.min(TOUR_LENGTH, artworks.length);
      return shuffle(artworks).slice(0, count);
    }

    // Re-render the panel from the current state.
    function render() {
      var art = tour[index];

      imageEl.src = art.image;
      imageEl.alt = art.title + " by " + art.artist;
      titleEl.textContent = art.title;
      metaEl.textContent = art.artist + " · " + art.year + " · " + art.medium;
      descEl.textContent = art.desc;
      counterEl.textContent = index + 1 + " of " + tour.length;

      prevBtn.disabled = index === 0; // step 1 has nowhere to go back to
      nextBtn.textContent = index === tour.length - 1 ? "Finish" : "Next";
    }

    function startTour() {
      tour = pickTour();
      index = 0;
      render();
      panel.classList.add("open"); // show the panel (classList, per plan)
      startBtn.classList.add("is-hidden");
      closeBtn.focus();
    }

    function endTour() {
      panel.classList.remove("open");
      startBtn.classList.remove("is-hidden");
      tour = [];
      index = 0;
      startBtn.focus();
    }

    // --- Events ---------------------------------------------------------------
    startBtn.addEventListener("click", startTour);

    nextBtn.addEventListener("click", function () {
      if (index === tour.length - 1) {
        endTour(); // "Finish" on the last step
        return;
      }
      index++;
      render();
    });

    prevBtn.addEventListener("click", function () {
      if (index > 0) {
        index--;
        render();
      }
    });

    closeBtn.addEventListener("click", endTour);

    // Keyboard convenience: Escape ends the tour while it is open.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && panel.classList.contains("open")) {
        endTour();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTour);
  } else {
    initTour();
  }
})();
