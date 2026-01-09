# Frontend – Sistema com Autenticação 🔐⚛️

Este repositório contém o **frontend** de uma aplicação web desenvolvida em **React + TypeScript**, com foco em autenticação de usuários (login, proteção de rotas e logout).

O projeto consome uma API backend externa e **não utiliza `.env` no frontend**. Tudo funciona diretamente apontando para a URL da API configurada no serviço Axios.

---

## 🧠 Tecnologias Utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- Axios
- CSS puro (App.css / index.css / login.css)
- LocalStorage para gerenciamento de tokens

---

## 📁 Estrutura Básica do Projeto

src/
├── pages/
│ └── Login.tsx
├── routes/
│ └── PrivateRoute.tsx
├── services/
│ └── api.ts
├── styles/
│ └── login.css
├── App.tsx
├── main.tsx

yaml
Copiar código

---

## 🔐 Funcionalidades Implementadas

- Tela de login com feedback visual:
  - Mensagem de erro (vermelha)
  - Mensagem de sucesso (verde)
- Autenticação via API (`/auth/login`)
- Armazenamento de `accessToken` e `refreshToken` no `localStorage`
- Proteção de rotas com `PrivateRoute`
- Logout limpando tokens e redirecionando para `/login`
- Redirecionamento automático após login bem-sucedido

---

## ▶️ Como Rodar o Projeto Localmente

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
2️⃣ Entre na pasta do projeto
bash
Copiar código
cd nome-do-projeto
3️⃣ Instale as dependências
bash
Copiar código
npm install
ou, se você gosta de sofrer diferente:

bash
Copiar código
yarn
4️⃣ Rode o projeto
bash
Copiar código
npm run dev
O frontend estará disponível em:

arduino
Copiar código
http://localhost:5173
🔗 Configuração da API
O frontend se comunica com o backend através do arquivo:

bash
Copiar código
src/services/api.ts
Exemplo:

ts
Copiar código
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export default api;
👉 Altere apenas o baseURL para apontar para sua API (local ou em produção).

🚪 Logout
A função de logout remove os tokens e redireciona o usuário:

ts
Copiar código
export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
}
🛡️ Proteção de Rotas
Rotas privadas são protegidas usando o componente PrivateRoute, que verifica a existência do accessToken no localStorage.

Usuário sem token:
➡️ redirecionado automaticamente para /login.

📝 Observações Importantes
Este projeto não possui .env no frontend

Toda a autenticação depende do backend

Tokens são armazenados no localStorage

Ideal para projetos acadêmicos, MVPs e sistemas administrativos

🚀 Possíveis Melhorias Futuras
Refresh token automático via interceptor

Context API para autenticação

Toasts de feedback

Logout automático ao receber 401

Melhor controle de loading

👨‍💻 Autor
Projeto desenvolvido para fins de estudo e prática com React, TypeScript e autenticação baseada em tokens.
