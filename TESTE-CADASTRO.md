# 🧪 Como Testar o Cadastro de Produtos

## Passos para Testar

### 1. Execute o SQL no Supabase
```sql
ALTER TABLE products ALTER COLUMN image TYPE TEXT;
```

### 2. Reinicie o Backend
```bash
cd backend
mvn spring-boot:run
```

### 3. Acesse o Admin
- URL: http://localhost:5173/admin
- Login: busca@shop.com
- Senha: admin123

### 4. Cadastre um Produto
1. Clique em "Cadastrar Produto"
2. Preencha:
   - Nome: Teste Produto
   - Preço: 999.99
   - Categoria: Eletrônicos
   - Descrição: Produto de teste
   - Badge: Novidade
3. Clique em "Selecionar Imagem" (max 5MB)
4. Clique em "Cadastrar Produto"

### 5. Verifique
- Clique no botão "🔄 Atualizar"
- Vá em "Produtos Cadastrados"
- O produto deve aparecer na lista

## ✅ Melhorias Implementadas

1. **Validações**:
   - Nome e preço obrigatórios
   - Imagem obrigatória
   - Tamanho máximo 5MB

2. **Conversão de Tipos**:
   - Price → Float
   - Rating → Float
   - Reviews → Integer

3. **Logs de Debug**:
   - Console mostra dados enviados
   - Erros detalhados

4. **Limites Aumentados**:
   - Backend aceita até 10MB
   - Frontend valida 5MB

## 🐛 Se Ainda Não Funcionar

Abra o Console do Navegador (F12) e veja:
- Erros de rede
- Dados sendo enviados
- Resposta do servidor
