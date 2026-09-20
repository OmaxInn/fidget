// ===============================
// HELPERS
// ===============================

const $ = (selector, root = document) => root.querySelector(selector);

const $$ = (selector, root = document) => [
  ...root.querySelectorAll(selector)
];


// ===============================
// FOOTER YEAR
// ===============================

const year = $("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}


// ===============================
// MOBILE NAVIGATION
// ===============================

const menuBtn = $("#menuBtn");
const navLinks = $("#navLinks");

if (menuBtn && navLinks) {

  menuBtn.addEventListener("click", () => {

    const open = navLinks.classList.toggle("open");

    menuBtn.setAttribute(
      "aria-expanded",
      String(open)
    );

  });


  // Close menu after clicking a navigation link

  $$("a", navLinks).forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

}


// ===============================
// LIGHTBOX
// ===============================

const lightbox = $("#lightbox");
const lightboxCaption = $("#lightboxCaption");
const lightboxClose = $("#lightboxClose");
const lightboxArt = $(".lightbox-art");


function openLightbox(image, caption) {

  if (!lightbox) return;

  // Set caption

  if (lightboxCaption) {
    lightboxCaption.textContent = caption || "";
  }


  // Load the actual clicked image

  if (lightboxArt && image) {

    lightboxArt.style.backgroundImage =
      `url("${image}")`;

    lightboxArt.style.backgroundSize = "cover";
    lightboxArt.style.backgroundPosition = "center";

  }


  lightbox.classList.add("open");

  lightbox.setAttribute(
    "aria-hidden",
    "false"
  );

  // Prevent page scrolling behind lightbox

  document.body.style.overflow = "hidden";

}


function closeLightbox() {

  if (!lightbox) return;

  lightbox.classList.remove("open");

  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";

}


// Gallery buttons

$$(".photo").forEach(photo => {

  photo.addEventListener("click", () => {

    const image =
      photo.dataset.image ||
      photo.querySelector("img")?.src ||
      "";

    const caption =
      photo.dataset.caption ||
      photo.querySelector(".photo-label")?.textContent.trim() ||
      "";

    openLightbox(image, caption);

  });

});


// Close button

if (lightboxClose) {
  lightboxClose.addEventListener(
    "click",
    closeLightbox
  );
}


// Close when clicking outside image

if (lightbox) {

  lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  });

}


// Escape key

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeLightbox();
  }

});


// ===============================
// FAQ ACCORDION
// ===============================

$$(".faq-q").forEach(question => {

  question.addEventListener("click", () => {

    const answer =
      question.nextElementSibling;

    if (!answer) return;

    const isOpen =
      question.getAttribute("aria-expanded") === "true";


    question.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );


    answer.classList.toggle(
      "open",
      !isOpen
    );

  });

});


// ===============================
// INTERACTIVE PRODUCT
// ===============================

const product = $("#interactiveProduct");

if (product) {

  product.addEventListener(
    "pointermove",
    event => {

      const rect =
        product.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width -
        0.5;

      const y =
        (event.clientY - rect.top) /
        rect.height -
        0.5;


      const rotateY = x * 10;
      const rotateX = -y * 10;


      product.style.transform =
        `perspective(800px)
         rotateY(${rotateY}deg)
         rotateX(${rotateX}deg)
         scale(1.015)`;

    }
  );


  product.addEventListener(
    "pointerleave",
    () => {

      product.style.transform = "";

    }
  );

}


// ===============================
// SCROLL REVEAL
// ===============================

const revealElements = $$(".reveal");

if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(element => {
    observer.observe(element);
  });

} else {

  // Fallback for older browsers

  revealElements.forEach(element => {
    element.classList.add("visible");
  });

}


// ===============================
// VIDEO PLACEHOLDERS
// ===============================

$$("video").forEach(video => {

  const placeholder =
    video.parentElement?.querySelector(
      ".video-placeholder"
    );

  if (!placeholder) return;


  // Hide placeholder when video successfully loads

  video.addEventListener(
    "loadeddata",
    () => {

      placeholder.style.display = "none";

    }
  );


  // Keep placeholder visible if video is missing

  video.addEventListener(
    "error",
    () => {

      placeholder.style.display = "flex";

    }
  );


  // If browser already knows video is loaded

  if (video.readyState >= 2) {

    placeholder.style.display = "none";

  }

});

