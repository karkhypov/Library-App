export const debounce = (func, delay = 1000) => {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export const lazyImages = () => {
  const images = document.querySelectorAll('[data-src]');

  function loadImage(img) {
    const image = img;
    const src = image.getAttribute('data-src');
    image.src = src;
  }

  const imagesObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadImage(entry.target);
        imagesObserver.unobserve(entry.target);
      }
    });
  });
  images.forEach(image => imagesObserver.observe(image));
};
