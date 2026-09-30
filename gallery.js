document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const slides = Array.from(gallery.querySelectorAll(".work-slide"));
  const dots = Array.from(gallery.querySelectorAll(".work-gallery-dot"));

  if (!slides.length || slides.length !== dots.length) {
    return;
  }

  const showSlide = (requestedIndex, moveFocus = false) => {
    const index = (requestedIndex + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === index;
      slide.hidden = !isActive;
      slide.classList.toggle("is-active", isActive);
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === index;
      dot.classList.toggle("is-active", isActive);
      dot.tabIndex = isActive ? 0 : -1;

      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });

    if (moveFocus) {
      dots[index].focus();
    }
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));

    dot.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
        return;
      }

      event.preventDefault();

      if (event.key === "Home") {
        showSlide(0, true);
      } else if (event.key === "End") {
        showSlide(slides.length - 1, true);
      } else {
        showSlide(index + (event.key === "ArrowRight" ? 1 : -1), true);
      }
    });
  });

  showSlide(0);
});
