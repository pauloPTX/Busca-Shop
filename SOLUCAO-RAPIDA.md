# 🚨 SOLUÇÃO RÁPIDA - Erro 500

## O Problema
O banco de dados não aceita imagens Base64 porque a coluna `image` é VARCHAR pequeno.

## ✅ SOLUÇÃO IMEDIATA

### Opção 1: Executar SQL no Supabase (RECOMENDADO)

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **SQL Editor**
4. Cole e execute:

```sql
ALTER TABLE products ALTER COLUMN image TYPE TEXT;
```

5. Reinicie o backend:
```bash
cd backend
mvn spring-boot:run
```

### Opção 2: Usar URLs de Imagem (TEMPORÁRIO)

Se não conseguir executar o SQL agora, use URLs de imagens da internet:

**Exemplos de URLs:**
- `https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SX679_.jpg`
- `https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SX679_.jpg`
- `https://m.media-amazon.com/images/I/81fPKd-2AYL._AC_SX679_.jpg`

**Como usar:**
1. No campo "Imagem do Produto", NÃO clique em "Selecionar Imagem"
2. Cole a URL diretamente no campo de texto (vou adicionar esse campo)

## 🔍 Como Verificar se o SQL Foi Executado

Execute no SQL Editor do Supabase:
```sql
SELECT column_name, data_type, character_maximum_length 
FROM information_schema.columns 
WHERE table_name = 'products' AND column_name = 'image';
```

Se `data_type` = `text`, está correto! ✅
Se `data_type` = `character varying`, precisa executar o ALTER TABLE! ❌
