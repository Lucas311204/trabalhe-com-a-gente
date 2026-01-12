# Github API Project

Este projeto é uma aplicação full-stack para buscar e visualizar repositórios do GitHub. Ele é dividido em duas partes principais: o back-end (API) e o front-end (interface web).

## Estrutura do Projeto

- **github-api/**: Back-end desenvolvido com NestJS.
  - `src/`: Código fonte.
    - `app/`: Módulo principal da aplicação.
    - `repositories/`: Módulo de repositórios.
      - `repositories.controller.ts`: Controlador para endpoints de repositórios.
      - `repositories.service.ts`: Serviço para lógica de negócio.
      - `repositories.module.ts`: Módulo do repositório.
    - `dto/`: Data Transfer Objects.
      - `search-repositories.dto.ts`: DTO para busca de repositórios.
    - `main.ts`: Ponto de entrada da aplicação.
  - `test/`: Testes end-to-end.
  - `package.json`: Dependências e scripts.
- **github-front/**: Front-end desenvolvido com Angular.
  - `src/`: Código fonte.
    - `app/`: Módulo principal da aplicação.
      - `pages/`: Páginas da aplicação.
        - `main-page/`: Página principal.
      - `components/`: Componentes reutilizáveis.
        - `header/`: Componente de cabeçalho.
        - `card-component/`: Componente de card para repositórios.
      - `app.routes.ts`: Configuração de rotas.
    - `main.ts`: Ponto de entrada da aplicação.
  - `cypress/`: Testes end-to-end.
  - `public/`: Arquivos estáticos.
  - `package.json`: Dependências e scripts.

## Funcionalidades

- Busca de repositórios do GitHub por nome.
- Paginação de resultados.
- Interface responsiva para visualização de repositórios.
- API REST para integração com o GitHub.

## Tecnologias Utilizadas

### Back-end (github-api)
- NestJS
- TypeScript
- Axios / HttpModule
- Jest
- Supertest

### Front-end (github-front)
- Angular
- TypeScript
- RxJS
- Cypress

## Instalação e Execução

### Pré-requisitos
- Node.js
- npm

### Back-end
1. Navegue para a pasta `github-api`:
   ```bash
   cd github-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute em modo desenvolvimento:
   ```bash
   npm run start:dev
   ```

   A API estará disponível em `http://localhost:3000`.

### Front-end
1. Navegue para a pasta `github-front`:
   ```bash
   cd github-front
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute em modo desenvolvimento:
   ```bash
   ng serve
   ```

   A aplicação estará disponível em `http://localhost:4200`.

## Testes

### Back-end
```bash
cd github-api
npm run test
npm run test:e2e
```

### Front-end
```bash
cd github-front
npx cypress open
```

