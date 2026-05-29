import initThemeToggle from "./app-jsdom.js";

async function loadComponent(id, file) {
  const element = document.getElementById(id);
  const response = await fetch(file);
  const html = await response.text();
  element.innerHTML = html;
}
async function InitPage() {
  await Promise.all([
    loadComponent("navbar", "parts/navbar.html"),
    loadComponent("hero", "parts/hero.html"),
    loadComponent("problem", "parts/problem.html"),
    loadComponent("features", "parts/features.html"),
    loadComponent("docs-preview", "parts/docs-preview.html"),
    loadComponent("installation", "parts/installation.html"),
    loadComponent("community", "parts/community.html"),
    loadComponent("footer", "parts/footer.html"),
  ]);

  initThemeToggle();
}

InitPage();
