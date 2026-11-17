const pages = ["home", "about", "skills", "education", "contact"];
const root = document.documentElement;
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");

/* ---------- Pages ---------- */
function showPage(name) {
  if (!pages.includes(name)) name = "home";
  document.querySelectorAll(".page").forEach(p => p.classList.toggle("show", p.id === name));
  document.querySelectorAll("nav a").forEach(a => a.classList.toggle("active", a.dataset.link === name));
  document.body.dataset.page = name;          // changes the colour of the page
  document.title = name === "home"
    ? "Peerzado Lund | IT Student, Networking & Web"
    : name.charAt(0).toUpperCase() + name.slice(1) + " | Peerzado Lund";
  window.scrollTo({ top: 0, behavior: "smooth" });
  nav.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}

window.addEventListener("hashchange", () => showPage(location.hash.slice(1)));
showPage(location.hash.slice(1));

/* ---------- Mobile menu ---------- */
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

/* ---------- Dark / Light ---------- */
function setTheme(t) {
  if (t === "light") root.setAttribute("data-theme", "light");
  else root.removeAttribute("data-theme");
  try { localStorage.setItem("theme", t); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || "dark");

document.getElementById("themeBtn").addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
});

/* ---------- Profile photo zoom in / out on click ---------- */
const photo = document.querySelector(".photo");
let zoomed = false;
photo.addEventListener("click", () => {
  zoomed = !zoomed;
  photo.style.transform = zoomed ? "scale(1.3)" : "";
  photo.style.cursor = zoomed ? "zoom-out" : "zoom-in";
});

document.getElementById("year").textContent = new Date().getFullYear();