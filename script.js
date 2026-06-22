const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

// Mobile menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger?.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("show");
  hamburger.setAttribute("aria-expanded", String(isOpen));
  mobileMenu.setAttribute("aria-hidden", String(!isOpen));
});

mobileMenu?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
  });
});

// Theme toggle
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

themeBtn?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// Contact form -> opens mail app
function openMail(e){
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  const fullSubject = encodeURIComponent(subject);
  const body = encodeURIComponent(`Hi Akash,\n\n${message}\n\nFrom,\n${name}`);
  window.location.href = `mailto:Akashanthony78@gmail.com?subject=${fullSubject}&body=${body}`;
  return false;
}
window.openMail = openMail;
// Scroll reveal (fade + slide)
function initScrollReveal(){
  // Pick elements to animate (you can add more selectors if needed)
  const targets = document.querySelectorAll(
    ".section-head, .title, .subtitle, .pill, .mini-card, .glass.card, .profile, .project"
  );

  // Add base class + small stagger delay
  targets.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(i * 60, 360)}ms`;
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target); // reveal once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -10% 0px"
  });

  targets.forEach(el => io.observe(el));
}

window.addEventListener("DOMContentLoaded", initScrollReveal);
