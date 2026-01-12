# GitHub API Backend

Este é o backend da aplicação GitHub API, desenvolvido com NestJS. Ele fornece uma API para buscar repositórios no GitHub.

## Descrição

A API permite buscar repositórios do GitHub através de uma interface REST. Utiliza a API do GitHub para realizar as buscas e retorna os resultados em formato JSON.

## Instalação

1. Certifique-se de ter o Node.js instalado (versão 18 ou superior).
2. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto.
2. Adicione seu token de acesso pessoal do GitHub:
   ```
   TOKEN=seu_token_aqui
   ```
3. (Opcional) Configure a porta do servidor:
   ```
   PORT=3000
   ```

**Nota:** Você precisa de um token de acesso pessoal do GitHub com permissões para acessar a API de busca de repositórios.

## Executando a Aplicação

### Desenvolvimento
```bash
npm run start:dev
```

### Produção
```bash
npm run build
npm run start:prod
```

A aplicação estará rodando em `http://localhost:3000` (ou na porta configurada).

## Endpoints da API

### GET /repositories

Busca repositórios no GitHub.

**Parâmetros de Query:**
- `name` (string, obrigatório): Termo de busca para o repositório
- `page` (number, opcional): Número da página (padrão: 1)

**Exemplo de Requisição:**
```
GET /repositories?name=react&page=1
```

**Resposta de Sucesso (200):**
```json
{
  "total_count": 12345,
  "items": [
    {
      "id": 123,
      "name": "react",
      "full_name": "facebook/react",
      "html_url": "https://github.com/facebook/react",
      "description": "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
      "language": "JavaScript",
      "stargazers_count": 180000,
      "forks_count": 35000,
      "updated_at": "2023-10-01T00:00:00Z"
    }
  ],
  "links": {
    "next": "https://api.github.com/search/repositories?q=react&page=2",
    "prev": "https://api.github.com/search/repositories?q=react&page=1",
    "first": "https://api.github.com/search/repositories?q=react&page=1",
    "last": "https://api.github.com/search/repositories?q=react&page=100"
  }
}
```

## Testes

### Executar todos os testes
```bash
npm run test
```

### Executar testes E2E
```bash
npm run test:e2e
```

### Executar testes com cobertura
```bash
npm run test:cov
```

## Scripts Disponíveis

- `npm run build`: Compila o projeto
- `npm run format`: Formata o código com Prettier
- `npm run start`: Inicia a aplicação em modo produção
- `npm run start:dev`: Inicia a aplicação em modo desenvolvimento
- `npm run start:debug`: Inicia a aplicação em modo debug
- `npm run start:prod`: Inicia a aplicação em modo produção
- `npm run lint`: Executa o linter
- `npm run test`: Executa os testes unitários
- `npm run test:watch`: Executa os testes em modo watch
- `npm run test:cov`: Executa os testes com cobertura
- `npm run test:debug`: Executa os testes em modo debug
- `npm run test:e2e`: Executa os testes E2E

## Estrutura do Projeto

```
src/
├── app.controller.ts      # Controller principal
├── app.module.ts          # Módulo principal
├── app.service.ts         # Serviço principal
├── main.ts                # Ponto de entrada da aplicação
├── dto/
│   └── search-repositories.dto.ts  # DTO para busca de repositórios
└── repositories/
    ├── repositories.controller.ts  # Controller de repositórios
    ├── repositories.module.ts      # Módulo de repositórios
    ├── repositories.service.ts     # Serviço de repositórios
    └── *.spec.ts                   # Arquivos de teste
```

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para aplicações server-side
- **TypeScript**: Superset do JavaScript com tipagem estática
- **Axios**: Cliente HTTP para requisições à API do GitHub
- **RxJS**: Biblioteca para programação reativa
- **Jest**: Framework de testes
- **Prettier**: Formatador de código
- **ESLint**: Linter para JavaScript/TypeScript

## CORS

A aplicação está configurada para aceitar requisições CORS da origem `http://localhost:4200` (porta padrão do Angular).

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

