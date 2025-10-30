-- DATABASE: supporthub

CREATE DATABASE IF NOT EXISTS supporthub
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE supporthub;

-- TABELA: usuarios

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  perfil ENUM('adm', 'suporte', 'cliente') DEFAULT 'cliente',
  ativo BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: categorias

CREATE TABLE IF NOT EXISTS categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL UNIQUE,
  descricao TEXT
);

-- TABELA: chamados

CREATE TABLE IF NOT EXISTS chamados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descricao TEXT NOT NULL,
  status ENUM('aberto', 'em andamento', 'fechado') DEFAULT 'aberto',
  prioridade ENUM('baixa', 'média', 'alta') DEFAULT 'média',
  id_cliente INT NOT NULL,
  id_suporte INT DEFAULT NULL,
  categoria_id INT DEFAULT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (id_cliente) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (id_suporte) REFERENCES usuarios(id) ON DELETE SET NULL,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
);

-- TABELA: respostas

CREATE TABLE IF NOT EXISTS respostas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chamado_id INT NOT NULL,
  usuario_id INT NOT NULL,
  mensagem TEXT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (chamado_id) REFERENCES chamados(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- USUÁRIO ADMIN PADRÃO

INSERT INTO usuarios (nome, email, senha, perfil)
VALUES ('Administrador', 'admin@supporthub.com', '$2b$10$abcdefghijklmnopqrstuv', 'adm')
ON DUPLICATE KEY UPDATE email=email;

-- CATEGORIAS INICIAIS

INSERT INTO categorias (nome, descricao)
VALUES 
  ('Rede', 'Problemas relacionados à conectividade de rede.'),
  ('Software', 'Erros ou dúvidas sobre aplicativos.'),
  ('Hardware', 'Problemas com equipamentos físicos.')
ON DUPLICATE KEY UPDATE nome=nome;
