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

// Rota para exibir o formulário de cadastro
app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="Style.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <h1>Cadastre<span id="cor2">-se</span></h1>
    <div class="painel-de-cadastro">
        <form id="formCad" action="/formulario" method="POST">
            <p>Nome:</p>
            <input class="inserir-texto" type="text" name="nome_cliente" id="nome_cliente" required>
            <p>Email:</p>
            <input class="inserir-texto" type="text" name="email_cliente" id="email_cliente" required>
            <p>CPF:</p>
            <input class="inserir-texto" type="text" name="cpf_cliente" id="cpf_cliente" required>
            <p>Data de Nascimento:</p>
            <input class="inserir-texto" type="text" name="dataNasc_cliente" id="dataNasc_cliente" required>
            <p>Telefone:</p>
            <input class="inserir-texto" type="text" name="telefone_cliente" id="telefone_cliente" required>
            <p>Endereço:</p>
            <input class="inserir-texto" type="text" name="endereco_cliente" id="endereco_cliente" required>
            <br><br>
            <input type="submit" id="btnCad" value="Cadastrar"></input>
        </form>
    </div>

    <script src="tela_cadastre-se/cadastro.js"></script>
</body>

</html>

  `);
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
app.listen(3001, () => {
  console.log('Servidor iniciado na porta 3001');
});
