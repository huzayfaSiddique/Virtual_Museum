(function () {
  "use strict";

  var TOUR_LENGTH = 5;

  function initTour() {
    var startBtn = document.getElementById("tour-start");
    var panel = document.getElementById("tour-panel");

    if (!startBtn || !panel) {
      return;
    }

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

    var tour = [];
    var index = 0;

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

    function pickTour() {
      var count = Math.min(TOUR_LENGTH, artworks.length);
      return shuffle(artworks).slice(0, count);
    }

    function render() {
      var art = tour[index];

      imageEl.src = art.image;
      imageEl.alt = art.title + " by " + art.artist;
      titleEl.textContent = art.title;
      metaEl.textContent = art.artist + " · " + art.year + " · " + art.medium;
      descEl.textContent = art.desc;
      counterEl.textContent = index + 1 + " of " + tour.length;

      prevBtn.disabled = index === 0;
      nextBtn.textContent = index === tour.length - 1 ? "Finish" : "Next";
    }

    function startTour() {
      tour = pickTour();
      index = 0;
      render();
      panel.classList.add("open");
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

    startBtn.addEventListener("click", startTour);

    nextBtn.addEventListener("click", function () {
      if (index === tour.length - 1) {
        endTour();
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
