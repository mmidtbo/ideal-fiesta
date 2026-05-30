(function ($: JQueryStatic): void {
  "use strict";

  $(function (): void {
    var $html = $("html");
    var stored = localStorage.getItem("data-theme") || "light";

    $html.attr("data-theme", stored);
    setLogo(stored);

    $("#themeToggle").html(
      stored === "dark"
        ? '<i class="bi bi-moon-stars-fill"></i>'
        : '<i class="bi bi-sunrise-fill"></i>',
    );

    $(document).on("click", "#themeToggle", function (): void {
      var isDark = $html.attr("data-theme") === "dark";
      var next = isDark ? "light" : "dark";

      $html.attr("data-theme", next);
      setLogo(next);
      localStorage.setItem("data-theme", next);

      $(this).html(
        next === "dark"
          ? '<i class="bi bi-moon-stars-fill"></i>'
          : '<i class="bi bi-sunrise-fill"></i>',
      );
    });

    function setLogo(mode: string): void {
      var src =
        mode === "dark" ? "./assets/logo.svg" : "./assets/logo-light.svg";
      $(".fl-logo-mark, .hero-logo").attr("src", src);
    }
  });
})(jQuery);
