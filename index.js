var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');

var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

function isProductInCart(cart, id_prod) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id_prod == id_prod) {
            return true;
        }
    }

    return false;
}

function calculateTotal(cart, req) {
    total = 0;
    for (let i = 0; i < cart.length; i++) {
        //se tiver desconto, somar com o desconto. Se nao, com o valor normal
        if (cart[i].precoDesconto_prod) {
            total = total + (cart[i].precoDesconto_prod * cart[i].quantidade_prod);
        } else {
            total = total + (cart[i].preco_prod * cart[i].quantidade_prod)
        }
    }
    req.session.total = total;
    return total;
}

app.listen(8080);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "segredo",
    resave: false,
    saveUninitialized: false
}));

const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'pixelcat'
});


app.get('/', function (req, res) {
    res.render('pages/login');
});

app.post('/home', function (req, res) {
    var email_cliente = req.body.email_cliente;
    var senha_cliente = req.body.senha_cliente;
  
    console.log('Email do cliente:', email_cliente);
    console.log('Senha do cliente:', senha_cliente);
  
    const loginQuery = "SELECT `email_cliente`, `senha_cliente` FROM `pixelcat`.`cliente` WHERE `email_cliente` = ? AND `senha_cliente` = ?";
    const roleQuery = "SELECT `adm_cliente` FROM `pixelcat`.`cliente` WHERE `email_cliente` = ?";
  
    con.query(loginQuery, [email_cliente, senha_cliente], (err, loginResult) => {
      if (err) {
        console.error('Erro ao logar:', err);
        res.status(500).send('Erro ao realizar o login');
      } else {
        console.log('Sucesso');
  
        if (loginResult.length > 0) {
          con.query(roleQuery, [email_cliente], (err, roleResult) => {
            if (err) {
              console.error('Erro ao executar a consulta de perfil:', err);
              res.status(500).send('Erro ao recuperar o perfil do cliente');
            } else {
              console.log('Sucesso ao consultar o perfil do cliente');
  
              if (roleResult.length > 0) {
                if (roleResult[0].adm_cliente === 'Sim') {
                  console.log('Cliente é um funcionário');
                  res.redirect('/funcionario');
                } else {
                  console.log('Cliente não é um funcionário');
                  con.query("SELECT `id_prod`, `nome_prod`, `preco_prod`, `precoDesconto_prod`, `estoque_prod`, `descricao_prod`, `plataforma_prod`, `imagem_prod` FROM `pixelcat`.`produto`", (err, result) => {
                    if (err) {
                      console.error('Erro ao executar a consulta:', err);
                      res.status(500).send('Erro ao recuperar os produtos');
                    } else {
                      console.log('Sucesso!');
                      res.render('pages/produtos', { result: result });
                    }
                  });
                }
              } else {
                console.log('Perfil do cliente não encontrado');
                res.status(401).send('Perfil do cliente não encontrado');
              }
            }
          });
        } else {
          console.log('Credenciais inválidas');
          res.status(401).send('Credenciais inválidas');
        }
      }
    });
  });
  

app.post('/homeL', function(req, res) {
    con.query("SELECT `id_prod`, `nome_prod`, `preco_prod`, `precoDesconto_prod`, `estoque_prod`, `descricao_prod`, `plataforma_prod`, `imagem_prod` FROM `pixelcat`.`produto`", (err, result) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).send('Erro ao recuperar os produtos');
        } else {
            res.render('pages/produtos', { result: result });
        }
    });
});

app.post('/homeF', function(req, res) {
    con.query("SELECT `id_prod`, `nome_prod`, `preco_prod`, `precoDesconto_prod`, `estoque_prod`, `descricao_prod`, `plataforma_prod`, `imagem_prod` FROM `pixelcat`.`produto`", (err, result) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).send('Erro ao recuperar os produtos');
        } else {
            res.render('pages/produtosF', { result: result });
        }
    });
});


