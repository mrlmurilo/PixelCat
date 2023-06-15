var stock = 10;
var stockElement = document.querySelector('.product-stock');
var quantidade = document.getElementById('quantity-input');
var keyValues = [
  'ABC12-DEFG3-HIJK4',
  'LMNO5-PQRS6-TUVW7',
  'XYZ89-12345-67890',
  'MNPQ1-RSTU2-VWXY3',
  'FGHI4-JKLM5-NOPQ6',
  'UVWX7-YZ12A-345B6',
  'CDEF7-GHIJ8-KLMN9',
  'OPQR1-STUV2-WXYZ3',
  '12345-67890-ABCDE',
  'FGHIJ-KLMNO-PQRST',
  'UVWXY-Z1234-56789',
  'ABCDE-FGHIJ-KLMNO'
];
var currentIndex = 0;

function changeImage(imagePath) {
  var mainImage = document.getElementById('main-image');
  mainImage.style.opacity = '0'; // Define a opacidade como 0
  setTimeout(function () {
    mainImage.src = imagePath; // Atualiza a URL da imagem
    mainImage.style.opacity = '1'; // Define a opacidade como 1 após um pequeno atraso
  }, 100); // Atraso de 300ms (mesmo tempo da animação definida no CSS)
}

function decreaseQuantity() {
  var quantityInput = document.getElementById('quantity-input');
  var currentQuantity = parseInt(quantityInput.value);
  if (currentQuantity > 1) {
    quantityInput.value = currentQuantity - 1;
  }
}

function increaseQuantity() {
  var quantityInput = document.getElementById('quantity-input');
  var currentQuantity = parseInt(quantityInput.value);
  if (currentQuantity < stock) {
    quantityInput.value = currentQuantity + 1;
  }
}

function buy() {
  var quantityInput = document.getElementById('quantity-input');
  var quantity = parseInt(quantityInput.value);
  // Lógica para realizar a compra do produto
  if (stock > 0) {
    stock -= quantityInput.value;
    stockElement.textContent = 'Estoque: ' + stock + ' unidades';
    var selectedKeys = [];

    for (var i = 0; i < quantity && i < keyValues.length; i++) {
      if (currentIndex >= keyValues.length) {
        currentIndex = 1;
      }

      var key = keyValues[currentIndex];
      selectedKeys.push(key);
      currentIndex++;

      if (currentIndex >= keyValues.length) {
        currentIndex = 0;
      }
    }

    for (var j = 0; j < selectedKeys.length; j++) {
      alert('Key Steam: ' + selectedKeys[j]);
      var indexToRemove = keyValues.indexOf(selectedKeys[j]);
      keyValues.splice(indexToRemove, 1);
    }

    quantityInput.value = 1;
  } else {
    alert('Produto sem estoque');
  }
}

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






