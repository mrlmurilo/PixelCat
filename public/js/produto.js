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
  document.getElementById('main-image').src = imagePath;
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

const openCartButton = document.getElementById('openCartButton');
const closeCartButton = document.getElementById('closeCartButton');
const cartPopup = document.getElementById('cartPopup');
const cartItemsList = document.getElementById('cartItemsList');

openCartButton.addEventListener('click', function() {
  cartPopup.style.display = 'block';
});

closeCartButton.addEventListener('click', function() {
  cartPopup.style.display = 'none';
});

function addToCart() {
  const productName = document.querySelector('.product-title').textContent;
  const productPrice = document.querySelector('.product-price').textContent;
  const productQuantity = document.getElementById('quantity-input').value;

  const item = {
    name: productName,
    price: productPrice,
    quantity: productQuantity
  };

  const li = document.createElement('li');
  li.textContent = `${item.name} - ${item.price} x ${item.quantity}`;
  cartItemsList.appendChild(li);
}





