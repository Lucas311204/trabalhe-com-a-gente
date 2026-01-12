# Github Front - Front-end

Este é o front-end da aplicação Github API, desenvolvido com Angular. Ele fornece uma interface para buscar e visualizar repositórios do GitHub.

## Funcionalidades

- Busca de repositórios do GitHub por nome.
- Paginação de resultados.
- Exibição de repositórios em cards.
- Interface responsiva.

## Tecnologias Utilizadas

- **Angular**: Framework para construção de aplicações web.
- **TypeScript**: Linguagem de programação tipada.
- **RxJS**: Biblioteca para programação reativa.
- **Cypress**: Framework para testes end-to-end.

## Estrutura do Projeto

- `src/`: Código fonte principal.
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

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd github-front
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Executando a Aplicação

### Desenvolvimento
```bash
npm start
```

A aplicação será executada em `http://localhost:4200/`.

### Build para Produção
```bash
npm run build
```

Os arquivos de build serão gerados na pasta `dist/`.

## Testes

### Testes Unitários
```bash
npm test
```

### Testes E2E
```bash
npm run e2e
```

## Componentes Principais

- **Header**: Componente de cabeçalho com barra de busca.
- **CardComponent**: Componente para exibir informações de repositórios.
- **MainPage**: Página principal com listagem de repositórios.

## Integração com Back-end

A aplicação se conecta ao back-end em `http://localhost:3000` para buscar dados de repositórios.

## Licença

Este projeto é privado.
