
document.addEventListener("DOMContentLoaded", () => {
  // Load the shared header and footer.
  async function loadComponent(elementId, file) {
    const element = document.getElementById(elementId);

    if (!element) return;

    try {
      const response = await fetch(file);

      if (!response.ok) {
        throw new Error(`Failed to load ${file}`);
      }

      element.innerHTML = await response.text();
    } catch (error) {
      console.error(error);
    }
  }

  // Load both shared components.
  Promise.all([
    loadComponent("site-header", "header.html"),
    loadComponent("site-footer", "footer.html")
  ]).then(() => {
    initializeNavigation();
    initializeCopyright();
  });

  // Mobile navigation.
  function initializeNavigation() {
    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");

    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  // Current year in the footer.
  function initializeCopyright() {
    const year = document.getElementById("copyright-year");

    if (year) {
      year.textContent = new Date().getFullYear();
    }
  }

  // Reveal the remaining priority cards.
  const moreButton = document.getElementById("more-button");
  const morePriorities = document.getElementById("more-priorities");

  if (moreButton && morePriorities) {
    moreButton.addEventListener("click", () => {
      const isExpanded = moreButton.getAttribute("aria-expanded") === "true";

      moreButton.setAttribute("aria-expanded", String(!isExpanded));
      morePriorities.classList.toggle("is-visible", !isExpanded);

      moreButton.querySelector("span:first-child").textContent =
        isExpanded ? "More priorities" : "Show fewer priorities";

      moreButton.querySelector(".arrow").textContent =
        isExpanded ? "↓" : "↑";
    });
  }
});
