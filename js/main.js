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

  function initLazyLoadVideos() {
    var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

    if ("IntersectionObserver" in window) {
      var lazyVideoObserver = new IntersectionObserver(function (
        entries,
        observer
      ) {
        entries.forEach(function (video) {
          if (video.isIntersecting) {
            for (var source in video.target.children) {
              var videoSource = video.target.children[source];
              if (
                typeof videoSource.tagName === "string" &&
                videoSource.tagName === "SOURCE"
              ) {
                videoSource.src = videoSource.dataset.src;
              }
            }

            video.target.load();
            video.target.classList.remove("lazy");
            lazyVideoObserver.unobserve(video.target);
          }
        });
      });

      lazyVideos.forEach(function (lazyVideo) {
        lazyVideoObserver.observe(lazyVideo);
      });
    }
  }

  function initParallaxCircles() {
    const items = document.querySelectorAll(".circle-parallax");

    items.forEach((element) => {
      let pos = element.getBoundingClientRect().y;
      let count = 0;

      window.addEventListener("scroll", scroll);
      window.addEventListener("resize", scroll);
      scroll();

      function scroll(e) {
        var r = element.getBoundingClientRect();
        console.log("pos: " + pos + " now: " + r.y);
        let result = 0;

        if (r.y > 0 && r.y <= 800) {
          if (r.y < pos) {
            console.log("+идем вниз");
            count += 2;
          } else {
            console.log("+идем вверх");
            count--;
          }
        } else if (r.y < 0 && r.y >= -800) {
          if (r.y < pos) {
            console.log("-идем вниз");
            count--;
          } else {
            console.log("-идем вверх");
            count += 2;
          }
        } else {
          count = 0;
        }
        console.log("count: " + count);

        result = (count * 1.5) / 100;

        if (result > 1) result = 1;
        else if (result < 0) result = 0.2;

        element.style.setProperty("--scale", result);

        pos = r.y;
      }
    });
  }

  initMenu();
  initScrollToBlock();
  initCounter();
  initLazyLoadVideos();
  initParallaxCircles();
  const da = new DynamicAdapt("max");
  da.init();
  AOS.init({
    duration: 1000,
  });
});
