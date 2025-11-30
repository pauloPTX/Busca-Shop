-- Migração automática para corrigir coluna image
ALTER TABLE products ALTER COLUMN image TYPE TEXT;
