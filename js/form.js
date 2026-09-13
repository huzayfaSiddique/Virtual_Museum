/* ==========================================================================
   form.js — Feature 6: Contact Form Validation (Visit page)
   Used only on visit.html (plan §5, Feature 6).

   Behaviour
   ---------
   - A submit listener calls event.preventDefault() (there is no backend).
   - Validates each field:
       · Name / Subject  -> required, must not be blank after trimming
       · Email           -> required + matches a regex pattern
       · Message         -> required + at least MIN_MESSAGE characters
   - Invalid fields get a red border and an inline .error-msg the moment you
     submit; the error clears as the user fixes that field (input listener per
     field).
   - If every field is valid, a success banner is shown and the form resets.
   - Accessibility: each input carries aria-describedby pointing at its error
     span, so screen readers announce the message.

   Viva talking points: email regex, preventDefault, per-field vs whole-form
   validation, associating errors via aria-describedby.
   ========================================================================== */
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

  // Validate one field; returns true when it is valid.
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
      // required: name and subject
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

  // Re-validate a field whenever the user edits it, so errors clear live.
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

    // Each entry is { input, errorEl, type }.
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

      // All valid — show confirmation and reset (no backend here).
      if (successBanner) {
        successBanner.hidden = false;
      }
      form.reset();
      clearAllErrors(fields);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initForm);
  } else {
    initForm();
  }
})();