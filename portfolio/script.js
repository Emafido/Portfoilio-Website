const observerOptions = {
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const progressBars = entry.target.querySelectorAll(".skill-progress");
    progressBars.forEach((bar) => {
      const progress = bar.getAttribute("data-progress");
      bar.style.width = progress + "%";
    });
  });
}, observerOptions);

const skillsSection = document.getElementById("skills");
if(skillsSection){
  observer.observe(skillsSection)
}
const menu = document.getElementById("menu");
const nav = document.querySelector("header nav");

menu.addEventListener("click", (e) => {
  e.preventDefault();
  nav.classList.toggle("open")
})

document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);

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
});

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
const sections = document.querySelectorAll('.fade-in, .skills-section');

const mainObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      // Fade-in sections
      if (entry.target.classList.contains('fade-in')) {
        const items = entry.target.querySelectorAll('.fade-item');
        if (items.length > 0) {
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add('show'), i * 50); // faster stagger
          });
        } else {
          entry.target.classList.add('show');
        }
      }

      // Skill bars
      if (entry.target.classList.contains('skills-section')) {
        const progressBars = entry.target.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
          const progress = bar.getAttribute('data-progress');
          bar.style.width = progress + '%';
        });
      }

      // Unobserve once animated
      mainObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0, // trigger as soon as any part of element enters viewport
  rootMargin: "0px 0px 0px 0px" // remove offsets, trigger immediately
});

sections.forEach(section => mainObserver.observe(section));

document.getElementById("downloadBtn").addEventListener("click", () => {
  const link = document.createElement("a");
  link.href ="./assets/My tech resume.pdf"; 
  link.download = "Emafido_Emmanuel_Resume.pdf";
  link.click();
});
const navItems = document.querySelectorAll('.navitems');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    nav.classList.remove("open");
  });
});

