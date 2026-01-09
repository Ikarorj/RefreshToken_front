# Sistema de Autenticação Full Stack
## Backend com Fastify + Frontend com React e TypeScript

Este projeto implementa um sistema completo de autenticação utilizando **JWT (Access Token e Refresh Token)**, **Redis** para controle de sessão e um **frontend em React + TypeScript** para consumo da API.

O foco é demonstrar, de forma prática, autenticação segura, controle de sessão e integração entre frontend e backend.

---

## 📌 Arquitetura Geral

Frontend (React)
|
| HTTP + JWT
v
Backend (Fastify) ─── Redis (Docker)

yaml
Copiar código

---

## 🚀 Tecnologias Utilizadas

### Backend
- Node.js
- TypeScript
- Fastify
- JWT (jsonwebtoken)
- bcrypt
- Redis
- Docker

### Frontend
- React
- TypeScript
- Vite
- Axios
- React Router DOM
- CSS puro

---

## 🔐 Funcionalidades do Backend

- Login com email e senha
- Geração de Access Token (curta duração)
- Geração de Refresh Token (longa duração)
- Armazenamento do Access Token no Redis com TTL
- Rotas protegidas com validação de sessão
- Renovação automática de sessão
- Logout com invalidação do token

---

## 📌 Endpoints da API

### 🔑 POST `/auth/login`

Realiza o login do usuário.

**Body**
```json
{
  "email": "aluno@ifpi.edu.br",
  "password": "123456"
}
Resposta

json
Copiar código
{
  "accessToken": "...",
  "refreshToken": "..."
}
🔒 GET /auth/protected
Rota protegida por autenticação.

Header

makefile
Copiar código
Authorization: Bearer <accessToken>
🔁 POST /auth/refresh
Renova o Access Token utilizando o Refresh Token.

Body

json
Copiar código
{
  "refreshToken": "..."
}
🚪 POST /auth/logout
Finaliza a sessão do usuário.

Header

makefile
Copiar código
Authorization: Bearer <accessToken>
🗄️ Controle de Sessão com Redis
O Access Token é armazenado no Redis

O TTL acompanha o tempo de expiração do token

Tokens inválidos ou expirados são rejeitados

Logout remove a sessão do cache

▶️ Como Rodar o Backend
bash
Copiar código
npm install
docker run -d -p 6379:6379 redis
npm run dev
Servidor disponível em:

arduino
Copiar código
http://localhost:3000
🖥️ Funcionalidades do Frontend
Tela de login estilizada

Feedback visual de erro e sucesso

Armazenamento de tokens no LocalStorage

Proteção de rotas privadas

Integração direta com a API

Logout funcional

📂 Estrutura do Frontend
pgsql
Copiar código
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
🔐 Proteção de Rotas no Frontend
Rotas privadas verificam a existência de um accessToken.
Caso o token não exista, o usuário é redirecionado para a tela de login.

🔁 Estratégia de Refresh Token
Access Token é usado nas requisições

Quando expira, o Refresh Token gera um novo

O usuário permanece autenticado

A sessão é renovada automaticamente

▶️ Como Rodar o Frontend
bash
Copiar código
npm install
npm run dev
Aplicação disponível em:

arduino
Copiar código
http://localhost:5173
🔧 Configuração da API no Frontend
Arquivo src/services/api.ts

ts
Copiar código
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
🔄 Fluxo de Autenticação
Usuário realiza login

Backend valida credenciais

Tokens são gerados

Access Token é salvo no Redis

Frontend armazena tokens

Rotas protegidas validam o token

Sessão pode ser renovada

Logout invalida a sessão

📌 Considerações Finais
Este projeto demonstra boas práticas de autenticação, segurança e arquitetura em aplicações web modernas, utilizando tecnologias amplamente adotadas no mercado.

👨‍💻 Autor
Projeto desenvolvido para fins acadêmicos, com foco em autenticação, segurança e integração frontend-backend.
