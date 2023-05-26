const mysql = require('mysql');
const form = document.getElementById('form_cadastro');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const txtNome = document.getElementById('txtNome').value;
    const txtEmail = document.getElementById('txtEmail').value;
    const txtCpf = document.getElementById('txtCpf').value;
    const txtDataNasc = document.getElementById('txtDataNasc').value;
    const txtTelefone = document.getElementById('txtTelefone').value;
    const txtEndereco = document.getElementById('txtEndereco').value;

    const connection = mysql.createConnection({
        host: 'database-1.cxcpz2ybu3tg.sa-east-1.rds.amazonaws.com',
        user: 'admin',
        password: 'PixelCats',
        database: 'pixelcats'
    });

    connection.connect(function(err) {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
            return;
        }

        console.log('Conexão com o banco de dados estabelecida com sucesso!');

        const sql = "INSERT INTO cliente (nome_cliente, email_cliente, cpf_cliente, dataNasc_cliente, telefone_cliente, endereco_cliente) VALUES ?";
        const values = [
            [txtNome, txtEmail, txtCpf, txtDataNasc, txtTelefone, txtEndereco]
        ];

        connection.query(sql, [values], function (error, results, fields) {
            if (error) {
                console.error('Erro ao adicionar informações:', error);
                return;
            }

            console.log('Informações adicionadas com sucesso!');

            connection.end(function(err) {
                if (err) {
                    console.error('Erro ao encerrar a conexão com o banco de dados:', err);
                    return;
                }

                console.log('Conexão com o banco de dados encerrada com sucesso!');
            });
        });
    });

    form.reset();
});



// connection.connect(function(err) {
//     if (err) {
//         console.error('Erro ao conectar ao MySQL:', err);
//         return;
//     }
//     console.log('Conexão realizada com sucesso!');

//     connection.query("SELECT nome_cliente FROM cliente", function (err, rows, fields){
//         if(!err){
//             console.log("Resultado:", rows);
//         }else{
//             console.log(err);
//         }
//         connection.end(); // Encerra a conexão após executar a consulta
//     });
// });
