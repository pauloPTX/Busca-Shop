# Busca Shop Backend - Spring Boot

Backend completo para o e-commerce Busca Shop desenvolvido com Spring Boot e PostgreSQL (Supabase).

## 🚀 Tecnologias

- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- PostgreSQL (Supabase)
- Maven
- Lombok

## 📋 Pré-requisitos

- Java 17 ou superior
- Maven 3.6+
- Conta no Supabase

## 🔧 Configuração

### 1. Configurar Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Crie um novo projeto
3. Vá em Settings > Database e copie as credenciais de conexão
4. Execute o script `supabase-init.sql` no SQL Editor do Supabase

### 2. Configurar application.properties

Edite o arquivo `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://db.xxxxx.supabase.co:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=sua_senha_aqui
```

### 3. Executar o projeto

```bash
# Compilar
mvn clean install

# Executar
mvn spring-boot:run
```

O servidor estará disponível em: `http://localhost:8080/api`

## 📡 Endpoints da API

### Produtos

- `GET /api/products` - Listar todos os produtos
- `GET /api/products/{id}` - Buscar produto por ID
- `GET /api/products/category/{category}` - Buscar por categoria
- `GET /api/products/badge/{badge}` - Buscar por badge (Mais Vendido, Novidade, Oferta)
- `GET /api/products/search?q={query}` - Buscar produtos por nome
- `POST /api/products` - Criar novo produto
- `PUT /api/products/{id}` - Atualizar produto
- `DELETE /api/products/{id}` - Deletar produto

### Usuários

- `POST /api/users/register` - Registrar novo usuário
- `POST /api/users/login` - Login de usuário
- `GET /api/users/{id}` - Buscar usuário por ID
- `PUT /api/users/{id}` - Atualizar usuário

### Pedidos

- `POST /api/orders` - Criar novo pedido
- `GET /api/orders/{id}` - Buscar pedido por ID
- `GET /api/orders/user/{userId}` - Buscar pedidos de um usuário
- `PATCH /api/orders/{id}/status` - Atualizar status do pedido

## 🗄️ Estrutura do Banco de Dados

### Tabelas

- **products** - Produtos da loja
- **users** - Usuários cadastrados
- **orders** - Pedidos realizados
- **order_items** - Itens dos pedidos

## 🔐 Segurança

⚠️ **IMPORTANTE**: Este é um projeto de demonstração. Para produção, implemente:

- Autenticação JWT
- Criptografia de senhas (BCrypt)
- Validação de dados
- Rate limiting
- HTTPS

## 📦 Build para Produção

```bash
mvn clean package
java -jar target/busca-shop-backend-1.0.0.jar
```
