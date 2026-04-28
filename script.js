document.addEventListener("DOMContentLoaded", function () {
  // Swiper Slider initialisieren
  initProjektloesungenSlider();
  initSocialProofSlider();
  initAboutUsSlider();
  initPartnerSlider();

  // DOM Manipulationen & Event Listener
  initTeamMemberNameFormatting();
  initPartnerLogoScaling();
  initEmailValidation();
  initQnaSlider();
});

// --- Slider Funktionen ---

function initProjektloesungenSlider() {
  const container = document.querySelector(".swiper.is-projektloesungen");
  if (!container) return;

  new Swiper(container, {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 16,
    speed: 750,
    preventClicks: false,
    preventClicksPropagation: false,
    breakpoints: {
      320: { slidesPerView: 1.25 },
      480: { slidesPerView: 2.5 },
      768: { slidesPerView: 3 },
    },
    navigation: {
      nextEl: ".swiper-btn-next",
      prevEl: ".swiper-btn-prev",
    },
  });
}

function initSocialProofSlider() {
  const container = document.querySelector(".swiper.is-social-proof");
  if (!container) return;

  new Swiper(container, {
    loop: true,
    slidesPerView: 1.5,
    spaceBetween: 16,
    speed: 750,
    breakpoints: {
      320: { slidesPerView: 1 },
      480: { slidesPerView: 1.5 },
      768: { slidesPerView: 1.5 },
    },
    navigation: {
      nextEl: ".swiper-btn-next.is-social-proof",
      prevEl: ".swiper-btn-prev.is-social-proof",
    },
  });
}

function initAboutUsSlider() {
  const container = document.querySelector(".swiper.is-aboutus");
  if (!container) return;

  new Swiper(container, {
    preloadImages: true,
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 3,
    },
    loop: true,
    slidesPerView: 2.5,
    spaceBetween: 16,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: 6000,
    breakpoints: {
      320: { slidesPerView: 1.5 },
      480: { slidesPerView: 2 },
      768: { slidesPerView: 2.5 },
    },
    navigation: {
      nextEl: ".swiper-btn-next.is-aboutus",
      prevEl: ".swiper-btn-prev.is-aboutus",
    },
  });
}

function initPartnerSlider() {
  const container = document.querySelector(".swiper.is-partner");
  if (!container) return;

  new Swiper(container, {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 96,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: 6000,
    navigation: {
      nextEl: ".swiper-btn-next.is-aboutus", // Hinweis: Prüfen ob Klasse korrekt ist oder is-partner sein sollte
      prevEl: ".swiper-btn-prev.is-aboutus",
    },
  });
}

// --- Logik Funktionen ---

function initTeamMemberNameFormatting() {
  const cmsItems = document.querySelectorAll(
    ".text-team-member-name[data-break-after]"
  );
  if (cmsItems.length === 0) return;

  cmsItems.forEach(function (item) {
    const text = item.innerText || item.textContent;
    const words = text.trim().split(" ");

    if (words.length > 1) {
      const firstWord = words.shift();
      const rest = words.join(" ");
      item.innerHTML = `${firstWord}<br>${rest}`;
    }
  });
}

function initPartnerLogoScaling() {
  const partnerElements = document.querySelectorAll(".partner");
  if (partnerElements.length === 0) return;

  partnerElements.forEach(function (partnerElement) {
    const scaleFactor = parseFloat(
      partnerElement.dataset.logoSkalierungsfaktor
    );
    const logoImage = partnerElement.querySelector(".swiper-logo-img");

    if (logoImage && !isNaN(scaleFactor)) {
      logoImage.style.transform = "scale(" + scaleFactor + ")";
    }
  });
}

function initEmailValidation() {
  const emailInput = document.getElementById("email");
  if (!emailInput) return;

  emailInput.addEventListener("blur", function () {
    const emailValue = emailInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(emailValue)) {
      emailInput.classList.remove("error");
      emailInput.classList.add("success");
    } else {
      emailInput.classList.remove("success");
      emailInput.classList.add("error");
    }
  });
}

function initQnaSlider() {
  const list = document.querySelector(".qna__content-list");
  const items = document.querySelectorAll(".qna__content-wrapper");
  const btnNext = document.querySelector(".js-qna-next");
  const btnPrev = document.querySelector(".js-qna-prev");
  const numberDisplay = document.querySelector(".qna__number");

  if (!list || items.length === 0 || !numberDisplay) {
    console.warn("QnA Slider: Not all elements found.");
    return;
  }

  let currentIndex = 0;
  const totalItems = items.length;
  let isAnimating = false;

  gsap.set(items, { clearProps: "transform, translate, rotate, scale" });

  const split = SplitText.create(items, {
    type: "words, lines",
    mask: "lines",
  });

  items.forEach((item, i) => {
    const lines = split.lines.filter((line) => item.contains(line));

    if (i === 0) {
      gsap.set(item, { position: "relative", autoAlpha: 1 });
      gsap.set(lines, { opacity: 1, y: 0 });
    } else {
      gsap.set(item, { position: "absolute", top: 0, left: 0, autoAlpha: 0 });
      gsap.set(lines, { opacity: 0, y: 20 });
    }
  });

  gsap.set(list, { height: items[0].scrollHeight });

  function goToIndex(newIndex) {
    if (isAnimating || newIndex === currentIndex) return;
    isAnimating = true;

    const oldIndex = currentIndex;
    currentIndex = newIndex;

    const oldItem = items[oldIndex];
    const newItem = items[newIndex];

    const oldLines = split.lines.filter((line) => oldItem.contains(line));
    const newLines = split.lines.filter((line) => newItem.contains(line));
    const newHeight = newItem.scrollHeight;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating = false;
        updateButtons();
      },
    });

    tl.to(oldLines, {
      y: -20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.in",
    });

    tl.set(oldItem, { position: "absolute", autoAlpha: 0 }, "-=0.1");

    tl.to(
      list,
      {
        height: newHeight,
        duration: 0.5,
        ease: "power2.inOut",
      },
      "-=0.1"
    );

    tl.set(newItem, { position: "relative", autoAlpha: 1 }, "-=0.3");

    tl.fromTo(
      newLines,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.02,
        ease: "power2.out",
      },
      "-=0.3"
    );

    numberDisplay.textContent = `${currentIndex + 1}/${totalItems}`;
  }

  function updateButtons() {
    if (btnPrev && btnNext) {
      gsap.to(btnPrev, {
        opacity: currentIndex === 0 ? 0.3 : 1,
        duration: 0.3,
      });
      btnPrev.style.pointerEvents = currentIndex === 0 ? "none" : "auto";

      gsap.to(btnNext, {
        opacity: currentIndex === totalItems - 1 ? 0.3 : 1,
        duration: 0.3,
      });
      btnNext.style.pointerEvents =
        currentIndex === totalItems - 1 ? "none" : "auto";
    }
  }

  if (btnNext) {
    btnNext.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentIndex < totalItems - 1) goToIndex(currentIndex + 1);
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentIndex > 0) goToIndex(currentIndex - 1);
    });
  }

  updateButtons();
  numberDisplay.textContent = `1/${totalItems}`;

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newHeight = items[currentIndex].scrollHeight;
      gsap.to(list, { height: newHeight, duration: 0.3 });
    }, 100);
  });
}
