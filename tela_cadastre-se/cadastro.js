const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'database-1.cxcpz2ybu3tg.sa-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'PixelCats',
    database: 'pixelcats'
});

connection.connect(function(err) {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conexão realizada com sucesso!');

    connection.query("SELECT nome_cliente FROM cliente", function (err, rows, fields){
        if(!err){
            console.log("Resultado:", rows);
        }else{
            console.log(err);
        }
        connection.end(); // Encerra a conexão após executar a consulta
    });
});
