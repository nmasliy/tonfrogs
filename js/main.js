window.addEventListener("DOMContentLoaded", function () {
  function initMenu() {
    const $html = document.querySelector("html");
    const $header = document.querySelector(".header");
    const $headerMenu = document.querySelector(".header__menu");
    const $headerBtn = document.querySelector(".header__burger");
    const $headerCloseBtn = document.querySelector(".header__menu-close");
    const $headerOverlay = document.querySelector(".header__overlay");
    const TRANSITION_DELAY = 400;

    let isInit = false;

    const checkScreenWidth = () => {
      const MOBILE_MENU_BREAKPOINT = 1024;

      if (
        window.innerWidth > MOBILE_MENU_BREAKPOINT &&
        $header.classList.contains("active")
      ) {
        closeMenu();
      }
      // Активируем меню только на экранах <= 1024
      if (window.innerWidth <= MOBILE_MENU_BREAKPOINT && !isInit) {
        isInit = true;
        $headerBtn.addEventListener("click", openMenu);
        $headerCloseBtn.addEventListener("click", closeMenu);
        $headerOverlay.addEventListener("click", closeMenu);
        $headerMenu.addEventListener("click", function (e) {
          if (e.target.closest(".header__navigation ul > li > a")) {
            closeMenu();
          }
        });
      } else {
        window.addEventListener("resize", checkScreenWidth);
      }
    };

    checkScreenWidth();

    function openMenu() {
      $headerOverlay.style.display = "block";
      $headerMenu.style.display = "block";
      $html.classList.add("overflow-hidden");

      setTimeout(function () {
        $headerOverlay.classList.add("active");
        $header.classList.add("active");
      }, 50);
    }

    function closeMenu() {
      $headerOverlay.classList.remove("active");
      $header.classList.remove("active");
      $html.classList.remove("overflow-hidden");

      setTimeout(function () {
        $headerOverlay.style.display = "";
        $headerMenu.style.display = "";
      }, TRANSITION_DELAY);
    }
  }

  function initScrollToBlock() {
    const $anchors = document.querySelectorAll(".navigation a");

    $anchors.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        const selector = item.getAttribute("href");
        const section = document.querySelector(selector);
        window.scrollTo(0, section.getBoundingClientRect().top - 50);
      });
    });
  }

  function initCounter() {
    const box = document.querySelector(".about__text");
    const time = 500;
    const step = 55;
    let isInit = false;

    function isElementCompletelyInViewPort(element) {
      var elementData = element.getBoundingClientRect(),
        width = document.documentElement.clientWidth,
        height = document.documentElement.clientHeight;

      return (
        elementData.bottom <= height &&
        elementData.right <= width &&
        elementData.left >= 0 &&
        elementData.top >= 0
      );
    }

    document.addEventListener("scroll", function () {
      if (!isInit && isElementCompletelyInViewPort(box)) {
        outNum(5555, "#items-count");
        isInit = true;
      }
    });

    function outNum(num, elem) {
      let l = document.querySelector(elem);
      n = 0;
      let t = Math.round(time / (num / step));
      let interval = setInterval(() => {
        n = n + step;
        if (n == num) {
          clearInterval(interval);
        }
        l.textContent = new Intl.NumberFormat().format(n);
      }, t);
    }
  }

  initMenu();
  initScrollToBlock();
  initCounter();
  const da = new DynamicAdapt("max");
  da.init();
  AOS.init({
    duration:1000
  });
});
