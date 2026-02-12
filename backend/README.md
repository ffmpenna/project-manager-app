# 🗄️ Project Manager API (Backend)

> **Status:** 🚧 Em Desenvolvimento (WIP)

>

> **Nota:** Esta API opera de forma independente e aguarda integração total com o Frontend.

API RESTful para o gerenciamento de projetos, tarefas e usuários, construída com Node.js e MySQL.

## 🛠 Tecnologias

- **Node.js**

- **Express**

- **Sequelize** (ORM)

- **MySQL**

- **Jest** (Testes Unitários/Integração)

## 📂 Estrutura

```
Back/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── migrations/
│   ├── models/
│   ├── routes/
│   ├── seeders/
│   ├── services/
│   ├── utils/
│   └── validations/
├── tests/
└── .sequelizerc
```

## ⚙️ Como Rodar

### Instalação:

    npm install

### Configuração (.env):

_Crie um arquivo .env na raiz com as credenciais do banco:_

    DB_USER=root

    DB_PASS=suasenha

    DB_NAME=project_manager

    DB_HOST=127.0.0.1

    PORT=3001

**Banco de Dados:**

    npx sequelize-cli db:create

    npx sequelize-cli db:migrate

**Iniciar Servidor:**

    npm run dev

## 🧪 Testes

**Para rodar a suíte de testes configurada:**

    npm test
