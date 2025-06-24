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


document.addEventListener("scroll", function() {
  // Prüfe, ob der Hero-Text existiert
  const heroTextBlocks = document.querySelectorAll(".projects-hero-text h1, .projects-hero-text p, .hero-content h1, .hero-content p");
  if (heroTextBlocks.length === 0) return; // Nichts zu tun, wenn kein Hero vorhanden

  const scrollY = window.scrollY || window.pageYOffset;
  const fadeStart = 40;
  const fadeEnd = 200;
  let opacity = 1;
  if (scrollY > fadeStart) {
    opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
    opacity = Math.max(opacity, 0);
  }
  heroTextBlocks.forEach(el => {
    el.style.opacity = opacity;
  });
});
