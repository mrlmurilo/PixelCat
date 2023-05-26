const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
    host: 'database-1.cxcpz2ybu3tg.sa-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'PixelCats',
    database: 'pixelcats'
});

// Conexão com o banco de dados
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rota para lidar com o envio do formulário
app.post('/formulario', (req, res) => {
  const { nome_cliente, email_cliente, cpf_cliente, dataNasc_cliente, telefone_cliente, endereco_cliente } = req.body;

  // Query para inserir os dados no banco de dados
  const sql = `INSERT INTO usuarios (nome_cliente, email_cliente, cpf_cliente, dataNasc_cliente, telefone_cliente, endereco_cliente) VALUES ('${nome_cliente}', '${email_cliente}','${cpf_cliente}','${dataNasc_cliente}','${telefone_cliente}','${endereco_cliente}')`;

  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Dados inseridos no banco de dados');
    res.send('Dados inseridos no banco de dados');
  });
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
