// Repo-Name anpassen, falls nötig!
const repoRoot = '/portfolio/';

async function includeHTML() {
  // Header
  const headerEl = document.getElementById('header');
  if (headerEl) {
    let headerFile = repoRoot + 'partials/header.html';
    if (window.location.pathname.includes('/projects/')) {
      headerFile = repoRoot + 'partials/header-projects.html';
    }
    const resp = await fetch(headerFile);
    headerEl.innerHTML = await resp.text();
  }
  // Footer
  const footerEl = document.getElementById('footer');
  if (footerEl) {
    const footerFile = repoRoot + 'partials/footer.html';
    const resp = await fetch(footerFile);
    footerEl.innerHTML = await resp.text();
  }
}
window.addEventListener('DOMContentLoaded', includeHTML);
