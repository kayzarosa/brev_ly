# 🔗 Brevly - URL Shortener

Uma API moderna e performática para encurtamento de links, desenvolvida como parte de um desafio técnico. O projeto utiliza uma arquitetura de Monorepo para separar as responsabilidades de Back-end e Front-end.

---

## 🛠️ Tecnologias e Ferramentas

O projeto foi construído utilizando as seguintes tecnologias:

* **Runtime:** Node.js 24
* **Linguagem:** TypeScript
* **Framework API:** Fastify
* **Banco de Dados:** Postgres (via Docker)
* **ORM:** Drizzle ORM
* **Linter/Formatter:** Biome.js
* **Storage (CSV):** Cloudflare R2 / AWS S3 (S3 Compatible)

---

## 📋 Requisitos e Funcionalidades

Abaixo estão os requisitos do desafio. O progresso da implementação pode ser acompanhado pelos checkboxes:

- [✔️] **Criar Links:** Deve ser possível criar um link encurtado.
- [✔️] **Validação:** Não deve ser possível criar um link com URL mal formatada.
- [✔️] **Unicidade:** Não deve ser possível criar um link com URL encurtada já existente.
- [✔️] **Deleção:** Deve ser possível deletar um link.
- [✔️] **Redirecionamento:** Obter a URL original por meio de uma URL encurtada.
- [ ] **Listagem:** Listar todas as URLs cadastradas de forma performática.
- [ ] **Métricas:** Incrementar a quantidade de acessos de um link ao ser utilizado.
- [ ] **Exportação CSV:** Gerar e exportar links criados em um arquivo CSV.
- [ ] **CDN/Storage:** Acessar o CSV por meio de uma CDN (S3/R2).
- [ ] **Storage Segura:** O arquivo CSV deve ter um nome aleatório e único.
- [ ] **Estrutura CSV:** O arquivo deve conter: URL original, encurtada, contagem de acessos e data de criação.

---