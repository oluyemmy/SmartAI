document.addEventListener("DOMContentLoaded", function () {

const hero = document.getElementById("hero");

const images = [
  "assets/images/background4.jpg",
  "assets/images/background2.png",
  "assets/images/background3.jpg",
  "assets/images/background5.jpg"
];

let index = 0;

function changeBackground() {
  hero.style.backgroundImage = `url('${images[index]}')`;
  index = (index + 1) % images.length;
}

changeBackground();

setInterval(changeBackground, 5000);

});

// -------- INSTRUCTORS CAROUSEL --------
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("instructorTrack");
  if (!track) return;

  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  function getScrollAmount() {
    const firstCard = track.querySelector(".inst-card");
    if (!firstCard) return 300;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "18");
    return firstCard.getBoundingClientRect().width + gap;
  }

  function updateButtons() {
    if (!prevBtn || !nextBtn) return;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    prevBtn.disabled = track.scrollLeft <= 2;
    nextBtn.disabled = track.scrollLeft >= maxScrollLeft - 2;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });
  }

  track.addEventListener("scroll", updateButtons);
  window.addEventListener("resize", updateButtons);

  updateButtons();
});

// -------- TESTIMONIALS CAROUSEL --------
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("testiTrack");
  if (!track) return;

  const prevBtn = document.querySelector(".testi-btn.prev");
  const nextBtn = document.querySelector(".testi-btn.next");

  function getScrollAmount() {
    const firstCard = track.querySelector(".testi-card");
    if (!firstCard) return 360;
    const gap = parseFloat(getComputedStyle(track).gap || "18");
    return firstCard.getBoundingClientRect().width + gap;
  }

  function updateBtns(){
    if (!prevBtn || !nextBtn) return;
    const max = track.scrollWidth - track.clientWidth;
    prevBtn.disabled = track.scrollLeft <= 2;
    nextBtn.disabled = track.scrollLeft >= max - 2;
  }

  prevBtn && prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });

  nextBtn && nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });

  track.addEventListener("scroll", updateBtns);
  window.addEventListener("resize", updateBtns);
  updateBtns();
});

// -------- COMMUNITY REVEAL --------
document.addEventListener("DOMContentLoaded", () => {
  const community = document.querySelector(".community");
  if (!community) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        community.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  observer.observe(community);
});