export default function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  const html = document.documentElement;

  if (!btn) {
    return;
  }

  const stored = localStorage.getItem("data-theme") || "dark";
  console.log("stored: ", stored);
  if (stored === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    btn.innerHTML = `<i class="bi bi-moon-stars-fill"></i>`;
  }

  btn.addEventListener("click", () => {
    const isDark = html.getAttribute("data-theme");
    console.log("isDark: ", isDark);
    const next = isDark === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", next);
    localStorage.setItem("data-theme", next);

    btn.innerHTML =
      next === "dark"
        ? `<i class="bi bi-moon-stars-fill"></i>`
        : `<i class="bi bi-sunrise-fill"></i>`;
  });
}

initThemeToggle();
