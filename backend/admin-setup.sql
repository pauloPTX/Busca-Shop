-- Criar tabela de administradores separada
CREATE TABLE IF NOT EXISTS admins (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir admin padrão
INSERT INTO admins (name, email, password, created_at)
VALUES ('Administrador', 'busca@shop.com', 'admin123', NOW())
ON CONFLICT (email) DO NOTHING;

-- Verificar admins
SELECT * FROM admins;
