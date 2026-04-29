/* ===== HEADER ===== */
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

/* ===== MOBILE MENU ===== */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    navLinks.classList.remove("open");
  });
});

/* ===== STILLS GROUP TOGGLE ===== */
document.querySelectorAll(".group-label").forEach(label => {
  label.addEventListener("click", () => {
    const group = label.closest(".stills-group");
    const isOpen = group.classList.toggle("open");
    label.setAttribute("aria-expanded", isOpen);
  });
});

/* ===== LIGHTBOX ===== */
const lightbox = document.getElementById("lightbox");
const lbImg = lightbox.querySelector(".lb-img");
const stills = document.querySelectorAll(".still-item");
const images = [];
let idx = 0;

stills.forEach((item, i) => {
  images.push(item.querySelector("img").src);
  item.addEventListener("click", () => {
    idx = i;
    lbImg.src = images[idx];
    lightbox.classList.add("open");
    document.body.classList.add("no-scroll");
  });
});

function close() {
  lightbox.classList.remove("open");
  document.body.classList.remove("no-scroll");
}

lightbox.querySelector(".lightbox-bg").addEventListener("click", close);
lightbox.querySelector(".lb-close").addEventListener("click", close);

lightbox.querySelector(".lb-prev").addEventListener("click", () => {
  idx = (idx - 1 + images.length) % images.length;
  lbImg.src = images[idx];
});

lightbox.querySelector(".lb-next").addEventListener("click", () => {
  idx = (idx + 1) % images.length;
  lbImg.src = images[idx];
});

document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowLeft") lightbox.querySelector(".lb-prev").click();
  if (e.key === "ArrowRight") lightbox.querySelector(".lb-next").click();
});

/* ===== FADE IN ON SCROLL ===== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.1 });

document.querySelectorAll(".about-inner, .stills-heading, .stills-group").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

document.head.insertAdjacentHTML("beforeend",
  `<style>.visible{opacity:1!important;transform:translateY(0)!important}</style>`
);
