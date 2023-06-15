// Dados de exemplo
const products = [
    { name: 'Produto 1', quantity: 2, price: 10 },
    { name: 'Produto 2', quantity: 1, price: 20 },
    { name: 'Produto 3', quantity: 3, price: 15 }
  ];
  
  // Função para renderizar os produtos no carrinho
  function renderProducts() {
    const productUl = document.getElementById('product-list');
    productUl.innerHTML = '';
  
    let total = 0;
  
    products.forEach((product) => {
      const li = document.createElement('li');
      li.textContent = `${product.name} - Quantidade: ${product.quantity}`;
      productUl.appendChild(li);
  
      total += product.quantity * product.price;
    });
  
    const totalValue = document.getElementById('total-value');
    totalValue.textContent = `Valor Total: R$ ${total.toFixed(2)}`;
  }
  
  // Função para atualizar a quantidade de um produto
  function updateQuantity(productIndex, newQuantity) {
    products[productIndex].quantity = newQuantity;
    renderProducts();
  }
  
  // Evento do botão "Finalizar Compra"
  const checkoutButton = document.getElementById('checkout-button');
  checkoutButton.addEventListener('click', () => {
    // Lógica para finalizar a compra
    alert('Compra finalizada com sucesso!');
  });
  
  // Renderiza os produtos iniciais
  renderProducts();
  