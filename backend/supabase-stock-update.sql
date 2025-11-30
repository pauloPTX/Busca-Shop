-- Adicionar coluna stock na tabela products
ALTER TABLE products ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 0;

-- Atualizar produtos existentes com estoque padrão
UPDATE products SET stock = 50 WHERE stock IS NULL OR stock = 0;
