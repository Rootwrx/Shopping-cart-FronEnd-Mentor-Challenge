// class LazyLoader {
//   constructor({ selector = ".lazy-load", options, loadCallback = null } = {}) {
//     this.selector = selector;
//     this.loadCallback = loadCallback;
//     this.images = document.querySelectorAll(this.selector);
//     this.observer = null;
//     this.options = options || {
//       root: null,
//       rootMargin: "0px",
//       threshold: 0.01,
//     };

//     this.init();
//   }

//   init() {
//     if ("IntersectionObserver" in window) {
//       this.observer = new IntersectionObserver(
//         this.onIntersection.bind(this),
//         this.options
//       );

//       this.images.forEach((image) => {
//         if (!image.classList.contains("loaded")) this.observer.observe(image);
//       });
//     } else this.loadImagesFallback();
//   }

//   onIntersection(entries, observer) {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         this.loadImage(entry.target);
//         observer.unobserve(entry.target);
//       }
//     });
//   }

//   loadImage(image) {
//     const src = image.dataset.src;
//     const srcset = image.dataset.srcset;

//     if (src) image.src = src;
//     if (srcset) image.srcset = srcset;

//     image.onload = () => {
//       console.log("loaded");
//       image.classList.add("loaded");
//       image.classList.remove(this.selector.replace(".", ""));
//       if (typeof this.loadCallback === "function") this.loadCallback(image);
//     };
//   }

//   loadImagesFallback() {
//     this.images.forEach((image) => this.loadImage(image));
//   }

//   refresh() {
//     this.images = document.querySelectorAll(this.selector);
//     this.images.forEach((image) => {
//       if (!image.classList.contains("loaded")) {
//         this.observer.observe(image);
//       }
//     });
//   }
// }

// export default LazyLoader;

class LazyLoader {
  constructor(options = {}) {
    this.options = {
      rootMargin: "100px",
      threshold: 0.1,
      loadingClass: "loading",
      loadedClass: "loaded",
      errorClass: "error",
      ...options,
    };

    this.observer = null;
    this.elements = new Map();
    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        rootMargin: this.options.rootMargin,
        threshold: this.options.threshold,
      }
    );
  }

  observe(elements) {
    if (!Array.isArray(elements)) {
      elements = Array.from(elements);
    }

    elements.forEach((element) => {
      if (!this.elements.has(element)) {
        this.elements.set(element, {
          src: element.dataset.src,
          srcset: element.dataset.srcset,
          loaded: false,
        });
        this.observer.observe(element);
      }
    });
  }

  unobserve(element) {
    if (this.elements.has(element)) {
      this.observer.unobserve(element);
      this.elements.delete(element);
    }
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) this.loadElement(entry.target);
    });
  }

  async loadElement(element) {
    const elementData = this.elements.get(element);
    if (!elementData || elementData.loaded) return;

    element.classList.add(this.options.loadingClass);

    try {
      if (element.tagName.toLowerCase() === "img")
        await this.loadImage(element, elementData);
      else await this.loadBackground(element, elementData);

      element.classList.remove(this.options.loadingClass);
      element.classList.add(this.options.loadedClass);
      elementData.loaded = true;
      this.unobserve(element);
    } catch (error) {
      console.error("Error loading element:", error);
      element.classList.remove(this.options.loadingClass);
      element.classList.add(this.options.errorClass);
    }
  }

  loadImage(img, data) {
    return new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      if (data.srcset) img.srcset = data.srcset;
      img.src = data.src;
    });
  }

  loadBackground(element, data) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        element.style.backgroundImage = `url(${data.src})`;
        resolve();
      };
      img.onerror = reject;
      img.src = data.src;
    });
  }

  refresh() {
    this.elements.forEach((data, element) => {
      if (!data.loaded) {
        this.observer.unobserve(element);
        this.observer.observe(element);
      }
    });
  }

  destroy() {
    this.observer.disconnect();
    this.elements.clear();
  }
}

export { LazyLoader };
/*
 in case of  letting image load without using actualy lazyload
 so show loader before the image is loaded 
@mixin lazy-loader(
  $loader-size: 50px,
  $loader-border: 5px,
  $loader-color: var(--clr-red),
  $loader-bg: var(--clr-rose-50)
) {
  &.loader {
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: $loader-size;
      width: $loader-size;
      margin: auto;
      border: $loader-border solid transparent;
      border-left-color: $loader-color;
      z-index: 10;
      border-radius: 50%;
      animation: loaderspin 1s linear infinite;
    }

    &::after {
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: $loader-bg;
      z-index: 5;
      top: 0;
      left: 0;
    }
    &:has(.loaded) {
      &::before,
      &::after {
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.5s ease-in, visibility 0.5s ease-in;
      }
    }
  }

  img.lazy-load {
    opacity: 0;
    transition: opacity 0.5s ease-in;

    &.loaded {
      opacity: 1;
    }
  }
}

@keyframes loaderspin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
*/
