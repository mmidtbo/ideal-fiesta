(function ($: JQueryStatic): void {
  "use strict";

  function initThemeToggle(): void {
    var $btn = $("#themeToggle");
    if (!$btn.length) {
      return;
    }

    var stored = localStorage.getItem("fl-theme");
    if (stored === "dark") {
      $("html").attr("data-bs-theme", "dark");
      $btn.text("🌙");
    }

    $btn.on("click", function (): void {
      var html = $("html");
      var isDark = html.attr("data-bs-theme") === "dark";
      var next = isDark ? "light" : "dark";
      html.attr("data-bs-theme", next);
      localStorage.setItem("fl-theme", next);
      $btn.text(isDark ? "\u2600" : "\u{1F319}");
    });
  }

  // ─── Toast Notification ───────────────────────────────────────────
  // function showToast(msg) {
  //   var id = "fl-toast-" + Date.now();
  //   var $toast = $(
  //     '<div id="' +
  //       id +
  //       '" style="position:fixed;bottom:1.5rem;right:1.5rem;' +
  //       "background:var(--surface-0,#1e1e2e);color:var(--fg,#cdd6f4);" +
  //       "padding:0.65rem 1.25rem;border-radius:8px;" +
  //       "border:1px solid var(--border,#313244);" +
  //       "box-shadow:0 4px 20px rgba(0,0,0,.35);" +
  //       "z-index:9999;font-size:0.85rem;" +
  //       'opacity:0;transition:opacity .2s">' +
  //       msg +
  //       "</div>",
  //   );
  //   $("body").append($toast);
  //   setTimeout(function () {
  //     $("#" + id).css("opacity", 1);
  //   }, 10);
  //   setTimeout(function () {
  //     $("#" + id).css("opacity", 0);
  //     setTimeout(function () {
  //       $("#" + id).remove();
  //     }, 250);
  //   }, 2000);
  // }

  // ─── Copy to Clipboard ────────────────────────────────────────────
  function initCopyButtons() {
    $(document).on(
      "click",
      ".fl-terminal-bar .btn, .fl-code-header .btn",
      function (e) {
        var $btn = $(this);
        if ($btn.text().trim() !== "Copy") return;

        var $block = $btn.closest(".fl-terminal, .fl-code-block");
        var text;

        if ($block.hasClass("fl-terminal")) {
          text = $block.find(".fl-terminal-body").text().trim();
        } else {
          text = $block.find("pre code").text().trim();
        }

        navigator.clipboard
          .writeText(text)
          .then(function () {
            showToast("\u2705 Copied to clipboard");
          })
          .catch(function () {
            showToast("\u274c Failed to copy");
          });
      },
    );
  }

  // ─── Mobile Sidebar Toggle ────────────────────────────────────────
  function initSidebarToggle() {
    var $sidebar = $("#docsSidebar");
    if (!$sidebar.length) return;

    var $toggle = $(
      '<button type="button" id="sidebarToggle" ' +
        'class="btn btn-outline-light btn-sm d-md-none" ' +
        'style="position:fixed;bottom:1.5rem;left:1.5rem;z-index:9999">' +
        "\u2630 Menu</button>",
    );
    $("body").append($toggle);

    $toggle.on("click", function () {
      $sidebar.toggle();
    });

    $(document).on("click", function (e) {
      if ($(window).width() >= 768) return;
      if ($(e.target).closest("#docsSidebar, #sidebarToggle").length) return;
      $sidebar.hide();
    });

    $(window).on("resize", function () {
      if ($(window).width() >= 768) {
        $sidebar.css("display", "");
      }
    });
  }

  // ─── Scroll Spy (TOC highlight) ───────────────────────────────────
  function initScrollSpy() {
    var $tocLinks = $(".fl-toc-nav a");
    if (!$tocLinks.length) return;

    var headings = [];
    $tocLinks.each(function () {
      var href = $(this).attr("href");
      if (href && href.startsWith("#")) {
        headings.push(href.substring(1));
      }
    });

    function updateActive() {
      var scrollTop = $(window).scrollTop() + 120;
      var activeId = null;

      $.each(headings, function (_, id) {
        var $el = $("#" + id);
        if ($el.length && $el.offset().top <= scrollTop) {
          activeId = id;
        }
      });

      $tocLinks.removeClass("active");
      if (activeId) {
        $tocLinks.filter('[href="#' + activeId + '"]').addClass("active");
      }
    }

    $(window).on("scroll", updateActive);
    updateActive();
  }

  // ─── Back to Top ──────────────────────────────────────────────────
  function initBackToTop() {
    var $btn = $(
      '<button type="button" id="backToTop" ' +
        'style="position:fixed;bottom:1.5rem;right:1.5rem;' +
        "width:38px;height:38px;border-radius:50%;border:1px solid var(--border,#313244);" +
        "background:var(--surface-0,#1e1e2e);color:var(--fg,#cdd6f4);" +
        "font-size:1.1rem;cursor:pointer;z-index:9998;" +
        'opacity:0;transition:opacity .25s;display:none">' +
        "\u2191</button>",
    );
    $("body").append($btn);

    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 300) {
        $btn.css({ display: "block", opacity: 1 });
      } else {
        $btn.css("opacity", 0);
        setTimeout(function () {
          if ($(window).scrollTop() <= 300) $btn.css("display", "none");
        }, 260);
      }
    });

    $btn.on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 300);
    });
  }

  // ─── Init on DOM ready ────────────────────────────────────────────
  $(function () {
    initThemeToggle();
    initCopyButtons();
    initSidebarToggle();
    initScrollSpy();
    initBackToTop();
  });
})(jQuery);
