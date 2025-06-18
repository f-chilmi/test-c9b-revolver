// Add to the top of script.js
const REPEATED_TEXTS = {
  houseBlend: "House Blend - 250gr",
  price: "IDR 130,000",
  imageUrl:
    "https://revolverbali.com/cdn/shop/files/Coffee_Beans_House_Blend_250gr_600x600_crop_center.jpg?v=1744957881",
  altText: "House Blend Coffee 250gr",
};

// Update productsData to use constants
const productsData = Array(12)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    name: REPEATED_TEXTS.houseBlend,
    price: REPEATED_TEXTS.price,
    image: REPEATED_TEXTS.imageUrl,
    alt: REPEATED_TEXTS.altText,
  }));

const slidingBannerTexts = {
  banner1: "Shop Revolver Goods Now!",
  banner2: "Join Our Community – Exclusive Perks & Updates",
};

const venuesData = [
  "Revolver Seminyak",
  "Revolver Canggu",
  "Baby Revs",
  "Revolver Domestic",
  "Revolver International",
];

const pressLogosData = [
  {
    src: "https://revolverbali.com/cdn/shop/files/4720d8fda817e32b2db6480fbcc1e0358063d15e_360x.png?v=1747629967",
    alt: "Rolling Stone",
  },
  {
    src: "https://revolverbali.com/cdn/shop/files/5b93d6fcaabac6e6f8654249f76e7d67200e0a96_360x.png?v=1747629967",
    alt: "Food & Beverage Magazine",
  },
  {
    src: "https://revolverbali.com/cdn/shop/files/b276cb2dd6e8575c295df37ff9cfc3e4a2d69c13_360x.png?v=1747629967",
    alt: "TIME Magazine",
  },
  {
    src: "https://revolverbali.com/cdn/shop/files/27a60b1867872f91c4e0b412e5352bb8d79c0b03_360x.png?v=1747629967",
    alt: "Hypebeast",
  },
];

const footerData = [
  {
    title: "Shop",
    links: ["Shop all", "New Arrivals", "On Sale", "Brands"],
  },
  {
    title: "Information",
    links: ["Blog", "About us", "FAQ", "Contact"],
  },
  {
    title: "Find Us",
    links: ["Facebook", "Instagram", "TikTok", "YouTube"],
  },
];

// Render Functions
function renderProducts() {
  const track = document.getElementById("productsTrack");
  const productsHTML = productsData
    .map(
      (product) => `
      <article class="products__item">
        <div class="products__image-container">
          <img src="${product.image}" alt="${product.alt}" class="products__image" loading="lazy">
        </div>
        <div class="products__divider"></div>
        <div class="products__info">
          <h3 class="products__name">${product.name}</h3>
          <p class="products__price">${product.price}</p>
        </div>
        <button class="products__button">VIEW</button>
      </article>
    `
    )
    .join("");
  track.innerHTML = productsHTML;
}

function renderSlidingBanners() {
  const banner1 = document.getElementById("slidingBanner1");
  const banner2 = document.getElementById("slidingBanner2");

  const createBannerContent = (text) => {
    return Array(16).fill(`<span>${text}</span>`).join("");
  };

  banner1.innerHTML = createBannerContent(slidingBannerTexts.banner1);
  banner2.innerHTML = createBannerContent(slidingBannerTexts.banner2);
}

function renderVenues() {
  const venuesList = document.getElementById("venuesList");
  const venuesHTML = venuesData
    .map((venue) => `<li class="venues__item">${venue}</li>`)
    .join("");
  venuesList.innerHTML = venuesHTML;
}

function renderPressLogos() {
  const pressContainer = document.getElementById("pressLogos");
  const logosHTML = pressLogosData
    .map(
      (logo) =>
        `<img src="${logo.src}" alt="${logo.alt}" class="press__logo" loading="lazy" />`
    )
    .join("");
  pressContainer.innerHTML = logosHTML;
}

function renderFooter() {
  const footerGrid = document.getElementById("footerGrid");
  const sectionsHTML = footerData
    .map(
      (section) => `
      <div class="footer__section">
        <h3>${section.title}</h3>
        <ul class="footer__links">
          ${section.links
            .map((link) => `<li><a href="#">${link}</a></li>`)
            .join("")}
        </ul>
      </div>
    `
    )
    .join("");
  footerGrid.innerHTML = sectionsHTML;
}

// Carousel Class
class ProductCarousel {
  constructor() {
    this.track = document.getElementById("productsTrack");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.dots = document.getElementById("productsDots");
    this.items = this.track.querySelectorAll(".products__item");
    this.currentIndex = 0;
    this.itemsToShow = 4.5;
    this.itemWidth = 100 / this.itemsToShow;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateCarousel();
    this.updateDots();
  }

  setupEventListeners() {
    this.prevBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());

    // Touch support
    let startX = 0,
      currentX = 0,
      isDragging = false;

    this.track.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      },
      { passive: true }
    );

    this.track.addEventListener(
      "touchmove",
      (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
      },
      { passive: true }
    );

    this.track.addEventListener(
      "touchend",
      () => {
        if (!isDragging) return;
        const diff = startX - currentX;
        if (Math.abs(diff) > 50) {
          diff > 0 ? this.next() : this.prev();
        }
        isDragging = false;
      },
      { passive: true }
    );

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.target.closest(".products__carousel")) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          this.prev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          this.next();
        }
      }
    });
  }

  next() {
    const maxIndex = this.items.length - Math.floor(this.itemsToShow);
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
      this.updateCarousel();
      this.updateDots();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
      this.updateDots();
    }
  }

  updateCarousel() {
    const translateX = -(this.currentIndex * this.itemWidth);
    this.track.style.transform = `translateX(${translateX}%)`;

    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled =
      this.currentIndex >= this.items.length - Math.floor(this.itemsToShow);
    this.track.setAttribute("aria-live", "polite");
  }

  updateDots() {
    const dots = this.dots.querySelectorAll(".products__dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle(
        "products__dot--active",
        index === Math.floor(this.currentIndex / 2)
      );
    });
  }
}

