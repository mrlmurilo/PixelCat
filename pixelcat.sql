-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 26/06/2023 às 18:11
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `pixelcat`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(10) NOT NULL,
  `nome_cliente` varchar(45) NOT NULL,
  `email_cliente` varchar(45) NOT NULL,
  `cpf_cliente` char(14) NOT NULL,
  `dataNasc_cliente` date NOT NULL,
  `telefone_cliente` varchar(15) NOT NULL,
  `endereco_cliente` varchar(45) NOT NULL,
  `senha_cliente` varchar(50) NOT NULL,
  `adm_cliente` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nome_cliente`, `email_cliente`, `cpf_cliente`, `dataNasc_cliente`, `telefone_cliente`, `endereco_cliente`, `senha_cliente`, `adm_cliente`) VALUES
(1, 'Felipão', 'felipedemais@gmail.com', '12345678912', '1992-03-11', '123456789012', 'casa do Felipe, 213', '123', 'Não'),
(2, 'Claudia', 'claudia@gmail.com', '12345678912', '1999-12-12', '123456789012', 'claudia\'s house, 111', '123', 'Não'),
(3, 'Guilherme', 'gui@gmail.com', '12345678912', '1999-12-12', '123456789012', 'gui\'s house, 222', '123', 'Não'),
(4, 'Miguel Eleotério', 'm.eleoteriovieira@gmail.com', '12345678912', '2006-11-11', '123456789012', 'casa do Miguel, 999', 'admin', 'Sim'),
(5, 'Murilo Margonar', 'mrl.margonar@gmail.com', '12345678912', '2005-12-12', '123456789012', 'Casa do Murilo, 111', 'admin', 'Sim'),
(12, 'Milene Almeida', 'milene@gmail.com', '12345678912', '1989-12-12', '123456789012', 'Rua Ferdinando Soares, Jardim Bonfim 1076', 'qwer1234', 'Não');

-- --------------------------------------------------------

--
-- Estrutura para tabela `milenegmailcomcarrinho`
--

CREATE TABLE `milenegmailcomcarrinho` (
  `id` int(11) NOT NULL,
  `id_prod` int(11) DEFAULT NULL,
  `nome_prod` varchar(255) DEFAULT NULL,
  `preco_prod` float DEFAULT NULL,
  `precoDesconto_prod` float DEFAULT NULL,
  `plataforma_prod` varchar(255) DEFAULT NULL,
  `quantidade_prod` int(11) DEFAULT NULL,
  `imagem_prod` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `milenegmailcomcarrinho`
--

INSERT INTO `milenegmailcomcarrinho` (`id`, `id_prod`, `nome_prod`, `preco_prod`, `precoDesconto_prod`, `plataforma_prod`, `quantidade_prod`, `imagem_prod`) VALUES
(1, 3, 'Lego Batman The Videogame', 19.99, 0, 'Steam', 2, 'batman1.jpg'),
(2, 10, 'Resident Evil 4 - Remake', 249.99, 0, 'Steam', 1, 'residentevil4remake.png');

-- --------------------------------------------------------

--
-- Estrutura para tabela `mrlmargonargmailcomcarrinho`
--

CREATE TABLE `mrlmargonargmailcomcarrinho` (
  `id` int(11) NOT NULL,
  `id_prod` int(11) DEFAULT NULL,
  `nome_prod` varchar(255) DEFAULT NULL,
  `preco_prod` float DEFAULT NULL,
  `precoDesconto_prod` float DEFAULT NULL,
  `plataforma_prod` varchar(255) DEFAULT NULL,
  `quantidade_prod` int(11) DEFAULT NULL,
  `imagem_prod` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `mrlmargonargmailcomcarrinho`
--

INSERT INTO `mrlmargonargmailcomcarrinho` (`id`, `id_prod`, `nome_prod`, `preco_prod`, `precoDesconto_prod`, `plataforma_prod`, `quantidade_prod`, `imagem_prod`) VALUES
(13, 1, 'Resident Evil 2 Remake', 119.99, 99.99, 'Steam', 2, 're2.png'),
(14, 3, 'Lego Batman The Videogame', 19.99, 0, 'Steam', 2, 'batman1.jpg'),
(15, 7, 'LEGO O Senhor dos Anéis', 19.99, 0, 'Steam', 2, 'LoR1.jpg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto`
--

CREATE TABLE `produto` (
  `id_prod` int(11) NOT NULL,
  `nome_prod` varchar(255) NOT NULL,
  `preco_prod` float(8,2) NOT NULL,
  `precoDesconto_prod` float(8,2) DEFAULT NULL,
  `estoque_prod` int(11) NOT NULL,
  `descricao_prod` varchar(255) NOT NULL,
  `plataforma_prod` varchar(45) NOT NULL,
  `imagem_prod` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produto`
--

INSERT INTO `produto` (`id_prod`, `nome_prod`, `preco_prod`, `precoDesconto_prod`, `estoque_prod`, `descricao_prod`, `plataforma_prod`, `imagem_prod`) VALUES
(1, 'Resident Evil 2 Remake', 119.99, 99.99, 20, 'Resident Evil 2, chamado no Japão de Biohazard RE:2, é um jogo eletrônico de survival horror desenvolvido e publicado pela Capcom, sendo um remake do jogo original de 1998.', 'Steam', 're2.png'),
(3, 'Lego Batman The Videogame', 19.99, NULL, 20, 'Lego Batman: The Videogame é um jogo de videogame de ação-aventura, desenvolvido pela Traveller\'s Tales e lançado pela Warner Bros. Games em 2008. O jogo é semelhante aos da série LEGO Star Wars e LEGO Indiana Jones, ambos baseados na série de brinquedos ', 'Steam', 'batman1.jpg'),
(7, 'LEGO O Senhor dos Anéis', 19.99, NULL, 18, 'Lego O Senhor dos Anéis é um videogame de ação e aventura com tema Lego desenvolvido pela Traveller\'s Tales.', 'Steam', 'LoR1.jpg'),
(9, 'Grand Theft Auto V', 109.90, 59.90, 15, 'O game se passa no estado ficcional de San Andreas, baseado na Califórnia do Sul, nos EUA. Traz a história de campanha simultânea de três criminosos: o ladrão de bancos aposentado Michael \'Mike\' De Santa, o gângster de rua Franklin Clinton e o traficante', 'Steam, PS4, Xbox', 'grandtheftautov.png'),
(10, 'Resident Evil 4 - Remake', 249.99, 0.00, 20, 'Treinado e com experiência em diversas missões, Leon foi enviado para resgatar a filha sequestrada do presidente dos Estados Unidos. Ele a rastreou até uma vila europeia isolada, onde algo muito estranho está acontecendo com os moradores. Então se revela ', 'Steam', 'residentevil4remake.png');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Índices de tabela `milenegmailcomcarrinho`
--
ALTER TABLE `milenegmailcomcarrinho`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `mrlmargonargmailcomcarrinho`
--
ALTER TABLE `mrlmargonargmailcomcarrinho`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`id_prod`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `milenegmailcomcarrinho`
--
ALTER TABLE `milenegmailcomcarrinho`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `mrlmargonargmailcomcarrinho`
--
ALTER TABLE `mrlmargonargmailcomcarrinho`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `id_prod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
