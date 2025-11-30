# 🔄 Como Trocar para Conta do Supabase do Colega

## 1. Pegue as credenciais do Supabase do seu colega:

No projeto Supabase dele, vá em:
**Settings → Database → Connection String**

Você vai precisar de:
- **Host**: `db.XXXXXXXX.supabase.co`
- **Database**: `postgres`
- **User**: `postgres`
- **Password**: A senha do projeto dele

## 2. Edite o arquivo:

`backend/src/main/resources/application.properties`

```properties
# Supabase Database Configuration
spring.datasource.url=jdbc:postgresql://db.XXXXXXXX.supabase.co:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=SENHA_DO_COLEGA
```

## 3. Reinicie o backend:

```bash
cd backend
mvn spring-boot:run
```

## 4. O que vai acontecer:

✅ Backend conecta no Supabase do colega
✅ Cria todas as tabelas automaticamente (products, users, orders, admins)
✅ Coluna `image` já será TEXT (suporta Base64)

## 5. Criar admin inicial:

Execute no SQL Editor do Supabase do colega:

```sql
INSERT INTO admins (name, email, password, created_at) 
VALUES ('Admin', 'busca@shop.com', 'admin123', NOW());
```

Pronto! Tudo funcionando no banco do colega! 🎉
