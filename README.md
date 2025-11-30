# 🛒 Busca Shop - E-commerce Completo

E-commerce moderno desenvolvido com React + Vite no frontend e Spring Boot + Supabase no backend.

## 🚀 Tecnologias

### Frontend
- React 19
- Vite
- React Router DOM
- Context API

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- PostgreSQL (Supabase)
- Maven

## 📦 Estrutura do Projeto

```
Busca-Shop-main/
├── backend/              # Backend Spring Boot
│   ├── src/
│   ├── pom.xml
│   └── supabase-init.sql
├── src/                  # Frontend React
│   ├── Pages/
│   ├── Components/
│   ├── context/
│   └── services/
└── package.json
```

## 🔧 Instalação e Configuração

### Guia Completo

Veja o arquivo [SETUP.md](SETUP.md) para instruções detalhadas de configuração.

### Resumo Rápido

1. **Configure o Supabase**
   - Crie um projeto em [supabase.com](https://supabase.com)
   - Execute o script `backend/supabase-init.sql`

2. **Configure o Backend**
   ```bash
   cd backend
   # Edite src/main/resources/application.properties com suas credenciais
   mvn spring-boot:run
   ```

3. **Execute o Frontend**
   ```bash
   npm install
   npm run dev
   ```

## 🌐 Endpoints da API

- `GET /api/products` - Listar produtos
- `GET /api/products/{id}` - Detalhes do produto
- `POST /api/users/register` - Cadastro
- `POST /api/users/login` - Login
- `POST /api/orders` - Criar pedido

Veja documentação completa em [backend/README.md](backend/README.md)

## ✨ Funcionalidades

- ✅ Catálogo de produtos
- ✅ Carrinho de compras
- ✅ Sistema de autenticação
- ✅ Filtros por categoria e badge
- ✅ Busca de produtos
- ✅ Detalhes do produto
- ✅ Sistema de pedidos
- ✅ Área do usuário

## 🔐 Segurança

⚠️ **Projeto em desenvolvimento**: Implemente autenticação JWT e criptografia de senhas para produção.

## 📝 Licença

MIT
