-- Script para corrigir a coluna image para suportar Base64
-- Execute este script no Supabase SQL Editor

ALTER TABLE products ALTER COLUMN image TYPE TEXT;
