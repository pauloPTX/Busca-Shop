# 📁 Estrutura Completa do Projeto - Busca Shop

## 🌳 Árvore de Diretórios

```
Busca-Shop-main/
│
├── 📄 README.md                          # Documentação principal
├── 📄 SETUP.md                           # Guia de configuração
├── 📄 CHECKLIST.md                       # Checklist de verificação
├── 📄 RESUMO-IMPLEMENTACAO.md            # Resumo da implementação
├── 📄 ESTRUTURA-PROJETO.md               # Este arquivo
├── 📄 .env.example                       # Exemplo de variáveis de ambiente
├── 📄 .gitignore                         # Arquivos ignorados pelo Git
├── 📄 package.json                       # Dependências do frontend
├── 📄 package-lock.json                  # Lock de dependências
├── 📄 vite.config.js                     # Configuração do Vite
├── 📄 eslint.config.js                   # Configuração do ESLint
├── 📄 index.html                         # HTML principal
├── 🔧 start-backend.bat                  # Script para iniciar backend
├── 🔧 start-frontend.bat                 # Script para iniciar frontend
│
├── 📂 backend/                           # ⭐ BACKEND SPRING BOOT
│   ├── 📄 README.md                      # Documentação do backend
│   ├── 📄 API-TESTS.md                   # Testes da API
│   ├── 📄 SUPABASE-GUIDE.md              # Guia do Supabase
│   ├── 📄 pom.xml                        # Dependências Maven
│   ├── 📄 .gitignore                     # Ignorar arquivos do backend
│   ├── 📄 mvnw.cmd                       # Maven Wrapper (Windows)
│   ├── 📄 supabase-init.sql              # Script de inicialização do BD
│   ├── 📄 queries-uteis.sql              # Queries SQL úteis
│   │
│   └── 📂 src/
│       ├── 📂 main/
│       │   ├── 📂 java/com/buscashop/
│       │   │   ├── 📄 BuscaShopApplication.java    # Classe principal
│       │   │   │
│       │   │   ├── 📂 config/
│       │   │   │   └── 📄 CorsConfig.java          # Configuração CORS
│       │   │   │
│       │   │   ├── 📂 model/                       # Entidades JPA
│       │   │   │   ├── 📄 Product.java             # Entidade Produto
│       │   │   │   ├── 📄 User.java                # Entidade Usuário
│       │   │   │   ├── 📄 Order.java               # Entidade Pedido
│       │   │   │   └── 📄 OrderItem.java           # Entidade Item do Pedido
│       │   │   │
│       │   │   ├── 📂 repository/                  # Repositórios JPA
│       │   │   │   ├── 📄 ProductRepository.java   # Repo de Produtos
│       │   │   │   ├── 📄 UserRepository.java      # Repo de Usuários
│       │   │   │   └── 📄 OrderRepository.java     # Repo de Pedidos
│       │   │   │
│       │   │   ├── 📂 service/                     # Lógica de negócio
│       │   │   │   ├── 📄 ProductService.java      # Serviço de Produtos
│       │   │   │   ├── 📄 UserService.java         # Serviço de Usuários
│       │   │   │   └── 📄 OrderService.java        # Serviço de Pedidos
│       │   │   │
│       │   │   ├── 📂 controller/                  # Controllers REST
│       │   │   │   ├── 📄 ProductController.java   # API de Produtos
│       │   │   │   ├── 📄 UserController.java      # API de Usuários
│       │   │   │   └── 📄 OrderController.java     # API de Pedidos
│       │   │   │
│       │   │   └── 📂 dto/                         # Data Transfer Objects
│       │   │
│       │   └── 📂 resources/
│       │       ├── 📄 application.properties        # Configuração principal
│       │       └── 📄 application-example.properties # Exemplo de config
│       │
│       └── 📂 test/
│           └── 📂 java/                            # Testes unitários
│
├── 📂 src/                               # ⭐ FRONTEND REACT
│   ├── 📄 main.jsx                       # Ponto de entrada
│   ├── 📄 App.jsx                        # Componente principal
│   ├── 📄 App.css                        # Estilos do App
│   ├── 📄 index.css                      # Estilos globais
│   │
│   ├── 📂 assets/                        # Recursos estáticos
│   │   └── 🖼️ react.svg
│   │
│   ├── 📂 Components/                    # Componentes reutilizáveis
│   │   ├── 📄 Header.jsx                 # Cabeçalho
│   │   ├── 📄 Header.css
│   │   ├── 📄 Footer.jsx                 # Rodapé
│   │   └── 📄 Footer.css
│   │
│   ├── 📂 Pages/                         # Páginas da aplicação
│   │   ├── 📄 Home.jsx                   # Página inicial ✅ Integrado
│   │   ├── 📄 Login.jsx                  # Login ✅ Integrado
│   │   ├── 📄 Cadastro.jsx               # Cadastro ✅ Integrado
│   │   ├── 📄 Carrinho.jsx               # Carrinho de compras
│   │   ├── 📄 Carrinho.css
│   │   ├── 📄 ProdutoDetalhes.jsx        # Detalhes ✅ Integrado
│   │   ├── 📄 ProdutoDetalhes.css
│   │   ├── 📄 Suporte.jsx                # Suporte
│   │   ├── 📄 Suporte.css
│   │   ├── 📄 Auth.css                   # Estilos de autenticação
│   │   │
│   │   ├── 📂 Area_usuario/              # Área do usuário
│   │   │   └── ...
│   │   │
│   │   └── 📂 Categorias/                # Páginas de categorias
│   │       └── ...
│   │
│   ├── 📂 Styles/                        # Estilos adicionais
│   │   └── 📄 Home.css
│   │
│   ├── 📂 context/                       # Context API
│   │   ├── 📄 AuthContext.jsx            # Contexto de autenticação
│   │   └── 📄 CartContext.jsx            # Contexto do carrinho
│   │
│   ├── 📂 services/                      # ⭐ NOVO: Serviços
│   │   └── 📄 api.js                     # Integração com backend
│   │
│   └── 📂 data/                          # Dados (agora vazio)
│       └── 📄 products.js                # ❌ Dados fake removidos
│
└── 📂 public/                            # Arquivos públicos
    └── 🖼️ vite.svg

```

