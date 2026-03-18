// --- Mobile Menu Toggle ---
const menu = document.getElementById("menu");
const nav = document.querySelector("header nav");
const navItems = document.querySelectorAll('.navitems');

menu.addEventListener("click", (e) => {
  e.preventDefault();
  nav.classList.toggle("open");
});

navItems.forEach(item => {
  item.addEventListener('click', () => {
    nav.classList.remove("open");
  });
});

// --- Dynamic Header on Scroll ---
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.background = 'rgba(15, 23, 42, 0.95)'; 
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
  } else {
    header.style.background = 'transparent';
    header.style.boxShadow = 'none';
  }
});

// --- Scroll Animations (Fade In) ---
const sections = document.querySelectorAll('.fade-in');

const mainObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Fade-in sections
      if (entry.target.classList.contains('fade-in')) {
        const items = entry.target.querySelectorAll('.fade-item');
        if (items.length > 0) {
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add('show'), i * 50); // stagger effect
          });
        } else {
          entry.target.classList.add('show');
        }
      }

      // Unobserve once animated
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1, 
  rootMargin: "0px 0px -50px 0px" 
});

sections.forEach(section => mainObserver.observe(section));

// --- Contact Form Submission ---
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { "Accept": "application/json" },
      });

      if (response.ok) {
        form.reset();
        showToast("Message sent successfully!", "success");
      } else {
        showToast("Something went wrong. Please try again.", "error");
      }
    } catch (error) {
      showToast("Network error. Please try again.", "error");
    }
  });
}

// --- Toast Notification System ---
function showToast(message, type) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = `toast ${type === "error" ? "error" : ""}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100); 

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300); 
  }, 5000);
}

// --- Download CV ---
const downloadBtn = document.getElementById("downloadBtn");
if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href ="./assets/Emafido_Emmanuel_CV.pdf"; 
    link.download = "Emafido_Emmanuel_Resume.pdf";
    link.click();
  });
}
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});
// --- Typewriter Effect Logic ---
const phrases = ["Full Stack Engineer", "Web3 Developer", "Frontend Enthusiast", "Backend Specialist", "Tech Innovator"];
let phraseIndex = 0;
let letterIndex = 0;
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetweenPhrases = 2000;
const typewriterElement = document.getElementById("typewriter");

function type() {
  if (letterIndex < phrases[phraseIndex].length) {
    typewriterElement.textContent += phrases[phraseIndex].charAt(letterIndex);
    letterIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, delayBetweenPhrases);
  }
}

function erase() {
  if (letterIndex > 0) {
    typewriterElement.textContent = phrases[phraseIndex].substring(0, letterIndex - 1);
    letterIndex--;
    setTimeout(erase, erasingSpeed);
  } else {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(type, typingSpeed);
  }
}

// Start typing effect on load
if (typewriterElement) {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000);
  });
}