function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  console.log(btn);

  if (!btn) {
    return;
  }

  const stored = localStorage.getItem("fl-theme");
  if (stored === "dark") {
    document.documentElement.setAttribute("data-bs-theme", "dark");
    btn.textContent = "";
  }

  btn.addEventListener("click", () => {
    const html = document.documentElement;
    const isDark = html.getAttribute("data-bs-theme") === "dark";
    const next = isDark ? "light" : "dark";
    html.setAttribute("data-bs-theme", next);
    localStorage.setItem("fl-theme", next);
    btn.textContent = isDark ? "☀" : "";
  });
}
