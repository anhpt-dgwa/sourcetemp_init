"use strict";
//*********************************
//*** common
//*********************************

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function applyScrollEffects() {
  function handleScroll() {
    const elements = document.querySelectorAll(".js-effect");

    elements.forEach(function (element) {
      if (isElementInViewport(element)) {
        element.classList.add("is-show");
      } else {
        element.classList.remove("is-show");
      }
    });
  }

  handleScroll();
  window.addEventListener("scroll", handleScroll);
}

function onLoad(callback) {
  const loadingElement = document.querySelector("#loading");
  let imagePromises = [];

  // if (loadingElement) {
  //   const images = document.querySelectorAll("img");
  //   for (let i = 0; i < images.length; i++) {
  //     let promise = new Promise(function (resolve, reject) {
  //       const image = images[i];
  //       if (image.complete) {
  //         resolve();
  //       } else {
  //         image.addEventListener("load", resolve);
  //         image.addEventListener("error", reject);
  //       }
  //     });
  //     imagePromises.push(promise);
  //   }
  // }

  function onImageLoad(image) {
    return new Promise(function (resolve, reject) {
      if (image.complete) {
        resolve();
      } else {
        image.addEventListener("load", resolve);
        image.addEventListener("error", reject);
      }
    });
  }

  if (loadingElement) {
    const images = document.querySelectorAll("img");
    images.forEach(function (image) {
      imagePromises.push(onImageLoad(image));
    });
  }

  function onAllImagesLoaded() {
    if (loadingElement) {
      loadingElement.classList.add("loaded");
    }
    Promise.all(imagePromises).then(callback);
  }

  if (document.readyState === "complete") {
    onAllImagesLoaded();
  } else {
    window.addEventListener("load", onAllImagesLoaded);
  }
}

function hideLoadingScreen(selector) {
  const element = document.querySelector(selector);
  element.classList.add("loadHidden");
  setTimeout(function () {
    applyScrollEffects();
    document.body.classList.remove("is-fixed");
  }, 300);
}

if (document.getElementById("loading")) {
  document.body.classList.add("is-fixed");
  onLoad(function () {
    hideLoadingScreen("#loading");
  });
} else {
  setTimeout(function () {
    applyScrollEffects();
  }, 300);
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function demoClick() {
  const footer = document.querySelector(".footer");

  footer.addEventListener("click", function (e) {
    console.log(e.target);
  });
}

function setFillHeightVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

let isPC = false;

function checkViewport() {
  function resize() {
    if (window.innerWidth > 767) {
      console.log("PC screen");
      isPC = true;
    } else {
      console.log("SP screen");
      isPC = false;
    }
  }
  resize();
}

function doSomethingBasedOnScreenType() {
  const box = document.querySelector(".box-demo2");
  if (isPC) {
    box.classList.add("is-pc");
    if (box.classList.contains("is-sp")) {
      box.classList.remove("is-sp");
    }
    console.log("This is a PC screen. Do something for PC.");
  } else {
    box.classList.add("is-sp");
    if (box.classList.contains("is-pc")) {
      box.classList.remove("is-pc");
    }
    console.log("This is a SP screen. Do something for SP.");
  }
}

//*********************************
//*** init
//*********************************
window.addEventListener("DOMContentLoaded", function () {
  // demoClick();
  checkViewport();
  doSomethingBasedOnScreenType();
});
window.addEventListener("load", function () {
  setFillHeightVh();
  if (location.pathname.includes("/about")) {
  }
});
window.addEventListener("resize", function () {
  setFillHeightVh();
  checkViewport();
  doSomethingBasedOnScreenType();
});
