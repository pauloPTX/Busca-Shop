# 🔧 Correção do Cadastro de Produtos

## Problema
O cadastro de produtos não estava funcionando porque a coluna `image` no banco de dados era muito pequena para armazenar imagens em Base64.

## Solução

### 1. Execute o script SQL no Supabase

Acesse o **SQL Editor** no Supabase e execute:

```sql
ALTER TABLE products ALTER COLUMN image TYPE TEXT;
```

Ou execute o arquivo `fix-image-column.sql` que está nesta pasta.

### 2. Reinicie o backend

```bash
cd backend
mvn spring-boot:run
```

## Novas Funcionalidades

✅ **Botão Atualizar**: Adicionado em todas as seções do painel admin
- Dashboard
- Cadastrar Produto
- Produtos Cadastrados
- Usuários

✅ **Coluna IMAGE corrigida**: Agora suporta imagens Base64 grandes

## Como Testar

1. Acesse o painel admin: http://localhost:5173/admin
2. Faça login com: busca@shop.com / admin123
3. Vá em "Cadastrar Produto"
4. Preencha os dados e selecione uma imagem
5. Clique em "Cadastrar Produto"
6. Use o botão "🔄 Atualizar" para ver o produto cadastrado
