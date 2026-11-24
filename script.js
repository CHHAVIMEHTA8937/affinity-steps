
/* ===================================
   AFFINITY STEPS - INTERACTIONS
=================================== */

document.addEventListener("DOMContentLoaded", () => {

  // 1. PAGE LOADER

  const loader = document.getElementById("loader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hide");
    }, 700);
  });

  // Fallback for cached or delayed page resources
  setTimeout(() => {
    loader.classList.add("hide");
  }, 2500);


  // 2. MOBILE NAVIGATION

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = navMenu.querySelectorAll("a");

  function closeMenu() {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");

    menuToggle.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      closeMenu();
    }
  });


  // 3. STICKY NAVBAR

  const navbar = document.getElementById("navbar");

  function updateNavbar() {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  }

  window.addEventListener("scroll", updateNavbar, {
    passive: true
  });

  updateNavbar();


  // 4. SCROLL REVEAL ANIMATION

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry, index) => {

          if (entry.isIntersecting) {

            const siblings = entry.target.parentElement
              ? Array.from(entry.target.parentElement.children)
                .filter(el => el.classList.contains("reveal"))
              : [];

            const delay = Math.min(
              Math.max(siblings.indexOf(entry.target), 0) * 90,
              360
            );

            setTimeout(() => {
              entry.target.classList.add("show");
            }, delay);

            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {
    revealElements.forEach(element => {
      element.classList.add("show");
    });
  }


  // 5. FAQ ACCORDION

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const symbol = question.querySelector("span");

    question.addEventListener("click", () => {

      const wasActive = item.classList.contains("active");

      faqItems.forEach(faq => {

        faq.classList.remove("active");

        const button = faq.querySelector(".faq-question");
        const icon = button.querySelector("span");

        button.setAttribute("aria-expanded", "false");
        icon.textContent = "+";

      });

      if (!wasActive) {
        item.classList.add("active");
        question.setAttribute("aria-expanded", "true");
        symbol.textContent = "−";
      }

    });

  });


  // 6. SMOOTH SCROLLING

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", event => {

      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    });

  });


  // 7. DYNAMIC FOOTER YEAR

  document.getElementById("year").textContent =
    new Date().getFullYear();


  // 8. SUBTLE HERO PARALLAX

  const heroImage = document.querySelector(".hero-visual img");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (heroImage && !reducedMotion) {

    let ticking = false;

    window.addEventListener("scroll", () => {

      if (!ticking) {

        window.requestAnimationFrame(() => {

          const hero = document.querySelector(".hero-visual");
          const rect = hero.getBoundingClientRect();

          if (rect.bottom > 0 && rect.top < window.innerHeight) {

            const movement = Math.max(
              -12,
              Math.min(12, (window.innerHeight - rect.top) * 0.015)
            );

            heroImage.style.transform =
              `scale(1.04) translateY(${movement}px)`;

          }

          ticking = false;

        });

        ticking = true;
      }

    }, { passive: true });

  }


  // 9. BUTTON / CARD MICRO INTERACTIONS

  const interactiveCards = document.querySelectorAll(
    ".bento-card, .impact-card"
  );

  interactiveCards.forEach(card => {

    card.addEventListener("mouseenter", () => {
      card.style.willChange = "transform";
    });

    card.addEventListener("mouseleave", () => {
      card.style.willChange = "auto";
    });

  });


  console.log("Affinity Steps website initialized successfully.");

});
