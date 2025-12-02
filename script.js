const projektloesungenSlider = new Swiper(".swiper.is-projektloesungen", {
  // Optional parameters
  loop: false,
  slidesPerView: 3,
  spaceBetween: 16,
  speed: 750,
  preventClicks: false,
  preventClicksPropagation: false,
  breakpoints: {
    320: {
      slidesPerView: 1.25,
    },
    480: {
      slidesPerView: 2.5,
    },
    768: {
      slidesPerView: 3,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-btn-next",
    prevEl: ".swiper-btn-prev",
  },
});

const socialproofSlider = new Swiper(".swiper.is-social-proof", {
  // Optional parameters
  loop: true,
  slidesPerView: 1.5,
  spaceBetween: 16,
  speed: 750,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 1.5,
    },
    768: {
      slidesPerView: 1.5,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-btn-next.is-social-proof",
    prevEl: ".swiper-btn-prev.is-social-proof",
  },
});

const aboutusSlider = new Swiper(".swiper.is-aboutus", {
  // Optional parameters
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
    320: {
      slidesPerView: 1.5,
    },
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2.5,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-btn-next.is-aboutus",
    prevEl: ".swiper-btn-prev.is-aboutus",
  },
});

document.addEventListener("DOMContentLoaded", function () {
  // Alle Elemente mit der Klasse 'text-team-member-name' und dem Custom Attribute 'data-break-after' auswählen
  var cmsItems = document.querySelectorAll(
    ".text-team-member-name[data-break-after]"
  );

  cmsItems.forEach(function (item) {
    // Textinhalt des Elements erhalten
    var text = item.innerText || item.textContent;
    // Text in Worte aufteilen
    var words = text.split(" ");

    if (words.length > 1) {
      // Ersten Wort und den Rest trennen
      var firstWord = words.shift();
      var rest = words.join(" ");

      // Neuen HTML-Inhalt mit Break nach dem ersten Wort erstellen
      item.innerHTML = firstWord + "<br>" + rest;
    }
  });
});

const partnerSlider = new Swiper(".swiper.is-partner", {
  // Optional parameters
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 96,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  speed: 6000,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-btn-next.is-aboutus",
    prevEl: ".swiper-btn-prev.is-aboutus",
  },
});

document.addEventListener("DOMContentLoaded", function () {
  // Wähle alle Partner-Elemente auf der Seite aus
  var partnerElements = document.querySelectorAll(".partner");

  // Iteriere über jedes Partner-Element
  partnerElements.forEach(function (partnerElement) {
    // Hole den Wert des CMS-Feldes 'Logo-Skalierungsfaktor' für dieses Partner-Element
    var scaleFactor = parseFloat(partnerElement.dataset.logoSkalierungsfaktor);
    // Selektiere das Logo-Bild-Element innerhalb des aktuellen Partner-Elements
    var logoImage = partnerElement.querySelector(".swiper-logo-img");
    // Wende die Skalierung auf das Logo-Bild-Element an, falls vorhanden
    if (logoImage) {
      logoImage.style.transform = "scale(" + scaleFactor + ")";
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.addEventListener('blur', validateEmail);
  }
});

function validateEmail() {
  const emailInput = document.getElementById("email");
  if (!emailInput) return;
  const emailValue = emailInput.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(emailValue)) {
    emailInput.classList.remove("error");
    emailInput.classList.add("success");
  } else {
    emailInput.classList.remove("success");
    emailInput.classList.add("error");
  }
}
