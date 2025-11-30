-- ============================================
-- QUERIES ÚTEIS - Busca Shop
-- ============================================

-- Verificar produtos cadastrados
SELECT * FROM products;

-- Contar produtos por categoria
SELECT category, COUNT(*) as total 
FROM products 
GROUP BY category;

-- Produtos mais vendidos (com badge)
SELECT * FROM products 
WHERE badge = 'Mais Vendido';

-- Buscar produto por nome
SELECT * FROM products 
WHERE name ILIKE '%iphone%';

-- Verificar usuários cadastrados
SELECT id, name, email, created_at 
FROM users;

-- Ver pedidos de um usuário
SELECT o.id, o.total, o.status, o.created_at, u.name as usuario
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE u.id = 1;

-- Ver itens de um pedido
SELECT oi.quantity, oi.price, p.name as produto
FROM order_items oi
JOIN products p ON oi.product_id = p.id
WHERE oi.order_id = 1;

-- Relatório de vendas
SELECT 
    p.name as produto,
    SUM(oi.quantity) as quantidade_vendida,
    SUM(oi.quantity * oi.price) as total_vendas
FROM order_items oi
JOIN products p ON oi.product_id = p.id
GROUP BY p.name
ORDER BY total_vendas DESC;

-- Adicionar novo produto
INSERT INTO products (name, price, category, description, image, rating, reviews, badge)
VALUES ('Novo Produto', 999.00, 'Eletrônicos', 'Descrição do produto', 'https://url-da-imagem.jpg', 4.5, 100, 'Novidade');

-- Atualizar preço de um produto
UPDATE products 
SET price = 899.00 
WHERE id = 1;

-- Deletar produto
DELETE FROM products WHERE id = 1;

-- Limpar todas as tabelas (CUIDADO!)
TRUNCATE TABLE order_items CASCADE;
TRUNCATE TABLE orders CASCADE;
TRUNCATE TABLE products CASCADE;
TRUNCATE TABLE users CASCADE;

-- Resetar sequências
ALTER SEQUENCE products_id_seq RESTART WITH 1;
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE orders_id_seq RESTART WITH 1;
ALTER SEQUENCE order_items_id_seq RESTART WITH 1;
