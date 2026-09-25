// ================================================================
// MAIN.JS — renders portfolioData (from data.js) into the page,
// and handles navigation, mobile menu, and the contact form.
// Animation-specific logic lives in animations.js.
// ================================================================

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderHero();
  renderAbout();
  renderJourney();
  renderLearning();
  renderProjects();
  renderSkills();
  renderDirection();
  renderContact();
  renderFooter();

  setupMobileMenu();
  setupSmoothScrollAndActiveLink();
  setupContactForm();
});

/* ---------------- NAV ---------------- */
function renderNav() {
  const links = portfolioData.nav
    .map((item) => `<a href="${item.href}">${item.label}</a>`)
    .join("");
  document.getElementById("navLinks").innerHTML = links;
  document.getElementById("navMobile").innerHTML = links;
}

/* ---------------- HERO ---------------- */
function renderHero() {
  document.getElementById("heroName").textContent = portfolioData.name;
  document.getElementById("heroRole").textContent = portfolioData.role;
  document.getElementById("heroDesc").textContent = portfolioData.heroDescription;
  document.getElementById("heroPhoto").alt = `Portrait of ${portfolioData.name}`;
}

/* ---------------- ABOUT ---------------- */
function renderAbout() {
  const html = portfolioData.about
    .map(
      (item, i) => `
      <div class="about-card reveal" data-reveal="fade-up" data-delay="${i % 4}">
        <p class="about-card__label">${item.label}</p>
        <p class="about-card__value">${item.value}</p>
      </div>`
    )
    .join("");
  document.getElementById("aboutGrid").innerHTML = html;
}

/* ---------------- JOURNEY ---------------- */
function renderJourney() {
  const statusLabel = { done: "Completed", current: "In progress", future: "Planned" };
  const html = portfolioData.journey
    .map(
      (item) => `
      <div class="timeline__item reveal" data-reveal="fade-up" data-status="${item.status}">
        <span class="timeline__node"></span>
        <p class="timeline__year mono">${item.year}</p>
        <h3 class="timeline__title">${item.title}</h3>
        <p class="timeline__detail">${item.detail}</p>
        <span class="timeline__badge mono">${statusLabel[item.status]}</span>
      </div>`
    )
    .join("");
  document.getElementById("timeline").insertAdjacentHTML("beforeend", html);
}

/* ---------------- LEARNING BOARD ---------------- */
function renderLearning() {
  const cols = [
    { key: "learning", label: "Learning" },
    { key: "strengthening", label: "Strengthening" },
    { key: "exploring", label: "Exploring Next" },
  ];
  const html = cols
    .map(
      (col, i) => `
      <div class="learning-col reveal" data-reveal="fade-up" data-delay="${i}" data-state="${col.key}">
        <div class="learning-col__head">
          <span class="learning-col__dot"></span>
          <p class="learning-col__title mono">${col.label.toUpperCase()}</p>
        </div>
        ${portfolioData.learningBoard[col.key]
          .map((item) => `<div class="learning-item">${item}</div>`)
          .join("")}
      </div>`
    )
    .join("");
  document.getElementById("learningBoard").innerHTML = html;
}

/* ---------------- PROJECTS ---------------- */
function renderProjects() {
  const html = portfolioData.projects
    .map(
      (p, i) => `
      <article class="project-card reveal" data-reveal="fade-up" data-delay="${i % 3}">
        <p class="project-card__number mono">${p.number}</p>
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__desc">${p.description}</p>
        <div class="project-card__tech">
          ${p.technologies.map((t) => `<span class="tech-badge">${t}</span>`).join("")}
        </div>
        <div class="project-card__links">
          ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener">GitHub</a>` : ""}
          ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">Live Demo</a>` : ""}
        </div>
      </article>`
    )
    .join("");
  document.getElementById("projectsGrid").innerHTML = html;
}

/* ---------------- SKILLS ---------------- */
function renderSkills() {
  const cols = [
    { key: "programming", label: "PROGRAMMING" },
    { key: "web", label: "WEB" },
    { key: "tools", label: "TOOLS" },
    { key: "exploring", label: "EXPLORING" },
  ];
  const html = cols
    .map(
      (col, i) => `
      <div class="skill-col reveal" data-reveal="fade-up" data-delay="${i}">
        <p class="skill-col__title mono">${col.label}</p>
        <div>
          ${portfolioData.skills[col.key]
            .map((s) => `<span class="skill-tag">${s}</span>`)
            .join("")}
        </div>
      </div>`
    )
    .join("");
  document.getElementById("skillsGrid").innerHTML = html;
}

/* ---------------- DIRECTION ---------------- */
function renderDirection() {
  const html = portfolioData.direction
    .map(
      (step, i) => `
      <div class="reveal" data-reveal="fade-up" data-delay="${Math.min(i, 4)}">
        <span class="direction-step" data-index="${i}">${step}</span>
        ${i < portfolioData.direction.length - 1 ? '<div class="direction-arrow">↓</div>' : ""}
      </div>`
    )
    .join("");
  document.getElementById("directionPath").innerHTML = html;
  document.getElementById("directionStatement").textContent = portfolioData.directionStatement;
}

/* ---------------- CONTACT ---------------- */
function renderContact() {
  const { github, linkedin, email } = portfolioData.social;
  document.getElementById("contactLinks").innerHTML = `
    <a class="contact-link" href="${github}" target="_blank" rel="noopener">GitHub <span class="contact-link__arrow mono">↗</span></a>
    <a class="contact-link" href="${linkedin}" target="_blank" rel="noopener">LinkedIn <span class="contact-link__arrow mono">↗</span></a>
    <a class="contact-link" href="${email}">Email <span class="contact-link__arrow mono">↗</span></a>
  `;
}

function setupContactForm() {
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // This form does not send email yet — connect it to a service
    // like Formspree, EmailJS, or your own backend to make it live.
    note.textContent = "This form isn't connected to an email service yet — reach me directly for now.";
  });
}

/* ---------------- FOOTER ---------------- */
function renderFooter() {
  document.getElementById("footerName").textContent = portfolioData.name;
  document.getElementById("footerRole").textContent = portfolioData.role.replace(/&/g, "&");
  const { github, linkedin, email } = portfolioData.social;
  document.getElementById("footerLinks").innerHTML = `
    <a href="${github}" target="_blank" rel="noopener">GitHub</a>
    <a href="${linkedin}" target="_blank" rel="noopener">LinkedIn</a>
    <a href="${email}">Email</a>
  `;
  document.getElementById("footerCopy").textContent = `© ${new Date().getFullYear()} ${portfolioData.name}. Built while learning.`;
}

/* ---------------- MOBILE MENU ---------------- */
function setupMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const mobile = document.getElementById("navMobile");
  toggle.addEventListener("click", () => {
    const isOpen = mobile.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
  mobile.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      mobile.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ---------------- ACTIVE LINK + STICKY NAV ---------------- */
function setupSmoothScrollAndActiveLink() {
  const nav = document.getElementById("siteNav");
  const sections = [...document.querySelectorAll("main section[id]")];
  const navAnchors = [...document.querySelectorAll(".nav__links a, .nav__mobile a")];

  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 40);
    },
    { passive: true }
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navAnchors.forEach((a) => {
            a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  sections.forEach((s) => observer.observe(s));
}
