# 🚀 Guia de Configuração - Busca Shop

## 📋 Pré-requisitos

- Node.js 16+ e npm
- Java 17+
- Maven 3.6+
- Conta no Supabase (gratuita)

## 🗄️ Configuração do Banco de Dados (Supabase)

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Clique em "New Project"
3. Preencha os dados:
   - Nome do projeto: `busca-shop`
   - Database Password: escolha uma senha forte
   - Region: escolha a mais próxima (ex: South America)
4. Aguarde a criação do projeto (1-2 minutos)

### 2. Executar Script SQL

1. No painel do Supabase, vá em **SQL Editor** (menu lateral)
2. Clique em **New Query**
3. Copie todo o conteúdo do arquivo `backend/supabase-init.sql`
4. Cole no editor e clique em **Run**
5. Verifique se as tabelas foram criadas em **Table Editor**

### 3. Obter Credenciais de Conexão

1. Vá em **Settings** > **Database**
2. Role até **Connection String** > **URI**
3. Copie a string de conexão (formato: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`)
4. Anote:
   - Host: `db.xxxxx.supabase.co`
   - User: `postgres`
   - Password: a senha que você definiu
   - Database: `postgres`
   - Port: `5432`

## ⚙️ Configuração do Backend (Spring Boot)

### 1. Configurar application.properties

Edite o arquivo `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://db.xxxxx.supabase.co:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=SUA_SENHA_AQUI
```

Substitua:
- `db.xxxxx.supabase.co` pelo seu host do Supabase
- `SUA_SENHA_AQUI` pela senha do banco

### 2. Compilar e Executar

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

O backend estará rodando em: `http://localhost:8080/api`

### 3. Testar API

Abra o navegador e acesse:
- `http://localhost:8080/api/products` - deve retornar os produtos

## 🎨 Configuração do Frontend (React)

### 1. Instalar Dependências

```bash
cd ..
npm install
```

### 2. Executar Frontend

```bash
npm run dev
```

O frontend estará rodando em: `http://localhost:5173`

## ✅ Verificação

1. **Backend**: Acesse `http://localhost:8080/api/products` - deve retornar JSON com produtos
2. **Frontend**: Acesse `http://localhost:5173` - deve mostrar a loja com produtos
3. **Integração**: Os produtos devem carregar do backend (não mais dados fake)

## 🔧 Solução de Problemas

### Erro de Conexão com Banco

- Verifique se as credenciais estão corretas
- Confirme que o IP está liberado no Supabase (Settings > Database > Connection Pooling)
- Teste a conexão diretamente no Supabase SQL Editor

### Backend não inicia

- Verifique se o Java 17+ está instalado: `java -version`
- Verifique se o Maven está instalado: `mvn -version`
- Limpe o cache: `mvn clean`

### Frontend não carrega produtos

- Verifique se o backend está rodando
- Abra o Console do navegador (F12) e veja os erros
- Confirme que a URL da API está correta em `src/services/api.js`

### CORS Error

- Verifique se o CORS está configurado no backend
- Confirme que o frontend está rodando em `http://localhost:5173`

## 📚 Estrutura do Projeto

```
Busca-Shop-main/
├── backend/                    # Backend Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/com/buscashop/
│   │       │   ├── controller/    # REST Controllers
│   │       │   ├── model/         # Entidades JPA
│   │       │   ├── repository/    # Repositórios
│   │       │   ├── service/       # Lógica de negócio
│   │       │   └── config/        # Configurações
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml
│   └── supabase-init.sql
├── src/                        # Frontend React
│   ├── Pages/
│   ├── Components/
│   ├── context/
│   ├── services/
│   │   └── api.js             # Integração com backend
│   └── ...
└── package.json
```

## 🎯 Próximos Passos

1. ✅ Backend Spring Boot configurado
2. ✅ Banco de dados Supabase configurado
3. ✅ Frontend integrado com backend
4. ⬜ Implementar autenticação JWT
5. ⬜ Adicionar validações
6. ⬜ Deploy em produção

## 📞 Suporte

Se encontrar problemas, verifique:
1. Logs do backend no terminal
2. Console do navegador (F12)
3. Credenciais do Supabase
4. Portas 8080 e 5173 disponíveis
