export default function initThemeToggle(): void {
  const btn = document.getElementById("themeToggle");
  const html = document.documentElement;

  if (!btn) {
    return;
  }

  const stored = localStorage.getItem("data-theme") || "light";
  console.log(stored);

  html.setAttribute("data-theme", stored);
  setLogo(stored);

  btn.innerHTML =
    stored === "dark"
      ? `<i class="bi bi-moon-stars-fill"></i>`
      : `<i class="bi bi-sunrise-fill"></i>`;

  btn.addEventListener("click", (): void => {
    const isDark = html.getAttribute("data-theme");
    console.log("isDark: ", isDark);
    const next = isDark === "dark" ? "light" : "dark";

    console.log(next);

    // isdark old
    // next new

    html.setAttribute("data-theme", next);
    setLogo(next);
    localStorage.setItem("data-theme", next);

    btn.innerHTML =
      next === "dark"
        ? `<i class="bi bi-moon-stars-fill"></i>`
        : `<i class="bi bi-sunrise-fill"></i>`;
  });
}

function setLogo(isDark: string): void {
  console.log("exc");
  console.log(isDark);

  const src =
    isDark === "dark" ? "./assets/logo.svg" : "./assets/logo-light.svg";
  console.log(src);
  document.querySelectorAll(".fl-logo-mark").forEach(function (img): void {
    img.src = src;
  });
  document.querySelectorAll(".hero-logo").forEach(function (img): void {
    img.src = src;
  });
}

initThemeToggle();