// Lazy Loading Class
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[loading="lazy"]');
    this.imageObserver = null;
    this.init();
  }

  init() {
    if ("IntersectionObserver" in window) {
      this.imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              this.loadImage(img);
              this.imageObserver.unobserve(img);
            }
          });
        },
        {
          rootMargin: "50px 0px",
          threshold: 0.01,
        }
      );

      this.images.forEach((img) => this.imageObserver.observe(img));
    } else {
      this.images.forEach((img) => this.loadImage(img));
    }
  }

  loadImage(img) {
    const parent = img.closest(".lazy-loading");
    if (parent) {
      parent.classList.remove("lazy-loading");
    }
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    }
  }
}

// Newsletter Class
class Newsletter {
  constructor() {
    this.form = document.querySelector(".newsletter__form");
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.form.querySelector('input[type="email"]').value;

    if (this.validateEmail(email)) {
      this.showSuccess();
    } else {
      this.showError("Please enter a valid email address");
    }
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  showSuccess() {
    const button = this.form.querySelector("button");
    const originalText = button.textContent;
    button.textContent = "Subscribed!";
    button.style.background = "#28a745";

    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = "";
      this.form.querySelector("input").value = "";
    }, 2000);
  }

  showError(message) {
    const input = this.form.querySelector("input");
    input.style.borderColor = "#dc3545";
    setTimeout(() => {
      input.style.borderColor = "";
    }, 3000);
  }
}

// Smooth Scroll Class
class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.init();
  }

  init() {
    this.links.forEach((link) => {
      link.addEventListener("click", this.handleClick.bind(this));
    });
  }

  handleClick(e) {
    const href = e.currentTarget.getAttribute("href");
    if (href === "#") return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }
}

// Performance Monitor Class
class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    if ("performance" in window) {
      window.addEventListener("load", () => {
        this.measureLCP();
        this.measureFID();
        this.measureCLS();
      });
    }
  }

  measureLCP() {
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
      });
      observer.observe({ entryTypes: ["largest-contentful-paint"] });
    }
  }

  measureFID() {
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          // do something with entry
        });
      });
      observer.observe({ entryTypes: ["first-input"] });
    }
  }

  measureCLS() {
    if ("PerformanceObserver" in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
      });
      observer.observe({ entryTypes: ["layout-shift"] });
    }
  }
}

// Utility Functions
function trackEvent(eventName, parameters = {}) {
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, parameters);
  }
}

function initScrollTracking() {
  let scrollDepth = 0;
  window.addEventListener("scroll", () => {
    const currentScroll =
      ((window.scrollY + window.innerHeight) /
        document.documentElement.scrollHeight) *
      100;
    if (currentScroll > scrollDepth) {
      scrollDepth = Math.floor(currentScroll / 25) * 25;
      if (scrollDepth <= 100) {
        trackEvent("scroll_depth", { depth: scrollDepth });
      }
    }
  });
}

function preloadResources() {
  const preloadLinks = [
    // if there any preload link
  ];

  preloadLinks.forEach((link) => {
    const linkEl = document.createElement("link");
    linkEl.rel = "preload";
    Object.keys(link).forEach((key) => {
      linkEl[key] = link[key];
    });
    document.head.appendChild(linkEl);
  });
}

// Mobile Navigation Class
class MobileNav {
  constructor() {
    this.toggle = document.querySelector(".nav__toggle");
    this.links = document.querySelector(".nav__links");
    this.init();
  }

  init() {
    if (this.toggle && this.links) {
      this.toggle.addEventListener("click", this.toggleMenu.bind(this));

      // Close menu when clicking on links
      this.links.addEventListener("click", (e) => {
        if (e.target.classList.contains("nav__link")) {
          this.closeMenu();
        }
      });
    }
  }

  toggleMenu() {
    this.toggle.classList.toggle("nav__toggle--active");
    this.links.classList.toggle("nav__links--open");
  }

  closeMenu() {
    this.toggle.classList.remove("nav__toggle--active");
    this.links.classList.remove("nav__links--open");
  }
}

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
  // Render content
  renderProducts();
  renderSlidingBanners();
  renderVenues();
  renderPressLogos();
  renderFooter();

  // Initialize classes
  new ProductCarousel();
  new LazyLoader();
  new Newsletter();
  new SmoothScroll();
  new PerformanceMonitor();
  new MobileNav();

  // Initialize utilities
  initScrollTracking();
  preloadResources();

  // Add loading state
  document.body.classList.add("loaded");

  // Service worker registration
  if ("serviceWorker" in navigator) {
    // navigator.serviceWorker.register("/sw.js").catch((err) => {
    // });
  }
});

// Handle page visibility
document.addEventListener("visibilitychange", () => {
  const state = document.hidden ? "paused" : "running";
  document.documentElement.style.setProperty("--animation-play-state", state);
});

// Error handling for images
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName === "IMG") {
      e.target.style.display = "none";
    }
  },
  true
);