## 📊 Estatísticas do Projeto

### Backend
- **Linguagem**: Java 17
- **Framework**: Spring Boot 3.2.0
- **Arquivos Java**: 13
- **Endpoints**: 15+
- **Tabelas**: 4
- **Linhas de código**: ~1000

### Frontend
- **Linguagem**: JavaScript (React)
- **Framework**: React 19 + Vite
- **Componentes**: 10+
- **Páginas**: 8+
- **Linhas de código**: ~2000

### Documentação
- **Arquivos MD**: 8
- **Guias**: 5
- **Scripts**: 2
- **Exemplos SQL**: 2

## 🎯 Arquivos Principais

### Backend (Spring Boot)

| Arquivo | Descrição | Linhas |
|---------|-----------|--------|
| `BuscaShopApplication.java` | Classe principal | 10 |
| `ProductController.java` | API de produtos | 60 |
| `ProductService.java` | Lógica de produtos | 50 |
| `Product.java` | Entidade produto | 30 |
| `application.properties` | Configuração | 20 |
| `supabase-init.sql` | Script do banco | 100 |

### Frontend (React)

| Arquivo | Descrição | Linhas |
|---------|-----------|--------|
| `api.js` | Integração com API | 80 |
| `Home.jsx` | Página inicial | 150 |
| `ProdutoDetalhes.jsx` | Detalhes do produto | 120 |
| `Login.jsx` | Página de login | 60 |
| `Cadastro.jsx` | Página de cadastro | 70 |
| `CartContext.jsx` | Contexto do carrinho | 80 |

## 🔗 Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Home.jsx ──────┐                                           │
│  Login.jsx ─────┤                                           │
│  Cadastro.jsx ──┼──► api.js ──► fetch() ──► HTTP Request   │
│  Detalhes.jsx ──┤                                           │
│  Carrinho.jsx ──┘                                           │
│                                                              │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND (Spring Boot)                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Controller ──► Service ──► Repository ──► JPA/Hibernate    │
│                                                              │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE (Supabase/PostgreSQL)             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  products  │  users  │  orders  │  order_items              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Comandos Rápidos

### Desenvolvimento

```bash
# Backend
cd backend
mvn spring-boot:run

# Frontend
npm run dev

# Ambos (em terminais separados)
start-backend.bat
start-frontend.bat
```

### Build

```bash
# Backend
cd backend
mvn clean package

# Frontend
npm run build
```

### Testes

```bash
# Backend
cd backend
mvn test

# Frontend
npm run test
```

## 📦 Dependências

### Backend (pom.xml)
- spring-boot-starter-web
- spring-boot-starter-data-jpa
- postgresql
- lombok
- spring-boot-starter-validation

### Frontend (package.json)
- react
- react-dom
- react-router-dom
- vite

## 🎨 Padrões de Código

### Backend
- **Arquitetura**: MVC (Model-View-Controller)
- **Padrão**: Repository Pattern
- **Convenção**: CamelCase para classes, camelCase para métodos
- **Anotações**: Spring Boot (@RestController, @Service, @Repository)

### Frontend
- **Arquitetura**: Component-based
- **Padrão**: Context API para estado global
- **Convenção**: PascalCase para componentes, camelCase para funções
- **Hooks**: useState, useEffect, useContext

## ✅ Status de Implementação

### Backend
- ✅ Estrutura completa
- ✅ CRUD de produtos
- ✅ Autenticação básica
- ✅ Sistema de pedidos
- ✅ Integração com Supabase
- ⬜ JWT (próximo passo)
- ⬜ Testes unitários

### Frontend
- ✅ Integração com API
- ✅ Páginas principais
- ✅ Carrinho de compras
- ✅ Autenticação
- ⬜ Painel admin
- ⬜ Testes E2E

### Banco de Dados
- ✅ Tabelas criadas
- ✅ Relacionamentos
- ✅ Dados de exemplo
- ✅ Índices básicos
- ⬜ Stored procedures
- ⬜ Triggers

## 🎯 Próximos Passos

1. **Segurança**: Implementar JWT e BCrypt
2. **Validações**: Adicionar validações robustas
3. **Testes**: Criar testes automatizados
4. **Admin**: Desenvolver painel administrativo
5. **Deploy**: Preparar para produção
6. **Performance**: Otimizar queries e cache

---

**Projeto completo e funcional! 🚀**