app.post('/register', function (req, res) {

    const { nome_cliente, email_cliente, senha_cliente, cpf_cliente, dataNasc_cliente, telefone_cliente, endereco_cliente, confirmar_senha } = req.body;
    if (confirmar_senha == senha_cliente) {
        const query = `INSERT INTO cliente (nome_cliente, email_cliente, senha_cliente, cpf_cliente, dataNasc_cliente, telefone_cliente, endereco_cliente) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        con.query(query, [nome_cliente, email_cliente, senha_cliente, cpf_cliente, dataNasc_cliente, telefone_cliente, endereco_cliente], (err, result) => {
            if (err) {
                console.error('Erro ao inserir os dados:', err);
                res.status(500).send('Erro ao realizar o cadastro');
            } else {
                console.log('Dados inseridos com sucesso');
                res.redirect('/');
                con.end();
            }
        });
    } else {
        res.redirect('/');
    };
});

app.post('/add', function (req, res) {
    var id_prod = req.body.id_prod;
    var nome_prod = req.body.nome_prod;
    var preco_prod = req.body.preco_prod;
    var precoDesconto_prod = req.body.precoDesconto_prod;
    var plataforma_prod = req.body.plataforma_prod;
    var quantidade_prod = req.body.quantidade_prod;
    var imagem_prod = req.body.imagem_prod;
    var product = { id_prod: id_prod, nome_prod: nome_prod, preco_prod: preco_prod, precoDesconto_prod: precoDesconto_prod, plataforma_prod: plataforma_prod, quantidade_prod: quantidade_prod, imagem_prod: imagem_prod }

    if (req.session.cart) {
        var cart = req.session.cart;

        if (!isProductInCart(cart, id_prod)) {
            cart.push(product);
        }
    } else {
        req.session.cart = [product];
        var cart = req.session.cart;
    }

    //calcular o total
    calculateTotal(cart, req);

    res.redirect('/carrinho');

});

app.get('/carrinho', function (req, res) {
    var cart = req.session.cart;
    var total = req.session.total;
    res.render('pages/carrinho', { cart: cart, total: total });
});

app.post('/remove_product', function (req, res) {
    var id_prod = req.body.id_prod;
    var cart = req.session.cart;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id_prod == id_prod) {
            cart.splice(cart.indexOf(i), 1);
        }
    }
    //recalcular
    calculateTotal(cart, req);
    res.redirect('/carrinho');
});

app.post('/edit', function (req, res) {
    var id_prod = req.body.id_prod;
    var quantidade_prod = req.body.quantidade_prod;
    var increase = req.body.increase;
    var decrease = req.body.decrease;

    var cart = req.session.cart;

    if (increase) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id_prod == id_prod) {
                if (cart[i].quantidade_prod > 0) {
                    cart[i].quantidade_prod = parseInt(cart[i].quantidade_prod) + 1;
                }
            }
        }
    }

    if (decrease) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id_prod == id_prod) {
                if (cart[i].quantidade_prod > 1) {
                    cart[i].quantidade_prod = parseInt(cart[i].quantidade_prod) - 1;
                }
            }
        }
    }

    calculateTotal(cart, req);
    res.redirect('/carrinho');
});

app.get('/checkout', function (req, res) {
    var totalQuantity = req.session.cart.reduce(function (acc, item) {
        return acc + parseInt(item.quantidade_prod);
    }, 0);

    req.session.cart.forEach(function (item) {
        var quantidadeProdutos = parseInt(item.quantidade_prod);

        if (quantidadeProdutos > 0) {
            var query = "UPDATE produto SET estoque_prod = estoque_prod - ? WHERE nome_prod = ?";
            con.query(query, [quantidadeProdutos, item.nome_prod], function (err, result) {
                if (err) {
                    console.error("Erro ao atualizar o estoque do produto", item.nome_prod, err);
                } else {
                    console.log("Estoque do produto", item.nome_prod, "atualizado com sucesso");
                }
            });
        }
    });

    res.render('pages/checkout', { totalQuantity: totalQuantity, cart: req.session.cart });
    req.session.cart = [];
    req.session.total = 0;
});



app.get('/tela_de_cadastro', function (req, res) {
    res.render('pages/cadastro');
});

app.get('/pesquisar', function (req, res) {
    var searchTerm = req.query.term;
    con.query("SELECT * FROM produto WHERE nome_prod LIKE ?", ['%' + searchTerm + '%'], function (err, result) {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).send('Erro ao realizar a pesquisa');
        } else {
            res.render('pages/pesquisa', { result: result, searchTerm: searchTerm });
        }
    });
  });

  app.get('/sobrenos', function(req,res) {
    res.render('pages/aboutus');
  });

  app.get('/funcionario', function (req, res) {

    con.query("SELECT `id_prod`, `nome_prod`, `preco_prod`, `precoDesconto_prod`, `estoque_prod`, `descricao_prod`, `plataforma_prod`, `imagem_prod` FROM `pixelcat`.`produto`", (err, result) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).send('Erro ao recuperar os produtos');
        } else {
            res.render('pages/funcionario', { result: result });
        }
    });

  });

  app.post('/funcionarioAdd', function (req, res) {
    var nome_prod = req.body.nome_prod;
    var preco_prod = req.body.preco_prod;
    var precoDesconto_prod = req.body.precoDesconto_prod;
    var estoque_prod = req.body.estoque_prod;
    var descricao_prod = req.body.descricao_prod;
    var plataforma_prod = req.body.plataforma_prod;
    var imagem_prod = req.body.imagem_prod;

    // Execute a query para inserir os dados no banco de dados
    var query = "INSERT INTO produto (nome_prod, preco_prod, precoDesconto_prod, estoque_prod, descricao_prod, plataforma_prod, imagem_prod) VALUES (?, ?, ?, ?, ?, ?, ?)";
    con.query(query, [nome_prod, preco_prod, precoDesconto_prod, estoque_prod, descricao_prod, plataforma_prod, imagem_prod], (err, result) => {
        if (err) {
            console.error('Erro ao inserir os dados:', err);
            res.status(500).send('Erro ao adicionar o produto');
        } else {
            console.log('Produto adicionado com sucesso');
            res.redirect('/funcionario');
        }
    });
});

app.post('/funcionarioRemove', function (req, res) {
    var id_prod = req.body.id_prod;

    // Execute a query para remover o produto do banco de dados
    var query = "DELETE FROM produto WHERE id_prod = ?";
    con.query(query, [id_prod], (err, result) => {
        if (err) {
            console.error('Erro ao remover o produto:', err);
            res.status(500).send('Erro ao remover o produto');
        } else {
            console.log('Produto removido com sucesso');
            res.redirect('/funcionario');
        }
    });
});

app.post('/funcionarioEdit', function (req, res) {
    var id_prod = req.body.id_prod;
    var nome_prod = req.body.nome_prod;
    var preco_prod = req.body.preco_prod;
    var precoDesconto_prod = req.body.precoDesconto_prod;
    var plataforma_prod = req.body.plataforma_prod;
    var estoque_prod = req.body.estoque_prod;
    var descricao_prod = req.body.descricao_prod;
    var imagem_prod = req.body.imagem_prod;

    // Execute a query para atualizar o produto no banco de dados
    var query = "UPDATE produto SET nome_prod = ?, preco_prod = ?, precoDesconto_prod = ?, plataforma_prod = ?, estoque_prod = ?, descricao_prod = ?, imagem_prod = ? WHERE id_prod = ?";
    con.query(query, [nome_prod, preco_prod, precoDesconto_prod, plataforma_prod, estoque_prod, descricao_prod, imagem_prod, id_prod], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar o produto:', err);
            res.status(500).send('Erro ao atualizar o produto');
        } else {
            console.log('Produto atualizado com sucesso');
            res.redirect('/funcionario');
        }
    });
});