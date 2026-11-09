/* Language selection and the contact form. No dependencies, no external requests
   except the form submission itself. */
(function () {
  "use strict";

  var SUPPORTED = ["en", "de", "fr"];
  var FORM_ENDPOINT =
    "https://formsubmit.co/ajax/contact@neuralcontinuitylabs.com";
  var dict = window.I18N || {};
  var current = "en";

  function t(key) {
    var d = dict[current] || {};
    return d[key] != null ? d[key] : (dict.en || {})[key];
  }

  /* ?lang= wins, then a choice made earlier on this device, then the browser's
     language list, then English. */
  function detect() {
    var fromUrl = new URLSearchParams(location.search).get("lang");
    if (SUPPORTED.indexOf(fromUrl) !== -1) return fromUrl;
    try {
      var saved = localStorage.getItem("lang");
      if (SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    var prefs = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < prefs.length; i++) {
      var base = String(prefs[i]).slice(0, 2).toLowerCase();
      if (SUPPORTED.indexOf(base) !== -1) return base;
    }
    return "en";
  }

  function apply(lang) {
    current = lang;
    document.documentElement.lang = lang;

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var s = t(nodes[i].getAttribute("data-i18n"));
      if (s != null) {
        var lines = s.split("\n");
        nodes[i].replaceChildren();
        lines.forEach(function (line, index) {
          if (index) nodes[i].appendChild(document.createElement("br"));
          nodes[i].appendChild(document.createTextNode(line));
        });
        nodes[i].lang = lang;
      }
    }
    var attrNodes = document.querySelectorAll("[data-i18n-attr]");
    for (var j = 0; j < attrNodes.length; j++) {
      var pairs = attrNodes[j].getAttribute("data-i18n-attr").split(";");
      for (var k = 0; k < pairs.length; k++) {
        var p = pairs[k].split(":");
        var v = t(p[1]);
        if (v != null) attrNodes[j].setAttribute(p[0], v);
      }
    }

    var page = document.body.getAttribute("data-page") || "index";
    document.title = t("meta.title." + page) || document.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc && page === "index")
      desc.setAttribute("content", t("meta.description"));

    document.querySelectorAll("a[href]").forEach(function (link) {
      var url = new URL(link.getAttribute("href"), location.href);
      if (
        url.origin === location.origin &&
        !url.pathname.match(/\.(svg|png|pdf|woff2?|ttf)$/)
      ) {
        url.searchParams.set("lang", lang);
        link.setAttribute("href", url.pathname + url.search + url.hash);
      }
    });
    var buttons = document.querySelectorAll("[data-lang]");
    for (var b = 0; b < buttons.length; b++) {
      buttons[b].setAttribute(
        "aria-pressed",
        buttons[b].getAttribute("data-lang") === lang ? "true" : "false",
      );
    }
  }

  function bindLanguageButtons() {
    var buttons = document.querySelectorAll("[data-lang]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        var lang = this.getAttribute("data-lang");
        try {
          localStorage.setItem("lang", lang);
        } catch (e) {}
        apply(lang);
        if (history.replaceState) {
          var url = new URL(location.href);
          url.searchParams.set("lang", lang);
          history.replaceState(null, "", url);
        }
      });
    }
  }

  function bindForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = form.querySelector(".status");
    var button = form.querySelector('button[type="submit"]');

    function show(kind, key) {
      status.className = "status " + kind;
      status.textContent = t(key);
    }

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var message = form.elements.message.value.trim();
      var honey = form.elements._honey.value;
      if (honey || button.disabled) return;
      var firstInvalid = null;
      ["name", "email", "message"].forEach(function (field) {
        var input = form.elements[field];
        var invalid = !input.value.trim() || !input.checkValidity();
        input.setAttribute("aria-invalid", String(invalid));
        if (invalid && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) {
        show("err", "form.invalid");
        firstInvalid.focus();
        return;
      }
      button.disabled = true;
      button.textContent = t("form.sending");
      status.className = "status";
      status.textContent = "";

      var controller = new AbortController();
      var timeout = setTimeout(function () {
        controller.abort();
      }, 15000);
      fetch(FORM_ENDPOINT, {
        signal: controller.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: "Website contact from " + name,
          _replyto: email,
          _honey: honey,
          _captcha: "false",
          _template: "table",
        }),
      })
        .then(function (r) {
          return r.ok
            ? r.json()
            : Promise.reject(new Error("HTTP " + r.status));
        })
        .then(function (data) {
          // FormSubmit answers 200 with success:"false" when the address is not yet activated
          if (String(data && data.success) !== "true")
            throw new Error(data && data.message);
          form.reset();
          show("ok", "form.success");
        })
        .catch(function () {
          show("err", "form.error");
        })
        .then(function () {
          clearTimeout(timeout);
          button.disabled = false;
          button.textContent = t("form.send");
        });
    });
  }

  apply(detect());
  bindLanguageButtons();
  bindForm();
})();
