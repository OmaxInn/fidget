const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

document.getElementById("year").textContent = new Date().getFullYear();

const menuBtn = $("#menuBtn");
const navLinks = $("#navLinks");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
$$("nav a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

const lightbox = $("#lightbox");
const lightboxImg = $("#lightboxImg");
const lightboxCaption = $("#lightboxCaption");
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}
$$(".photo").forEach(photo => {
  photo.addEventListener("click", () => {
    lightboxImg.src = photo.dataset.image;
    lightboxImg.alt = photo.querySelector("img").alt;
    lightboxCaption.textContent = photo.dataset.caption || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});
$("#lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

$$(".faq-q").forEach(q => {
  q.addEventListener("click", () => {
    const answer = q.nextElementSibling;
    const open = q.getAttribute("aria-expanded") === "true";
    q.setAttribute("aria-expanded", String(!open));
    answer.classList.toggle("open", !open);
  });
});

const product = $("#interactiveProduct");
product.addEventListener("pointermove", e => {
  const r = product.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5;
  const y = (e.clientY - r.top) / r.height - .5;
  product.style.transform = `perspective(800px) rotateY(${x*10}deg) rotateX(${-y*10}deg) scale(1.015)`;
});
product.addEventListener("pointerleave", () => product.style.transform = "");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
$$(".reveal").forEach(el => observer.observe(el));

/* If a local video file is missing, keep the designed placeholder visible. */
$$("video").forEach(video => {
  const placeholder = video.parentElement.querySelector(".video-placeholder");
  video.addEventListener("loadeddata", () => { placeholder.style.display = "none"; });
  video.addEventListener("error", () => { placeholder.style.display = "flex"; });
});
