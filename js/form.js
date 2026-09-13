(function () {
  "use strict";

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var MESSAGE_MIN = 20;

  function showError(input, errorEl, message) {
    errorEl.textContent = message;
    input.classList.add("invalid");
  }

  function clearError(input, errorEl) {
    errorEl.textContent = "";
    input.classList.remove("invalid");
  }

  function validateField(input, errorEl, type) {
    var value = input.value.trim();
    var error = "";

    if (type === "email") {
      if (!value) {
        error = "Please enter your email address.";
      } else if (!EMAIL_RE.test(value)) {
        error = "Please enter a valid email address (e.g. name@example.com).";
      }
    } else if (type === "message") {
      if (!value) {
        error = "Please write a message.";
      } else if (value.length < MESSAGE_MIN) {
        error = "Your message must be at least " + MESSAGE_MIN + " characters long.";
      }
    } else {
      if (!value) {
        error = "Please fill in this field.";
      }
    }

    if (error) {
      showError(input, errorEl, error);
      return false;
    }
    clearError(input, errorEl);
    return true;
  }

  function clearAllErrors(fields) {
    for (var i = 0; i < fields.length; i++) {
      clearError(fields[i].input, fields[i].errorEl);
    }
  }

  function attachLiveClear(field) {
    field.input.addEventListener("input", function () {
      validateField(field.input, field.errorEl, field.type);
    });
  }

  function initForm() {
    var form = document.getElementById("contact-form");
    if (!form) {
      return;
    }

    var successBanner = document.getElementById("form-success");

    var fields = [
      { input: document.getElementById("form-name"), type: "required" },
      { input: document.getElementById("form-email"), type: "email" },
      { input: document.getElementById("form-subject"), type: "required" },
      { input: document.getElementById("form-message"), type: "message" }
    ];

    for (var i = 0; i < fields.length; i++) {
      fields[i].errorEl = document.getElementById(fields[i].input.id + "-error");
    }

    for (var j = 0; j < fields.length; j++) {
      attachLiveClear(fields[j]);
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var allValid = true;
      var firstInvalid = null;
      for (var k = 0; k < fields.length; k++) {
        var ok = validateField(fields[k].input, fields[k].errorEl, fields[k].type);
        if (!ok && !firstInvalid) {
          firstInvalid = fields[k].input;
        }
        if (!ok) {
          allValid = false;
        }
      }

      if (!allValid) {
        if (successBanner) {
          successBanner.hidden = true;
        }
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      if (successBanner) {
        successBanner.hidden = false;
      }
      form.reset();
      clearAllErrors(fields);
    });
  }

  function initVisitStatus() {
    var statusEl = document.getElementById("visit-status");
    if (!statusEl) return;

    var now = new Date();
    var day = now.getDay();

    var dot = statusEl.querySelector(".status-dot");
    var title = statusEl.querySelector(".status-title");
    var time = statusEl.querySelector(".status-time");

    if (day === 1) {
      if (dot) {
        dot.classList.remove("status-dot--open");
        dot.classList.add("status-dot--closed");
      }
      if (title) title.textContent = "Closed today";
      if (time) time.textContent = "Opens Tuesday 10am";
    } else if (day === 5) {
      if (time) time.textContent = "10am–8pm (Late hours)";
    }
  }

  function init() {
    initForm();
    initVisitStatus();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
