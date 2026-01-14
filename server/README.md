# 🚀 Guia de Início Rápido - Brev.ly Server

Este guia contém as instruções para configurar seu ambiente de desenvolvimento local e começar a trabalhar no projeto.🛠

Pré-requisitosAntes de começar, você precisará ter instalado em sua máquina:
 * Node.js (Versão 22 LTS ou superior)
 * pnpm (Gerenciador de pacotes: npm install -g pnpm)
 * Docker & Docker Compose (Para o banco de dados e serviços auxiliares)
 * Git 

### 📥 Passo 1: Clonar e InstalarPrimeiro, clone o repositório e instale as dependências:

Clonar o repositório
```sh
git clone https://github.com/kayzarosa/brev_ly.git
```

### Entrar na pasta do servidor

```bash
cd server
```
### Instalar dependências
```sh
pnpm install
```

### ⚙️ Passo 2: Variáveis de Ambiente
O projeto utiliza variáveis de ambiente para conexões externas. Copie o arquivo de exemplo (se existir) ou crie um novo:

```sh
cp .env.example .env
```

Certifique-se de configurar as seguintes variáveis no seu .env:

* DATABASE_URL: URL de conexão com o Postgres.
* PORT: Porta onde o servidor vai rodar (Ex: 3333).
* (Adicione aqui as chaves do Cloudflare/AWS se necessário).

### 🐳 Passo 3: Subir a Infraestrutura (Docker)
Para que o servidor funcione, o banco de dados PostgreSQL precisa estar rodando. 
<br />Use o Docker Compose na raiz do projeto ou dentro da pasta server:
#### Sobe o banco de dados em background
```sh
docker compose up -d
```

#### Dica: Use
```sh
 docker ps
```
 para verificar se o container brevly-postgres está com o status Up.
 
 ### 🏗 Passo 4: Migrations e Banco de DadosCom o banco de dados rodando, prepare as tabelas:
 
 Rodar as migrations para criar as tabelas
```sh
pnpm run db:generate && pnpm run db:migrate
```

### (Opcional) Abrir o Drizzle Studio para visualizar o banco
```sh
pnpm run db:studio
```

### 🏃 Passo 5: Rodar o Projeto
Agora você está pronto para iniciar o servidor em modo de desenvolvimento (com auto-reload):
```Bash
pnpm run dev
```

O servidor estará disponível em: 
<br />
http://localhost:3333

### 🧪 Comandos Úteis
Descrição

Compila o projeto TypeScript para JavaScript na pasta dist.
```sh
pnpm run build
```
Executa o Biome para verificar erros de formatação e lint.
```sh
pnpm run lint
```
Executa os testes automatizados.
```sh
pnpm run test
```
<br />
🧐 Padronização de CódigoNeste projeto, utilizamos o Biome para lint e formatação. Se você usa VS Code, recomendamos instalar a extensão oficial do Biome para que o código seja formatado automaticamente ao salvar.
<br /><br />
Feito com ♥ by Kayza 👋