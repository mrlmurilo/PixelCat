const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 4000;
const connection = mysql.createConnection({
  host: 'database-1.cxcpz2ybu3tg.sa-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'PixelCats',
  database: 'pixelcats',
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


connection.connect((error) => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados: ', error);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'login.html');
  res.sendFile(filePath);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM cliente WHERE email_cliente = ? AND senha_cliente = ?';
  connection.query(query, [email, password], (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta: ', error);
      res.status(500).send('Erro ao executar a consulta');
      return;
    }

    if (results.length === 0) {
      res.status(401).send('Credenciais inválidas');
      return;
    }

    res.status(200).send('Login bem-sucedido');
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
