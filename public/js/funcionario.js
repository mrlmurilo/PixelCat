var header = document.getElementById('top');
var lastScrollPosition = 0;

window.addEventListener('scroll', function () {
  var currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollPosition > lastScrollPosition) {
    // Scroll para baixo
    header.classList.add('small');
    document.body.classList.add('scroll-down');
  } else {
    // Scroll para cima
    header.classList.remove('small');
    document.body.classList.remove('scroll-down');
  }

  lastScrollPosition = currentScrollPosition;
});