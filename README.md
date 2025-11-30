# 🛠️ Tecnologias Utilizadas - Busca Shop

## 📊 Stack Completo

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                            │
│  React 19 + Vite + React Router + Context API           │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/REST
┌────────────────────▼────────────────────────────────────┐
│                      BACKEND                             │
│  Spring Boot 3.2 + Spring Data JPA + PostgreSQL Driver  │
└────────────────────┬────────────────────────────────────┘
                     │ JDBC
┌────────────────────▼────────────────────────────────────┐
│                     DATABASE                             │
│         Supabase (PostgreSQL 15)                         │
└─────────────────────────────────────────────────────────┘
```

## 🎨 Frontend

### React 19.2.0
**O que é**: Biblioteca JavaScript para construir interfaces de usuário

**Por que usamos**:
- ✅ Component-based architecture
- ✅ Virtual DOM para performance
- ✅ Ecossistema rico
- ✅ Fácil de aprender

**Onde usamos**:
- Todos os componentes da UI
- Gerenciamento de estado
- Renderização dinâmica

### Vite 7.2.5
**O que é**: Build tool e dev server ultra-rápido

**Por que usamos**:
- ⚡ Hot Module Replacement (HMR) instantâneo
- 🚀 Build otimizado
- 📦 Menor bundle size
- 🔧 Configuração simples

**Benefícios**:
- Desenvolvimento mais rápido
- Builds de produção otimizados
- Suporte nativo a ES modules

### React Router DOM 7.9.6
**O que é**: Biblioteca de roteamento para React

**Por que usamos**:
- 🔀 Navegação entre páginas
- 📍 URLs dinâmicas
- 🔙 Histórico de navegação
- 🎯 Rotas protegidas

**Onde usamos**:
```javascript
<Route path="/" element={<Home />} />
<Route path="/produto/:id" element={<ProdutoDetalhes />} />
<Route path="/login" element={<Login />} />
```

### Context API
**O que é**: Sistema de gerenciamento de estado do React

**Por que usamos**:
- 🔄 Estado global sem Redux
- 🎯 Simples e nativo
- 📦 Sem dependências extras

**Onde usamos**:
- `AuthContext`: Autenticação do usuário
- `CartContext`: Carrinho de compras

## ⚙️ Backend

### Spring Boot 3.2.0
**O que é**: Framework Java para criar aplicações enterprise

**Por que usamos**:
- 🚀 Configuração automática
- 📦 Embedded server (Tomcat)
- 🔧 Produção-ready
- 🏢 Padrão da indústria

**Módulos usados**:
- `spring-boot-starter-web`: REST APIs
- `spring-boot-starter-data-jpa`: Persistência
- `spring-boot-starter-validation`: Validações

### Spring Data JPA
**O que é**: Abstração sobre JPA/Hibernate

**Por que usamos**:
- 🗄️ ORM (Object-Relational Mapping)
- 📝 Queries automáticas
- 🔄 Relacionamentos entre entidades
- 💾 Transações gerenciadas

**Exemplo**:
```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
}
```

### Hibernate
**O que é**: ORM framework (usado pelo Spring Data JPA)

**Por que usamos**:
- 🔄 Mapeia objetos Java para tabelas SQL
- 📊 Gerencia relacionamentos
- ⚡ Cache de segundo nível
- 🔍 HQL (Hibernate Query Language)

### PostgreSQL Driver
**O que é**: Driver JDBC para PostgreSQL

**Por que usamos**:
- 🔌 Conecta Java ao PostgreSQL
- 📡 Executa queries SQL
- 🔒 Conexões seguras

### Lombok
**O que é**: Biblioteca que reduz boilerplate code

**Por que usamos**:
- ✂️ Menos código
- 🎯 Mais legível
- 🔧 Getters/Setters automáticos

**Exemplo**:
```java
@Data  // Gera getters, setters, toString, equals, hashCode
@Entity
public class Product {
    private Long id;
    private String name;
}
```

### Maven
**O que é**: Gerenciador de dependências e build tool

**Por que usamos**:
- 📦 Gerencia bibliotecas
- 🔨 Compila o projeto
- 🧪 Executa testes
- 📤 Cria JARs executáveis

## 🗄️ Banco de Dados

### Supabase
**O que é**: Backend-as-a-Service (alternativa ao Firebase)

**Por que usamos**:
- 🆓 Plano gratuito generoso
- 🗄️ PostgreSQL real
- 🔐 Autenticação integrada
- 📊 Dashboard visual
- 🌐 API auto-gerada

**Recursos usados**:
- PostgreSQL Database
- SQL Editor
- Table Editor
- Connection Pooling

### PostgreSQL 15
**O que é**: Banco de dados relacional open-source

**Por que usamos**:
- 💪 Robusto e confiável
- 🔄 ACID compliant
- 📊 Suporte a JSON
- 🔍 Full-text search
- 🏢 Usado em produção

**Features usadas**:
- Tabelas relacionadas
- Foreign keys
- Índices
- Sequences (auto-increment)

## 🔧 Ferramentas de Desenvolvimento

### Git
**O que é**: Sistema de controle de versão

**Por que usamos**:
- 📝 Histórico de mudanças
- 🔀 Branches para features
- 👥 Colaboração em equipe

### VS Code / IntelliJ IDEA
**O que é**: IDEs para desenvolvimento

**Por que usamos**:
- 🎨 Syntax highlighting
- 🔍 IntelliSense
- 🐛 Debugging
- 🔌 Extensões

### Postman / curl
**O que é**: Ferramentas para testar APIs

**Por que usamos**:
- 🧪 Testar endpoints
- 📝 Documentar API
- 🔍 Debug de requests

## 📦 Dependências Completas

### Frontend (package.json)
```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.9.6"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "vite": "npm:rolldown-vite@7.2.5"
  }
}
```

### Backend (pom.xml)
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

## 🎯 Padrões e Arquiteturas

### Frontend
- **Padrão**: Component-based architecture
- **Estado**: Context API
- **Roteamento**: React Router
- **Estilo**: CSS Modules

### Backend
- **Arquitetura**: MVC (Model-View-Controller)
- **Padrão**: Repository Pattern
- **API**: RESTful
- **Persistência**: JPA/Hibernate

### Banco de Dados
- **Modelo**: Relacional
- **Normalização**: 3NF
- **Relacionamentos**: One-to-Many, Many-to-One

## 🔐 Segurança (A Implementar)

### Recomendações para Produção:
- 🔑 **JWT**: JSON Web Tokens para autenticação
- 🔒 **BCrypt**: Hash de senhas
- 🛡️ **CORS**: Configurado corretamente
- 🔐 **HTTPS**: SSL/TLS
- 🚫 **Rate Limiting**: Prevenir abuso
- 📝 **Validações**: Input sanitization

## 📈 Performance

### Frontend
- ⚡ Vite para builds rápidos
- 🎯 Code splitting
- 📦 Tree shaking
- 🖼️ Lazy loading de imagens

### Backend
- 💾 Connection pooling (HikariCP)
- 📊 Query optimization
- 🔄 Caching (a implementar)
- 📈 Índices no banco

## 🧪 Testes (A Implementar)

### Frontend
- Jest + React Testing Library
- Cypress para E2E

### Backend
- JUnit 5
- Mockito
- Spring Boot Test

## 📚 Recursos de Aprendizado

### React
- [Documentação Oficial](https://react.dev)
- [React Router](https://reactrouter.com)

### Spring Boot
- [Spring Guides](https://spring.io/guides)
- [Baeldung](https://www.baeldung.com/spring-boot)

### PostgreSQL
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com)
- [Supabase Docs](https://supabase.com/docs)

## 🎓 Conceitos Aplicados

- ✅ REST API
- ✅ CRUD Operations
- ✅ ORM (Object-Relational Mapping)
- ✅ SPA (Single Page Application)
- ✅ Component-based UI
- ✅ State Management
- ✅ Routing
- ✅ Database Relations
- ✅ MVC Architecture
- ✅ Repository Pattern

---

**Stack moderna e escalável! 🚀**
