async function includeHTML() {
  for (const id of ['header', 'footer']) {
    const el = document.getElementById(id);
    if (el) {
      let file = '/partials/' + id + '.html';
      // Erkenne, ob wir in /projects/ sind
      if (window.location.pathname.includes('/projects/')) {
        file = '../partials/' + id + '.html';
      }
      try {
        const resp = await fetch(file);
        if (resp.ok) {
          el.innerHTML = await resp.text();
        }
      } catch (e) {
        el.innerHTML = `<div style="color:red;">Include "${file}" not found.</div>`;
      }
    }
  }
}
window.addEventListener('DOMContentLoaded', includeHTML);
