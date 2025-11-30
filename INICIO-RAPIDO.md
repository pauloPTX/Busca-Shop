# ⚡ Início Rápido - Busca Shop

## 🚀 3 Passos para Rodar o Projeto

### 1️⃣ Configure o Supabase (5 minutos)

```
1. Acesse: https://supabase.com
2. Crie conta (GitHub/Google/Email)
3. Clique em "New Project"
4. Preencha:
   - Nome: busca-shop
   - Senha: [ANOTE A SENHA!]
   - Região: South America
5. Aguarde 2 minutos
6. Vá em SQL Editor
7. Copie e cole: backend/supabase-init.sql
8. Clique em RUN
9. Vá em Settings > Database
10. Copie as credenciais
```

### 2️⃣ Configure o Backend (2 minutos)

```bash
# 1. Edite o arquivo de configuração
backend/src/main/resources/application.properties

# 2. Cole suas credenciais do Supabase:
spring.datasource.url=jdbc:postgresql://db.xxxxx.supabase.co:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=SUA_SENHA_AQUI

# 3. Execute o backend
cd backend
mvn spring-boot:run
```

**OU use o script:**
```bash
start-backend.bat
```

### 3️⃣ Execute o Frontend (1 minuto)

```bash
# 1. Instale dependências
npm install

# 2. Execute
npm run dev
```

**OU use o script:**
```bash
start-frontend.bat
```

## ✅ Pronto!

- 🌐 Frontend: http://localhost:5173
- 🔌 Backend: http://localhost:8080/api
- 📦 Produtos: http://localhost:8080/api/products

---

## 🆘 Problemas?

### Backend não inicia
```bash
# Verifique Java
java -version

# Deve mostrar: Java 17 ou superior
# Se não tiver, instale: https://adoptium.net/
```

### Frontend não carrega produtos
```bash
# 1. Verifique se backend está rodando
curl http://localhost:8080/api/products

# 2. Abra Console do navegador (F12)
# 3. Veja os erros
```

### Erro de conexão com banco
```
1. Verifique credenciais em application.properties
2. Teste no Supabase SQL Editor: SELECT * FROM products;
3. Confirme que as tabelas foram criadas
```

---

## 📚 Documentação Completa

- 📖 [SETUP.md](SETUP.md) - Guia detalhado
- ✅ [CHECKLIST.md](CHECKLIST.md) - Lista de verificação
- 🗄️ [SUPABASE-GUIDE.md](backend/SUPABASE-GUIDE.md) - Guia do Supabase
- 🧪 [API-TESTS.md](backend/API-TESTS.md) - Testar API
- 📁 [ESTRUTURA-PROJETO.md](ESTRUTURA-PROJETO.md) - Estrutura completa

---

## 🎯 Comandos Essenciais

### Backend
```bash
# Compilar
mvn clean install

# Executar
mvn spring-boot:run

# Testar
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

-- Adicionar produto
INSERT INTO products (name, price, category) 
VALUES ('Teste', 99.99, 'Eletrônicos');
```

---

## 🎉 Tudo Funcionando?

Se você conseguiu:
- ✅ Ver produtos na página inicial
- ✅ Clicar em um produto e ver detalhes
- ✅ Adicionar produto ao carrinho
- ✅ Fazer cadastro/login

**Parabéns! Seu projeto está 100% funcional! 🚀**

### Próximos Passos:
1. Explore o código
2. Adicione novos produtos no Supabase
3. Customize o design
4. Implemente novas funcionalidades

---

## 💡 Dicas

### Desenvolvimento
- Use 2 terminais: um para backend, outro para frontend
- Mantenha o Console do navegador aberto (F12)
- Verifique logs do backend no terminal

### Supabase
- Acesse Table Editor para ver dados
- Use SQL Editor para queries rápidas
- Monitore uso em Reports

### Debugging
- Backend: Veja logs no terminal
- Frontend: Console do navegador (F12)
- Banco: SQL Editor do Supabase

---

**Boa codificação! 💻✨**
