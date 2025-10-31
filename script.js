gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

// === HERO ANIMATIONS ===
window.addEventListener("load", () => {
  const tl = gsap.timeline();

  tl.set(".hero-cta", { opacity: 0, y: 18 }); // make sure it's initially hidden but visible to GSAP

  tl.from(".hero-title", { 
      opacity: 0, 
      y: 36, 
      duration: 0.9, 
      ease: "power2.out" 
    })
    .from(".hero-sub", { 
      opacity: 0, 
      y: 28, 
      duration: 0.8, 
      ease: "power2.out" 
    }, "-=0.45")
    .to(".hero-cta", { 
      opacity: 1, 
      y: 0, 
      duration: 0.7, 
      ease: "power2.out" 
    }, "-=0.35");
});

// === SECTION SCROLL ANIMATIONS ===
document.querySelectorAll("section").forEach((section, idx) => {
  if (idx === 0) return;
  const fromX = idx % 2 === 0 ? -30 : 30;
  gsap.from(section, {
    opacity: 0,
    y: 40,
    x: fromX,
    duration: 0.9,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
});

// === SMOOTH SCROLLING NAV ===
document.querySelectorAll("nav a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    gsap.to(window, { duration: 0.9, ease: "power2.out", scrollTo: { y: target, offsetY: 84 } });
  });
});

// === YEAR ===
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// === IFRAME MODAL ===
const previewModal = document.getElementById("previewModal");
const previewFrame = document.getElementById("previewFrame");
const closeBtn = document.getElementById("closeBtn");

function openPreview(url) {
  if (!previewModal || !previewFrame) return;

  previewFrame.src = url;
  document.body.style.overflow = "hidden";

  gsap.set(previewModal, { display: "flex", opacity: 0, scale: 0.95 });
  gsap.to(previewModal, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
}

function closePreview() {
  if (!previewModal || !previewFrame) return;

  gsap.to(previewModal, {
    opacity: 0,
    scale: 0.95,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      gsap.set(previewModal, { display: "none" });
      previewFrame.src = "";
      document.body.style.overflow = "";
    },
  });
}

if (closeBtn) closeBtn.addEventListener("click", closePreview);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closePreview();
});

// expose globally
window.openPreview = openPreview;
window.closePreview = closePreview;
