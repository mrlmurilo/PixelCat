
## PixelCat

PixelCat é um site de compras de jogos através do sistema de *keys* (código atribuído a uma cópia do jogo para que seja possível adquirí-lo).

A principal proposta do mesmo é ser um site simples, intuitivo e visualmente agradável tanto para aqueles que já estão no mundo dos jogos digitais a muito tempo quanto para aqueles que estão por adentrar um novo mundo.

Desenvolvido para TCC do curso técnico de Desenvolvimento de sistemas SENAI.

 

## Autores

- [@mrlmurilo](https://www.github.com/mrlmurilo)
- [@m-eleoterio](https://www.github.com/m-eleoterio)


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/mrlmurilo/PixelCat
```

Entre no diretório do projeto

```bash
  cd PixelCat
```

Instale as dependências

```bash
  npm install
```
abra o seu SQL Workbench ou PHPMyAdmin (Caso não possua nenhum dos dois, recomendamos o uso do PMA através do [XAMPP](https://www.apachefriends.org/pt_br))

crie um banco de dados nomeado "pixelcat" pela GUI do aplicativo ou pelos comandos
```sql
  CREATE DATABASE pixelcat;
  USE pixelcat;
```

Importe o arquivo "pixelcat.sql" ao banco de dados "pixelcat"

![image](https://github.com/user-attachments/assets/b4c9417a-5cca-4218-aace-04160340a138)

Inicie o servidor

```bash
  node index.js
```

Acesse via localhost
```bash
  http://localhost:9000/
```

## Screenshots

**Login**
![login](https://github.com/user-attachments/assets/cdeafebd-35f1-4789-88e0-925ac2ff056e)

**Tela de registro**
![register](https://github.com/user-attachments/assets/e3814152-1ef2-484c-b357-fdf20078e542)


**Tela inicial**
![home](https://github.com/user-attachments/assets/a46d01d7-4528-4393-a30a-9e7f551a0175)

**Carrinho**
![image](https://github.com/user-attachments/assets/397a98ee-ddec-494f-8115-49659d82afe4)



