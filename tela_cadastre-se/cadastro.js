const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Configurações do MySQL
const connection = mysql.createConnection({
  host: 'database-1.cxcpz2ybu3tg.sa-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'PixelCats',
  database: 'pixelcats'
});



// Conexão com o MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL!');
});

// Configuração do body-parser para receber dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rota para exibir o formulário de cadastro
app.get('/', (req, res) => {
 // Lê o conteúdo do arquivo HTML externo
 fs.readFile('tela_cadastre-se/cadastro.html', 'utf8', (err, htmlContent) => {
  if (err) {
    console.error('Erro ao ler o arquivo HTML:', err);
    return res.status(500).send('Erro ao processar a requisição');
  }

  // Envia o conteúdo do arquivo HTML como resposta
  res.send(htmlContent);
});
});

// Rota para cadastrar os dados no MySQL
app.post('/formulario', (req, res) => {
  const { nome_cliente, email_cliente, cpf_cliente, dataNasc_cliente, telefone_cliente, endereco_cliente} = req.body;
  const sql = `INSERT INTO cliente (nome_cliente, email_cliente, cpf_cliente, dataNasc_cliente, telefone_cliente, endereco_cliente) VALUES (?, ?, ?, ?, ?, ?)`;
  connection.query(sql, [nome_cliente, email_cliente, cpf_cliente, dataNasc_cliente, telefone_cliente, endereco_cliente], (err, result) => {
    if (err) throw err;
    res.send('Cadastro realizado com sucesso!');
  });
});

// Inicia o servidor
app.listen(3002, () => {
  console.log('Servidor iniciado na porta 3002');
});
