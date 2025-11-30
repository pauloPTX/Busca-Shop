# 🔧 Guia do Painel Admin - Busca Shop

## 🚀 Configuração Inicial

### 1. Criar usuário admin no Supabase

Execute no **SQL Editor** do Supabase:

```sql
-- Adicionar coluna is_admin
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Criar usuário admin
INSERT INTO users (name, email, password, is_admin, created_at)
VALUES ('Administrador', 'busca@shop.com', 'admin123', TRUE, NOW())
ON CONFLICT (email) DO UPDATE SET is_admin = TRUE;

-- Verificar
SELECT id, name, email, is_admin FROM users WHERE is_admin = TRUE;
```

### 2. Reiniciar o Backend

```bash
cd backend
mvn spring-boot:run
```

## 📍 Acessar o Painel Admin

### URL do Painel: `http://localhost:5173/admin`

### Credenciais:
- **Email**: `busca@shop.com`
- **Senha**: `admin123`

O painel admin é **totalmente separado** da loja principal!

## ✨ Funcionalidades

### ➕ Criar Produto

1. Clique em **+ Novo Produto**
2. Preencha os campos:
   - **Nome**: Nome do produto
   - **Preço**: Valor em reais
   - **Categoria**: Escolha a categoria
   - **Descrição**: Descrição detalhada
   - **URL da Imagem**: Link da imagem
   - **Badge**: Mais Vendido, Novidade, Oferta ou Nenhum
3. Clique em **Salvar**

### ✏️ Editar Produto

1. Clique em **Editar** na linha do produto
2. Modifique os campos desejados
3. Clique em **Salvar**

### 🗑️ Excluir Produto

1. Clique em **Excluir** na linha do produto
2. Confirme a exclusão

## 📂 Categorias Disponíveis

Os produtos são automaticamente organizados por categoria:

- **Eletrônicos** → Aparece em Home e Eletrônicos
- **Smartphones** → Aparece em Home e Smartphones
- **Notebooks** → Aparece em Home e Computadores
- **Games** → Aparece em Home e Games
- **Áudio** → Aparece em Home e Áudio & Vídeo
- **Câmeras** → Aparece em Home e Acessórios

## 🏷️ Badges

Use badges para destacar produtos:

- **Mais Vendido** → Produtos populares
- **Novidade** → Lançamentos
- **Oferta** → Promoções

## 💡 Dicas

### URLs de Imagens

Use serviços gratuitos de imagens:
- [Unsplash](https://unsplash.com) - Fotos profissionais
- [Pexels](https://pexels.com) - Fotos gratuitas
- [Imgur](https://imgur.com) - Upload de imagens

**Exemplo de URL:**
```
https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300
```

### Preços

- Use valores decimais: `8999.00`
- Não use símbolos: ~~R$ 8.999,00~~
- Use ponto como separador: `8999.00` ✅

### Descrições

Seja claro e objetivo:
```
✅ "Smartphone Apple com chip A17 Pro, câmera de 48MP e tela Super Retina XDR"
❌ "Celular muito bom"
```

## 🔒 Segurança

### Quem pode acessar?

Apenas usuários com `is_admin = TRUE` no banco de dados.

### Tornar outro usuário admin

```sql
UPDATE users SET is_admin = TRUE WHERE email = 'outro@email.com';
```

### Remover admin

```sql
UPDATE users SET is_admin = FALSE WHERE email = 'usuario@email.com';
```

## 🐛 Troubleshooting

### Não consigo fazer login

1. Verifique se executou o SQL no Supabase
2. Confirme as credenciais: `busca@shop.com` / `admin123`
3. Verifique se o backend está rodando

### Erro ao salvar produto

1. Verifique se o backend está rodando
2. Verifique os campos obrigatórios (nome, preço)
3. Veja o console do navegador (F12)

### Produto não aparece na categoria

1. Verifique se a categoria está correta
2. Recarregue a página da categoria
3. Verifique se o produto foi salvo no banco

## 📊 Exemplo de Produto

```json
{
  "name": "iPhone 15 Pro Max 256GB",
  "price": 8999.00,
  "category": "Smartphones",
  "description": "Smartphone Apple com chip A17 Pro, câmera de 48MP e tela Super Retina XDR de 6.7 polegadas",
  "image": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300",
  "rating": 4.8,
  "reviews": 1245,
  "badge": "Mais Vendido"
}
```

## ✅ Checklist

- [ ] Executei o SQL para adicionar `is_admin`
- [ ] Tornei meu usuário admin
- [ ] Reiniciei o backend
- [ ] Fiz logout e login novamente
- [ ] Vejo o link 🔧 Admin no menu
- [ ] Consigo acessar `/admin`
- [ ] Consigo criar produtos
- [ ] Produtos aparecem nas páginas corretas

---

**Painel Admin pronto para uso! 🎉**
