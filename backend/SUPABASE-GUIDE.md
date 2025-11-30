# 🚀 Guia Completo do Supabase - Busca Shop

## O que é Supabase?

Supabase é uma alternativa open-source ao Firebase, oferecendo:
- 🗄️ Banco de dados PostgreSQL
- 🔐 Autenticação
- 📦 Storage de arquivos
- 🔄 Realtime subscriptions
- 🆓 Plano gratuito generoso

## 📝 Passo a Passo Detalhado

### 1. Criar Conta

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com GitHub, Google ou Email

### 2. Criar Projeto

1. No dashboard, clique em "New Project"
2. Preencha:
   - **Name**: `busca-shop` (ou nome de sua preferência)
   - **Database Password**: Crie uma senha forte (ANOTE!)
   - **Region**: Escolha `South America (São Paulo)` para melhor performance
   - **Pricing Plan**: Free (500MB database, 1GB file storage)
3. Clique em "Create new project"
4. Aguarde 1-2 minutos para o projeto ser criado

### 3. Executar Script SQL

1. No menu lateral, clique em **SQL Editor**
2. Clique em **New Query**
3. Abra o arquivo `supabase-init.sql` deste projeto
4. Copie TODO o conteúdo
5. Cole no editor SQL do Supabase
6. Clique em **Run** (ou pressione Ctrl+Enter)
7. Aguarde a mensagem de sucesso

### 4. Verificar Tabelas

1. No menu lateral, clique em **Table Editor**
2. Você deve ver 4 tabelas:
   - ✅ `products` (12 produtos)
   - ✅ `users` (vazia)
   - ✅ `orders` (vazia)
   - ✅ `order_items` (vazia)

### 5. Obter Credenciais

#### Opção 1: Connection String (Recomendado)

1. Vá em **Settings** (ícone de engrenagem)
2. Clique em **Database**
3. Role até **Connection String**
4. Selecione **URI**
5. Copie a string (formato: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`)
6. Substitua `[YOUR-PASSWORD]` pela senha que você criou

#### Opção 2: Credenciais Individuais

1. Vá em **Settings** > **Database**
2. Em **Connection Info**, copie:
   - **Host**: `db.xxxxxxxxxxxxx.supabase.co`
   - **Database name**: `postgres`
   - **Port**: `5432`
   - **User**: `postgres`
   - **Password**: A senha que você criou

### 6. Configurar application.properties

Edite `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://db.xxxxxxxxxxxxx.supabase.co:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=SUA_SENHA_AQUI
```

**Exemplo real:**
```properties
spring.datasource.url=jdbc:postgresql://db.abcdefghijklmnop.supabase.co:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=MinhaSenh@Forte123
```

## 🔒 Segurança

### Configurar Acesso ao Banco

Por padrão, o Supabase permite conexões de qualquer IP. Para produção:

1. Vá em **Settings** > **Database**
2. Role até **Connection Pooling**
3. Configure **SSL Mode**: `require`
4. Em **Network Restrictions**, adicione IPs permitidos

### Boas Práticas

- ✅ Use senhas fortes
- ✅ Nunca commite credenciais no Git
- ✅ Use variáveis de ambiente em produção
- ✅ Ative SSL em produção
- ✅ Configure backups automáticos

## 📊 Monitoramento

### Ver Logs

1. Vá em **Logs** no menu lateral
2. Selecione **Postgres Logs**
3. Veja queries executadas em tempo real

### Métricas

1. Vá em **Reports**
2. Veja:
   - Uso de CPU
   - Uso de memória
   - Número de conexões
   - Tamanho do banco

## 🛠️ Ferramentas Úteis

### SQL Editor

Execute queries diretamente:
```sql
-- Ver todos os produtos
SELECT * FROM products;

-- Adicionar produto
INSERT INTO products (name, price, category) 
VALUES ('Novo Produto', 999.00, 'Eletrônicos');

-- Atualizar preço
UPDATE products SET price = 899.00 WHERE id = 1;
```

### Table Editor

- Visualize dados em formato de tabela
- Edite registros diretamente
- Adicione/remova colunas
- Configure relacionamentos

### API Auto-gerada

Supabase gera automaticamente uma API REST:
1. Vá em **Settings** > **API**
2. Copie a **URL** e **anon key**
3. Use para acessar dados via HTTP

**Exemplo:**
```bash
curl 'https://xxxxx.supabase.co/rest/v1/products' \
  -H "apikey: YOUR_ANON_KEY"
```

## 💾 Backup e Restore

### Backup Manual

1. Vá em **Database** > **Backups**
2. Clique em **Create backup**
3. Aguarde conclusão
4. Download do backup disponível

### Backup Automático

- Plano Free: Backups diários (7 dias de retenção)
- Plano Pro: Backups diários (30 dias de retenção)

### Restore

1. Vá em **Database** > **Backups**
2. Selecione o backup
3. Clique em **Restore**

## 🔄 Migrações

### Criar Migração

1. Vá em **SQL Editor**
2. Crie nova query
3. Escreva SQL de migração
4. Salve como migração

**Exemplo:**
```sql
-- Adicionar coluna discount
ALTER TABLE products 
ADD COLUMN discount DECIMAL(5,2) DEFAULT 0;

-- Criar índice
CREATE INDEX idx_products_category 
ON products(category);
```

## 📈 Limites do Plano Free

- ✅ 500 MB de banco de dados
- ✅ 1 GB de storage
- ✅ 2 GB de transferência/mês
- ✅ 50 MB de upload de arquivo
- ✅ 500K requisições de API/mês
- ✅ Backups diários (7 dias)

**Suficiente para desenvolvimento e projetos pequenos!**

## 🚀 Upgrade para Pro

Quando precisar de mais recursos:
- 8 GB de banco de dados
- 100 GB de storage
- 250 GB de transferência
- Backups de 30 dias
- Suporte prioritário
- **$25/mês por projeto**

## 🆘 Troubleshooting

### Erro: "Connection refused"
- Verifique se as credenciais estão corretas
- Confirme que o projeto está ativo
- Teste conexão no SQL Editor

### Erro: "SSL required"
- Adicione `?sslmode=require` na URL de conexão
- Ou configure no application.properties:
```properties
spring.datasource.url=jdbc:postgresql://...?sslmode=require
```

### Erro: "Too many connections"
- Limite de conexões atingido
- Configure connection pooling:
```properties
spring.datasource.hikari.maximum-pool-size=5
```

### Banco lento
- Verifique índices nas tabelas
- Otimize queries
- Considere upgrade de plano

## 📚 Recursos Adicionais

- 📖 [Documentação Oficial](https://supabase.com/docs)
- 🎥 [Tutoriais em Vídeo](https://www.youtube.com/c/Supabase)
- 💬 [Discord Community](https://discord.supabase.com)
- 🐛 [GitHub Issues](https://github.com/supabase/supabase)

## ✅ Checklist Final

- [ ] Projeto criado
- [ ] Script SQL executado
- [ ] Tabelas verificadas
- [ ] Produtos inseridos (12 itens)
- [ ] Credenciais copiadas
- [ ] application.properties configurado
- [ ] Conexão testada
- [ ] Backend conectado com sucesso

**Pronto! Seu Supabase está configurado! 🎉**
