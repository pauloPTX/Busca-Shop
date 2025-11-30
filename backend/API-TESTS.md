# 🧪 Testes da API - Busca Shop

## Testando Endpoints com curl

### Produtos

#### Listar todos os produtos
```bash
curl http://localhost:8080/api/products
```

#### Buscar produto por ID
```bash
curl http://localhost:8080/api/products/1
```

#### Buscar por categoria
```bash
curl http://localhost:8080/api/products/category/Eletrônicos
```

#### Buscar por badge
```bash
curl "http://localhost:8080/api/products/badge/Mais%20Vendido"
```

#### Buscar produtos (search)
```bash
curl "http://localhost:8080/api/products/search?q=iphone"
```

#### Criar novo produto
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Teste Produto\",\"price\":999.99,\"category\":\"Eletrônicos\",\"description\":\"Produto de teste\",\"rating\":4.5,\"reviews\":100}"
```

#### Atualizar produto
```bash
curl -X PUT http://localhost:8080/api/products/1 \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"iPhone Atualizado\",\"price\":7999.99,\"category\":\"Eletrônicos\"}"
```

#### Deletar produto
```bash
curl -X DELETE http://localhost:8080/api/products/1
```

### Usuários

#### Registrar novo usuário
```bash
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"João Silva\",\"email\":\"joao@email.com\",\"password\":\"senha123\"}"
```

#### Login
```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"joao@email.com\",\"password\":\"senha123\"}"
```

#### Buscar usuário por ID
```bash
curl http://localhost:8080/api/users/1
```

#### Atualizar usuário
```bash
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"João Silva Atualizado\",\"email\":\"joao@email.com\",\"phone\":\"11999999999\"}"
```

### Pedidos

#### Criar pedido
```bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d "{\"user\":{\"id\":1},\"total\":8999.00,\"status\":\"PENDING\",\"items\":[{\"product\":{\"id\":1},\"quantity\":1,\"price\":8999.00}]}"
```

#### Buscar pedido por ID
```bash
curl http://localhost:8080/api/orders/1
```

#### Buscar pedidos de um usuário
```bash
curl http://localhost:8080/api/orders/user/1
```

#### Atualizar status do pedido
```bash
curl -X PATCH http://localhost:8080/api/orders/1/status \
  -H "Content-Type: application/json" \
  -d "{\"status\":\"CONFIRMED\"}"
```

## Testando no Navegador

Você também pode testar os endpoints GET diretamente no navegador:

- http://localhost:8080/api/products
- http://localhost:8080/api/products/1
- http://localhost:8080/api/products/category/Eletrônicos

## Testando com Postman

1. Importe a coleção de endpoints
2. Configure a variável `baseUrl` como `http://localhost:8080/api`
3. Execute os testes

## Códigos de Status HTTP

- `200 OK` - Sucesso
- `201 Created` - Recurso criado
- `204 No Content` - Sucesso sem conteúdo
- `400 Bad Request` - Erro na requisição
- `404 Not Found` - Recurso não encontrado
- `500 Internal Server Error` - Erro no servidor

## Exemplos de Resposta

### Produto
```json
{
  "id": 1,
  "name": "iPhone 15 Pro Max 256GB",
  "price": 8999.00,
  "category": "Eletrônicos",
  "description": "Smartphone Apple...",
  "image": "https://...",
  "rating": 4.8,
  "reviews": 1245,
  "badge": "Mais Vendido"
}
```

### Usuário
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "11999999999",
  "address": "Rua Exemplo, 123",
  "createdAt": "2024-01-15T10:30:00"
}
```

### Pedido
```json
{
  "id": 1,
  "user": {
    "id": 1,
    "name": "João Silva"
  },
  "total": 8999.00,
  "status": "PENDING",
  "createdAt": "2024-01-15T14:20:00",
  "items": [
    {
      "id": 1,
      "product": {
        "id": 1,
        "name": "iPhone 15 Pro Max"
      },
      "quantity": 1,
      "price": 8999.00
    }
  ]
}
```
