const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 4000;

// Middleware para análise do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurações do MySQL
const connection = mysql.createConnection({
  host: 'database-1.cxcpz2ybu3tg.sa-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'PixelCats',
  database: 'pixelcats'
});

app.use(express.static(path.join(__dirname, 'tela_cadastre-se')));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'cadastro.html');
  res.sendFile(filePath);
});

app.get('/login', (req, res) => {
  
});


// Rota para lidar com o envio do formulário de cadastro
app.post('/formulario', (req, res) => {
  // Obtenha os dados do formulário enviados pelo cliente
  const { nome_cliente, email_cliente, cpf_cliente, dataNasc_cliente, telefone_cliente, endereco_cliente } = req.body;

  // Construir a query SQL de inserção
  const query = `INSERT INTO cliente (nome_cliente, email_cliente, cpf_cliente, dataNasc_cliente, telefone_cliente, endereco_cliente) VALUES (?, ?, ?, ?, ?, ?)`;

  // Executar a query SQL para inserir os dados no banco de dados
  connection.query(query, [nome_cliente, email_cliente, cpf_cliente, dataNasc_cliente, telefone_cliente, endereco_cliente], (err, results) => {
    if (err) {
      console.error('Erro ao inserir os dados:', err);
      res.status(500).send('Erro ao realizar o cadastro');
    } else {
      console.log('Dados inseridos com sucesso');
      res.send('Cadastro realizado com sucesso!');
      res.redirect('/login');
      connection.end();
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

