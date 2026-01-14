# Descrição e Requisitos

*Faaaaaaala, dev! Vamos agora passar pelos requisitos do back-end desse desafio.*

Nesse projeto back-end, será desenvolvido uma API para gerenciar o encurtamento de URL’s. 

## Funcionalidades e Regras

<aside>
⚠️

Para esse desafio é esperado que você utilize o banco de dados Postgres.

</aside>

- [✔️]  Deve ser possível criar um link
    - [✔️]  Não deve ser possível criar um link com URL encurtada mal formatada
    - [✔️]  Não deve ser possível criar um link com URL encurtada já existente
- [✔️]  Deve ser possível deletar um link
- [✔️]  Deve ser possível obter a URL original por meio de uma URL encurtada
- [✔️]  Deve ser possível listar todas as URL’s cadastradas
- [✔️]  Deve ser possível incrementar a quantidade de acessos de um link
- [✔️]  Deve ser possível exportar os links criados em um CSV
    - [✔️]  Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
    - [✔️]  Deve ser gerado um nome aleatório e único para o arquivo
    - [✔️]  Deve ser possível realizar a listagem de forma performática
    - [✔️]  O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação.

<aside>
💡

Dica: Copie os checkbox acima para o README do seu projeto.
Assim irá poder ir marcando na medida que implementar as funcionalidades. 😉

</aside>

---

Veja que não especificamos se nas funcionalidades de deletar ou incrementar acessos, deve ser utilizado um campo `id` ou URL encurtada para realizar tais operações. Essa é uma decisão que cabe a você, desenvolvedor, escolher. Não há certo ou errado aqui, mas o recomendado é manter um padrão, se escolher `id`, que seja em ambas. Consistência e padrão são importantes.

*Lembrando que essa escolha irá impactar também no front-end.*

## Ferramentas

É obrigatório o uso de:

- TypeScript
- Fastify
- Drizzle
- Postgres

## Variáveis ambiente

Todo projeto tem diversas configurações de variáveis que devem ser diferentes de acordo com o ambiente que ele é executado. Para isso, importante sabermos, de forma fácil e intuitiva, quais variáveis são essas. Então é obrigatório que esse projeto tenha um arquivo `.env.example` com as chaves necessárias.

```
PORT=
DATABASE_URL=

CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_ACCESS_KEY_ID=""
CLOUDFLARE_SECRET_ACCESS_KEY=""
CLOUDFLARE_BUCKET=""
CLOUDFLARE_PUBLIC_URL=""
```

## Scripts

Crie um script com a exata chave `db:migrate` responsável por executar as migrations do banco de dados.

## Docker

Para esse projeto back-end você deve construir um `Dockerfile`, seguindo as boas práticas, que deve ser responsável por gerar a imagem da aplicação.

## Dicas

- Não se esqueça de habilitar o CORS na aplicação.
- Em caso de dúvidas, utilize o espaço da comunidade e do nosso fórum para interagir com outros alunos/instrutores e encontrar uma solução que funcione para você.

<aside>
<img src="https://prod-files-secure.s3.us-west-2.amazonaws.com/08f749ff-d06d-49a8-a488-9846e081b224/8a262faf-804f-467d-828c-37c228ac33c9/symbol.svg" alt="Rocketseat logo symbol in purple with heart icon. Made with love by Rocketseat" width="40px" /> Feito com 💜 por Rocketseat

</aside>