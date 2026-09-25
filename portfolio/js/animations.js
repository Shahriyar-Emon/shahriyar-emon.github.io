// ================================================================
// ANIMATIONS.JS — everything that moves. Content lives in data.js,
// layout/rendering lives in main.js; this file only handles motion.
// ================================================================

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

document.addEventListener("DOMContentLoaded", () => {
  setupScrollProgress();
  setupScrollReveal();
  setupTimelineFill();
  setupBackToTop();
  setupDirectionHighlight();

  if (!isTouchDevice) {
    setupCustomCursor();
    setupHeroGlow();
    setupMagneticButtons();
    setupProjectTilt();
  } else {
    document.body.classList.add("no-cursor");
  }

  if (!prefersReducedMotion && !isTouchDevice) {
    setupParticles();
  }
});

/* ---------------- SCROLL PROGRESS BAR ---------------- */
function setupScrollProgress() {
  const fill = document.getElementById("scrollProgress");
  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    fill.style.width = `${pct}%`;
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* ---------------- SCROLL REVEAL (IntersectionObserver) ---------------- */
function setupScrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (prefersReducedMotion) {
    targets.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  targets.forEach((el) => observer.observe(el));

  // Hero content reveals immediately on load rather than waiting for scroll
  document
    .querySelectorAll(".hero .reveal")
    .forEach((el, i) => setTimeout(() => el.classList.add("is-in"), 80 * i));
}

/* ---------------- TIMELINE DRAW-IN ---------------- */
function setupTimelineFill() {
  const timeline = document.getElementById("timeline");
  const fill = document.getElementById("timelineFill");
  const items = document.querySelectorAll(".timeline__item");
  if (!timeline || !items.length) return;

  const itemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.4 }
  );
  items.forEach((item) => itemObserver.observe(item));

  const updateFill = () => {
    const rect = timeline.getBoundingClientRect();
    const viewportCenter = window.innerHeight * 0.65;
    const progressPx = viewportCenter - rect.top;
    const pct = Math.max(0, Math.min(100, (progressPx / rect.height) * 100));
    fill.style.height = `${pct}%`;
  };
  window.addEventListener("scroll", updateFill, { passive: true });
  window.addEventListener("resize", updateFill);
  updateFill();
}

/* ---------------- CUSTOM CURSOR ---------------- */
function setupCustomCursor() {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  let ringX = window.innerWidth / 2,
    ringY = window.innerHeight / 2;
  let mouseX = ringX,
    mouseY = ringY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  const clickable = "a, button, input, textarea, .skill-tag, .project-card";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(clickable)) ring.classList.add("is-active");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(clickable)) ring.classList.remove("is-active");
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  requestAnimationFrame(animateRing);
}

/* ---------------- HERO MOUSE-FOLLOW GLOW + PARALLAX ---------------- */
function setupHeroGlow() {
  const hero = document.querySelector(".hero");
  const glow = document.getElementById("heroGlow");
  const photo = document.querySelector(".hero__photo-wrap");
  if (!hero) return;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.transform = `translate(${x - 240}px, ${y - 240}px)`;

    if (photo && !prefersReducedMotion) {
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = ((x - cx) / cx) * 8;
      const dy = ((y - cy) / cy) * 8;
      photo.style.transform = `translate(${dx}px, ${dy}px)`;
    }
  });
}

/* ---------------- MAGNETIC BUTTONS ---------------- */
function setupMagneticButtons() {
  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.3}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });
}

/* ---------------- PROJECT CARD 3D TILT ---------------- */
function setupProjectTilt() {
  document.addEventListener("mousemove", (e) => {
    const card = e.target.closest(".project-card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(700px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-4px)`;
  });
  document.addEventListener("mouseleave", (e) => {
    const card = e.target.closest && e.target.closest(".project-card");
    if (card) card.style.transform = "";
  }, true);
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* ---------------- BACK TO TOP ---------------- */
function setupBackToTop() {
  const btn = document.getElementById("toTop");
  window.addEventListener(
    "scroll",
    () => btn.classList.toggle("is-visible", window.scrollY > 600),
    { passive: true }
  );
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

/* ---------------- DIRECTION PATH SCROLL HIGHLIGHT ---------------- */
function setupDirectionHighlight() {
  const steps = document.querySelectorAll(".direction-step");
  if (!steps.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-active");
      });
    },
    { threshold: 0.6 }
  );
  steps.forEach((s) => observer.observe(s));
}

/* ---------------- SUBTLE PARTICLE SYSTEM (hero only) ---------------- */
function setupParticles() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const count = window.innerWidth < 768 ? 6 : 14;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    const size = 2 + Math.random() * 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${50 + Math.random() * 50}%`;
    p.style.setProperty("--drift-x", `${(Math.random() - 0.5) * 60}px`);
    p.style.setProperty("--drift-y", `${-(120 + Math.random() * 160)}px`);
    p.style.setProperty("--particle-opacity", `${0.25 + Math.random() * 0.35}`);
    p.style.animationDuration = `${8 + Math.random() * 8}s`;
    p.style.animationDelay = `${Math.random() * 8}s`;
    hero.appendChild(p);
  }
}
