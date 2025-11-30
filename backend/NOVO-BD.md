# 🔄 Backend Configurado para Criar Tabelas Automaticamente

## Configuração Atual:

```properties
spring.jpa.hibernate.ddl-auto=create
```

## O que acontece:

Quando você iniciar o backend, ele vai:
1. **APAGAR** todas as tabelas existentes
2. **CRIAR** todas as tabelas do zero com base nas entidades Java
3. Coluna `image` já será criada como TEXT automaticamente

## Para trocar de banco de dados:

1. Edite `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://SEU_HOST:5432/SEU_DATABASE
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA
```

2. Reinicie o backend:
```bash
cd backend
mvn spring-boot:run
```

3. As tabelas serão criadas automaticamente! ✅

## Tabelas que serão criadas:

- ✅ products (com image como TEXT)
- ✅ users
- ✅ orders
- ✅ order_items
- ✅ admins

## ⚠️ IMPORTANTE:

- `create` apaga os dados toda vez que reinicia
- Para produção, mude para `update` depois de criar as tabelas
- Dados de exemplo precisam ser inseridos manualmente
