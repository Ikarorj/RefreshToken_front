# Sistema de Autenticação Completo  
## Backend com Fastify + Frontend com React e TypeScript

Este repositório contém a implementação completa de um **sistema de autenticação moderno**, dividido em **backend** e **frontend**, utilizando autenticação baseada em **JWT (Access Token e Refresh Token)** e controle de sessão com **Redis**.

O projeto foi desenvolvido com fins acadêmicos, aplicando conceitos fundamentais de segurança, arquitetura cliente-servidor e consumo de APIs REST.

---

# 📌 Visão Geral da Arquitetura

[ Frontend (React) ]
|
| HTTP + JWT
v
[ Backend (Fastify) ] ---- Redis (Docker)

yaml
Copiar código

- O **frontend** é responsável pela interface e controle de sessão do usuário
- O **backend** valida credenciais, gera tokens e gerencia sessões
- O **Redis** armazena o Access Token com TTL para invalidação automática

---

# 🚀 Tecnologias Utilizadas

## Backend
- Node.js
- TypeScript
- Fastify
- JWT (jsonwebtoken)
- bcrypt
- Redis
- Docker

## Frontend
- React
- TypeScript
- Vite
- Axios
- React Router DOM
- CSS puro

---

# 🔐 Backend – Autenticação e Sessão

## Funcionalidades Implementadas

- Login com email e senha
- Geração de Access Token (curta duração)
- Geração de Refresh Token (longa duração)
- Armazenamento do Access Token no Redis com TTL
- Renovação automática da sessão
- Rotas protegidas
- Logout com invalidação da sessão

---

## 📌 Endpoints do Backend

### 🔑 POST `/auth/login`
Realiza autenticação do usuário.

**Body:**
```json
{
  "email": "aluno@ifpi.edu.br",
  "password": "123456"
}
Retorno:

json


{
  "accessToken": "...",
  "refreshToken": "..."
}
🔒 GET /auth/protected
Rota protegida por autenticação.

Header:

makefile


Authorization: Bearer <accessToken>
🔁 POST /auth/refresh
Renova o Access Token usando o Refresh Token.

Body:

json

{
  "refreshToken": "..."
}


🚪 POST /auth/logout
Finaliza a sessão do usuário.

🗄️ Redis e Controle de Sessão
Cada Access Token é salvo no Redis com TTL

Se o token expirar ou for removido, a sessão é invalidada

Logout remove o token manualmente

▶️ Como Rodar o Backend

npm install
docker run -d -p 6379:6379 redis
npm run dev
Backend disponível em:

http://localhost:3000

🖥️ Frontend – Interface de Autenticação
Funcionalidades
Tela de login estilizada

Feedback visual de sucesso e erro

Armazenamento de tokens no LocalStorage

Proteção de rotas privadas

Consumo automático da API

Logout funcional

📂 Estrutura do Frontend


src/
├── pages/
│   └── Login.tsx
├── routes/
│   └── PrivateRoute.tsx
├── services/
│   └── api.ts
├── styles/
│   └── login.css
├── App.tsx


🔐 Proteção de Rotas
Rotas privadas verificam se existe um accessToken válido no navegador.
Caso não exista, o usuário é redirecionado para a tela de login.

---

🔁 Uso do Refresh Token no Frontend
O Access Token é usado em todas as requisições

Quando ele expira, o Refresh Token pode ser utilizado para gerar um novo

Isso evita que o usuário precise logar novamente constantemente

---

▶️ Como Rodar o Frontend

npm install
npm run dev
Frontend disponível em:

http://localhost:5173

---

🔧 Configuração da API no Frontend
Arquivo:

src/services/api.ts

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;

---


🎯 Fluxo Completo de Autenticação
Usuário realiza login

Backend valida credenciais

Tokens são gerados

Access Token é salvo no Redis

Frontend armazena tokens

Rotas protegidas validam o token

Sessão pode ser renovada automaticamente

Logout invalida a sessão

---

📌 Considerações Finais
Este projeto demonstra, de forma prática, a aplicação de:

Autenticação segura

Controle de sessão

Integração frontend-backend

Uso de cache para gerenciamento de tokens

Boas práticas em aplicações web modernas

👨‍💻 Autor
Projeto desenvolvido para fins acadêmicos, com foco em aprendizado prático de autenticação, segurança e desenvolvimento web full stack.



