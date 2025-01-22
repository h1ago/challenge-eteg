## Pré-requisitos mínimos recomendados para executar o projeto:

- Docker: 27.5.0+
- Docker Compose: 1.29.2+

## Passo a Passo

1. Clone este repositório

   ```bash
   git clone https://github.com/h1ago/challenge-eteg.git
   cd challenge-eteg
   ```

2. Construa e inicie os containers
   ```bash
   docker-compose up --build
   ```

- Isso fará o Docker:
  - Criar a imagem para o frontend (React).
  - Criar a imagem para o backend (NestJS).
  - Criar o container para o banco de dados PostgreSQL.

3. Acesse a aplicação

- Frontend: Abra seu navegador e acesse http://localhost:8080.
- Backend: A API estará disponível em http://localhost:3000/customer.
- Banco de dados: Se precisar acessar o banco, ele estará disponível na porta padrão (5432).
