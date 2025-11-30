-- Script SQL para inicializar o banco de dados no Supabase

-- Criar tabela de produtos
CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    image VARCHAR(500),
    rating DECIMAL(2, 1),
    reviews INTEGER,
    badge VARCHAR(50)
);

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de itens do pedido
CREATE TABLE IF NOT EXISTS order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Inserir produtos de exemplo
INSERT INTO products (name, price, category, description, image, rating, reviews, badge) VALUES
('iPhone 15 Pro Max 256GB', 8999.00, 'Eletrônicos', 'Smartphone Apple com chip A17 Pro, câmera de 48MP e tela Super Retina XDR', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300', 4.8, 1245, 'Mais Vendido'),
('MacBook Air M2 13" 512GB', 12999.00, 'Eletrônicos', 'Notebook Apple com chip M2, 8GB RAM e SSD de 512GB', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300', 4.9, 892, 'Novidade'),
('Smartwatch Apple Watch Series 9', 3299.00, 'Eletrônicos', 'Relógio inteligente com GPS, monitor cardíaco e resistência à água', 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300', 4.7, 567, NULL),
('Câmera Sony Alpha A7 IV', 15999.00, 'Eletrônicos', 'Câmera mirrorless full-frame com sensor de 33MP e gravação 4K', 'https://images.unsplash.com/photo-1606980707146-b88b8c8e2e0e?w=300', 4.9, 234, 'Top 10'),
('Notebook Gamer RTX 4070 32GB', 8999.00, 'Eletrônicos', 'Notebook gamer com RTX 4070, Intel i7 13ª geração e 32GB RAM', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300', 4.6, 445, NULL),
('Fone Bluetooth Sony WH-1000XM5', 1899.00, 'Eletrônicos', 'Fone over-ear com cancelamento de ruído ativo e bateria de 30h', 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300', 4.8, 789, 'Oferta'),
('Monitor Gamer 27" 144Hz OLED', 2799.00, 'Eletrônicos', 'Monitor OLED com taxa de atualização de 144Hz e tempo de resposta 1ms', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300', 4.7, 356, NULL),
('Teclado Mecânico RGB Wireless', 599.00, 'Eletrônicos', 'Teclado mecânico sem fio com switches blue e iluminação RGB', 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=300', 4.5, 623, NULL),
('Console PlayStation 5 Pro', 4999.00, 'Eletrônicos', 'Console de última geração com SSD de 1TB e suporte a 8K', 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300', 4.9, 1567, 'Mais Vendido'),
('Tablet Samsung Galaxy Tab S9', 3499.00, 'Eletrônicos', 'Tablet Android com tela AMOLED de 11" e S Pen incluída', 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300', 4.6, 445, 'Novidade'),
('SSD NVMe 2TB Samsung 980 Pro', 1299.00, 'Eletrônicos', 'SSD M.2 NVMe com velocidade de leitura de até 7000MB/s', 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300', 4.8, 892, NULL),
('Drone DJI Mini 4 Pro 4K', 4599.00, 'Eletrônicos', 'Drone compacto com câmera 4K, gimbal de 3 eixos e 34min de voo', 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300', 4.7, 234, 'Oferta');
