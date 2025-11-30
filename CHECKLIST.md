# ✅ Checklist de Configuração - Busca Shop

Use este checklist para garantir que tudo está configurado corretamente.

## 📋 Pré-requisitos

- [ ] Java 17 ou superior instalado (`java -version`)
- [ ] Maven 3.6+ instalado (`mvn -version`)
- [ ] Node.js 16+ instalado (`node -v`)
- [ ] npm instalado (`npm -v`)
- [ ] Conta no Supabase criada

## 🗄️ Configuração do Supabase

- [ ] Projeto criado no Supabase
- [ ] Script `backend/supabase-init.sql` executado
- [ ] Tabelas criadas verificadas (products, users, orders, order_items)
- [ ] 12 produtos de exemplo inseridos
- [ ] Credenciais de conexão copiadas:
  - [ ] Host (db.xxxxx.supabase.co)
  - [ ] Usuário (postgres)
  - [ ] Senha
  - [ ] Porta (5432)
  - [ ] Database (postgres)

## ⚙️ Configuração do Backend

- [ ] Arquivo `backend/src/main/resources/application.properties` criado
- [ ] URL do banco configurada
- [ ] Usuário configurado
- [ ] Senha configurada
- [ ] Porta 8080 disponível
- [ ] Compilação bem-sucedida (`mvn clean install`)
- [ ] Backend iniciado (`mvn spring-boot:run`)
- [ ] Endpoint testado: http://localhost:8080/api/products

## 🎨 Configuração do Frontend

- [ ] Dependências instaladas (`npm install`)
- [ ] Porta 5173 disponível
- [ ] Frontend iniciado (`npm run dev`)
- [ ] Página abre em http://localhost:5173
- [ ] Produtos carregam da API (não mais dados fake)

## 🧪 Testes de Integração

### Produtos
- [ ] Listar produtos funciona
- [ ] Detalhes do produto funciona
- [ ] Filtros por categoria funcionam
- [ ] Filtros por badge funcionam
- [ ] Busca de produtos funciona

### Usuários
- [ ] Cadastro de usuário funciona
- [ ] Login de usuário funciona
- [ ] Dados do usuário são salvos no banco

### Carrinho
- [ ] Adicionar produto ao carrinho funciona
- [ ] Remover produto do carrinho funciona
- [ ] Atualizar quantidade funciona

## 🔍 Verificações Finais

### Backend
- [ ] Console não mostra erros
- [ ] Logs do Hibernate aparecem
- [ ] Conexão com banco estabelecida
- [ ] Endpoints respondem corretamente

### Frontend
- [ ] Console do navegador sem erros (F12)
- [ ] Produtos carregam da API
- [ ] Imagens dos produtos aparecem
- [ ] Navegação entre páginas funciona
- [ ] Loading states aparecem

### Banco de Dados
- [ ] Produtos aparecem na tabela
- [ ] Usuários são salvos ao cadastrar
- [ ] Pedidos são criados corretamente

## 🐛 Troubleshooting

Se algo não funcionar, verifique:

### Backend não inicia
- [ ] Java instalado corretamente
- [ ] Maven instalado corretamente
- [ ] Credenciais do Supabase corretas
- [ ] Porta 8080 não está em uso
- [ ] Firewall não está bloqueando

### Frontend não carrega produtos
- [ ] Backend está rodando
- [ ] URL da API está correta em `src/services/api.js`
- [ ] CORS configurado corretamente
- [ ] Console do navegador mostra os erros

### Erro de conexão com banco
- [ ] Credenciais corretas
- [ ] IP liberado no Supabase
- [ ] Banco de dados criado
- [ ] Tabelas existem

## 📞 Comandos Úteis

### Backend
```bash
# Compilar
cd backend
mvn clean install

# Executar
mvn spring-boot:run

# Testar API
curl http://localhost:8080/api/products
```

### Frontend
```bash
# Instalar
npm install

# Executar
npm run dev

# Build
npm run build
```

### Supabase
```sql
-- Ver produtos
SELECT * FROM products;

-- Ver usuários
SELECT * FROM users;

-- Ver pedidos
SELECT * FROM orders;
```

## ✅ Tudo Pronto!

Se todos os itens estão marcados, seu projeto está 100% configurado e funcionando! 🎉

Próximos passos:
1. Desenvolver novas funcionalidades
2. Implementar segurança (JWT, BCrypt)
3. Adicionar testes automatizados
4. Preparar para deploy
