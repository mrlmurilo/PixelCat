const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'AWS',
    user: 'admin',
    password: 'PixelCats',
    database: 'pixelcats'
});

connection.connect( function (err){
    console.log("Conexão Realizada com sucesso!");
});

connection.query("SELECT nome_cliente FROM cliente", function (err, rows, fields){
    if(!err){
        console.log("Resultado:", rows);
    }else{
        console.log('Erro: Consulta não realizada');
    }
});