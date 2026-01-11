# Sistema de Autenticação Completo
Backend com Fastify + Frontend com React e TypeScript

Um projeto acadêmico que demonstra um fluxo de autenticação moderno com JWT (Access Token + Refresh Token), gerenciamento de sessão via Redis e uma interface em React/TypeScript.

---

## 📋 Sumário
- [Visão Geral](#-visão-geral-da-arquitetura)
- [Tecnologias](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Backend](#-backend--autenticação-e-sessão)
  - [Endpoints](#-endpoints-do-backend)
  - [Como rodar o backend](#-como-rodar-o-backend)
- [Frontend](#-frontend--interface-de-autenticação)
  - [Como rodar o frontend](#-como-rodar-o-frontend)
  - [Configuração da API](#-configuração-da-api-no-frontend)
- [Fluxo de Autenticação](#-fluxo-completo-de-autenticação)
- [Proteção de Rotas](#-proteção-de-rotas)
- [Considerações de Segurança](#-considerações-de-segurança)
- [Estrutura do Frontend](#-estrutura-do-frontend)
- [Autor](#-autor)

---

# 📌 Visão Geral da Arquitetura

Fluxo alto nível:

[ Frontend (React) ]
        |
        | HTTP + JWT
        v
[ Backend (Fastify) ] ---- Redis (Docker)

- Frontend: interface, armazenamento de tokens e proteção de rotas.
- Backend: valida credenciais, gera tokens e controla sessões.
- Redis: armazena Access Tokens com TTL para invalidação automática.

---

# 🚀 Tecnologias Utilizadas

## Backend
- Node.js
- TypeScript
- Fastify
- jsonwebtoken (JWT)
- bcrypt
- Redis (cache/TTL)
- Docker (para Redis)

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
- Renovação automática da sessão via Refresh Token
- Rotas protegidas (verificação de Access Token)
- Logout com invalidação da sessão (remoção do token no Redis)

## 🔌 Endpoints do Backend

### POST /auth/login
Realiza autenticação do usuário.

Request Body (JSON):
```json
{
  "email": "aluno@ifpi.edu.br",
  "password": "123456"
}
```

Response (JSON):
```json
{
  "accessToken": "eyJhbGciOi...",
  "refreshToken": "eyJhbGciOi..."
}
```

---

### GET /auth/protected
Rota protegida por autenticação.

Header:
```
Authorization: Bearer <accessToken>
```

Exemplo de resposta (quando autorizado):
```json
{
  "message": "Acesso autorizado",
  "user": { "id": "123", "email": "aluno@ifpi.edu.br" }
}
```

---

### POST /auth/refresh
Renova o Access Token usando o Refresh Token.

Request Body (JSON):
```json
{
  "refreshToken": "eyJhbGciOi..."
}
```

Response (JSON):
```json
{
  "accessToken": "novoAccessToken..."
}
```

---

### POST /auth/logout
Finaliza a sessão do usuário (invalida token no Redis e/ou remove sessão).

Request Body (exemplo):
```json
{
  "accessToken": "eyJhbGciOi..."
}
```

Response (JSON):
```json
{
  "message": "Logout realizado com sucesso"
}
```

---

## 🗄️ Redis e Controle de Sessão
- Cada Access Token é salvo no Redis com um TTL (tempo de vida).
- Se o token expirar ou for removido do Redis, a sessão é considerada inválida.
- Logout remove o token manualmente do Redis para invalidar sessão imediatamente.

---

# ▶️ Como Rodar o Backend

Requisitos:
- Node.js
- npm ou yarn
- Docker (opcional para rodar Redis)

Passos:

1. Instalar dependências:
```bash
npm install
# ou
yarn
```

2. Rodar Redis (com Docker):
```bash
docker run -d -p 6379:6379 redis
```

3. Rodar em modo de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

Backend disponível em:
```
http://localhost:3000
```

(Verifique variáveis de ambiente como SECRET_JWT, REFRESH_TOKEN_SECRET, TTLs e credenciais do banco/usuários se houverem.)

---

# 🖥️ Frontend – Interface de Autenticação

Funcionalidades:
- Tela de login estilizada
- Feedback visual de sucesso/erro
- Armazenamento de tokens no localStorage
- Proteção de rotas privadas
- Requisições automáticas à API com Access Token
- Renovação automática de Access Token via Refresh Token
- Logout funcional

## ▶️ Como Rodar o Frontend

1. Instalar dependências:
```bash
npm install
# ou
yarn
```

2. Rodar em modo de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

Frontend disponível em:
```
http://localhost:5173
```

---

## 🔧 Configuração da API no Frontend

Arquivo: `src/services/api.ts`

Exemplo com Axios:
```ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

(É recomendável também implementar um interceptor de resposta que trate 401 -> tenta refresh -> refaz a requisição.)

---

# 🔁 Fluxo Completo de Autenticação

1. Usuário realiza login na UI (email + senha).
2. Backend valida credenciais e retorna Access + Refresh Tokens.
3. Frontend armazena tokens (ex.: localStorage) e envia Access Token nas requisições.
4. Backend valida Access Token e verifica presença no Redis.
5. Se Access Token expirar, frontend usa Refresh Token em `/auth/refresh` para obter novo Access Token.
6. Logout remove o token no backend/Redis e limpa armazenamento no frontend.

---

# 🔐 Proteção de Rotas
- As rotas privadas no frontend verificam se existe um accessToken válido.
- Se não existir (ou se a verificação falhar), o usuário é redirecionado para a tela de login.
- No backend, middleware verifica e valida o JWT e a presença/validade no Redis.

Exemplo simplificado de uma PrivateRoute em React:
```tsx
// src/routes/PrivateRoute.tsx
import { Navigate } from "react-router-dom";

type Props = { children: JSX.Element };

export default function PrivateRoute({ children }: Props) {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" />;
}
```

---

# 🧾 Estrutura do Frontend (exemplo)
```
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
```

---

# ⚠️ Considerações de Segurança
- Nunca armazene Refresh Tokens em localStorage para aplicações altamente sensíveis — considere HttpOnly cookies.
- Proteja as chaves secretas (env vars) e nunca comite-as no repositório.
- Use HTTPS em produção.
- Defina tempos de expiração apropriados para Access e Refresh Tokens.
- A invalidação de sessão via Redis fornece controle imediato sobre tokens (útil para logout forçado).

---

# ✅ Boas Práticas Demonstradas
- Autenticação baseada em JWT
- Controle de sessão com cache (Redis)
- Renovação de sessão com Refresh Token
- Separação frontend / backend e consumo via API
- Uso de TypeScript para tipagem e segurança em tempo de compilação

---


# ✅ Repositório do Back-end:

https://github.com/Ikarorj/autentica-o-profissional-fastify-jwt-redis

# 👨‍💻 Autor
Projeto desenvolvido para fins acadêmicos com foco em aprendizado prático de autenticação, segurança e desenvolvimento full stack.

