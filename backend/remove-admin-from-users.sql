-- Remover admin da tabela users
DELETE FROM users WHERE email = 'busca@shop.com';

-- Remover coluna is_admin se existir
ALTER TABLE users DROP COLUMN IF EXISTS is_admin;

-- Verificar que não há mais admins em users
SELECT * FROM users;

-- Verificar que admin está na tabela correta
SELECT * FROM admins;
