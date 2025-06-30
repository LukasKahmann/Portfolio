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

  // Sprachumschaltung initialisieren (nachdem Header geladen wurde!)
  initLanguageToggle();
}

// ------------------------
// Sprachumschaltung: Globale & seitenbasierte JSON pro Sprache
// ------------------------

function getJsonPrefix() {
  // Prüfe, ob wir im /projects/ Unterordner sind
  return window.location.pathname.includes('/projects/') ? "../" : "";
}

function getGlobalLanguageFile(lang) {
  const prefix = getJsonPrefix();
  return `${prefix}json/global-${lang}.json`;
}

function getPageLanguageFile(lang) {
  let page = "index";
  const path = window.location.pathname;
  const prefix = getJsonPrefix();
  if (path.includes("/projects/")) {
    const match = path.match(/projects\/([a-zA-Z0-9\-_]+)\.html/);
    if (match && match[1]) page = match[1];
    else page = "projects";
  } else if (path.includes("about")) page = "about";
  else if (path.includes("resume")) page = "resume";
  return `${prefix}json/${page}-${lang}.json`;
}

// Lese "lang" aus URL, ansonsten aus localStorage
function getLangFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('lang');
}

function setLanguage(lang) {
  Promise.all([
    fetch(getGlobalLanguageFile(lang)).then(r => r.json()),
    fetch(getPageLanguageFile(lang)).then(r => r.json())
  ]).then(([globalData, pageData]) => {
    const data = Object.assign({}, globalData, pageData); // Seitenspezifisches überschreibt globales
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (data[key]) el.innerHTML = data[key];
    });
    document.querySelectorAll('.lang-btn, .lang-btn-radio').forEach(btn => btn.classList.remove('active'));
    if (lang === 'de') document.getElementById('lang-de')?.classList.add('active');
    if (lang === 'en') document.getElementById('lang-en')?.classList.add('active');
    localStorage.setItem('language', lang);

    // URL anpassen ohne Reload:
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
  });
}

function initLanguageToggle() {
  const urlLang = getLangFromUrl();
  const storedLang = localStorage.getItem('language');
  const defaultLang = urlLang || storedLang || 'de';
  setLanguage(defaultLang);

  document.getElementById('lang-de')?.addEventListener('click', () => setLanguage('de'));
  document.getElementById('lang-en')?.addEventListener('click', () => setLanguage('en'));
}

// ------------------------------------
// Scroll-Fade für Hero-Text (wie gehabt)
// ------------------------------------
document.addEventListener("scroll", function() {
  const heroTextBlocks = document.querySelectorAll(".projects-hero-text h1, .projects-hero-text p, .hero-content h1, .hero-content p");
  if (heroTextBlocks.length === 0) return;
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

window.addEventListener('DOMContentLoaded', includeHTML);
