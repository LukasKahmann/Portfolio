async function includeHTML() {
  // Header
  const headerEl = document.getElementById('header');
  if (headerEl) {
    let headerFile = "partials/header.html";
    if (window.location.pathname.includes('/projects/')) {
      headerFile = "../partials/header-projects.html";
    }
    const resp = await fetch(headerFile);
    headerEl.innerHTML = await resp.text();
  }
  // Footer
  const footerEl = document.getElementById('footer');
  if (footerEl) {
    let footerFile = "partials/footer.html";
    if (window.location.pathname.includes('/projects/')) {
      footerFile = "../partials/footer.html";
    }
    const resp = await fetch(footerFile);
    footerEl.innerHTML = await resp.text();
  }
}
window.addEventListener('DOMContentLoaded', includeHTML);
