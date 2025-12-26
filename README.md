# 📚 Projeto BookStore - Teste Técnico

## ⏱️ Tempo Estimado

**16 a 24 horas** de desenvolvimento (2-3 dias úteis)

| Etapa | Tempo |
|-------|-------|
| Setup dos projetos | 1-2h |
| Backend (auth, users, books) | 3-7h |
| Frontend público (listagem, detalhes, busca, login) | 2-5h |
| Frontend admin (lazy loading aninhado, CRUD) | 3-7h |
| Integração e ajustes finais | 1-3h |

---

## Sobre

Aplicação de listagem de livros com área administrativa.

- **Backend**: NestJS + JWT + MySQL
- **Frontend**: Angular

---

## Tecnologias

### Backend
- Node.js 18+
- npm
- NestJS
- TypeScript
- JWT
- MySQL
- TypeORM

### Frontend
- Node.js 18+
- Angular 17+
- TypeScript
- Lazy loading obrigatório
- Nenhum componente standalone (todos em módulos)

---

## Estrutura do Projeto

```
backend/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── index.ts
│   │   └── utils/
│   │       ├── auth.dto.ts
│   │       ├── auth.service.ts
│   │       ├── jwt.strategy.ts
│   │       └── index.ts
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   ├── index.ts
│   │   └── utils/
│   │       ├── users.dto.ts
│   │       ├── users-filter.dto.ts
│   │       ├── users.entity.ts
│   │       ├── users.service.ts
│   │       └── index.ts
│   ├── books/
│   │   ├── books.controller.ts
│   │   ├── books.module.ts
│   │   ├── index.ts
│   │   └── utils/
│   │       ├── books.dto.ts
│   │       ├── books-filter.dto.ts
│   │       ├── books.entity.ts
│   │       ├── books.service.ts
│   │       └── index.ts
│   ├── shared/
│   │   └── (guards, interceptors, decorators)
│   ├── app.module.ts
│   └── main.ts

frontend/
├── src/
│   ├── app/
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── pipes/
│   │   │   ├── directives/
│   │   │   ├── models/
│   │   │   ├── constants/
│   │   │   └── guards/
│   │   ├── books/
│   │   │   ├── books.module.ts
│   │   │   ├── books-routing.module.ts
│   │   │   ├── books.component.ts
│   │   │   ├── books.component.html
│   │   │   └── books.component.scss
│   │   ├── book-detail/
│   │   │   ├── book-detail.module.ts
│   │   │   ├── book-detail-routing.module.ts
│   │   │   ├── book-detail.component.ts
│   │   │   ├── book-detail.component.html
│   │   │   └── book-detail.component.scss
│   │   ├── login/
│   │   │   ├── login.module.ts
│   │   │   ├── login-routing.module.ts
│   │   │   ├── login.component.ts
│   │   │   ├── login.component.html
│   │   │   └── login.component.scss
│   │   ├── admin/
│   │   │   ├── admin.module.ts
│   │   │   ├── admin-routing.module.ts
│   │   │   ├── admin.component.ts
│   │   │   ├── admin.component.html (router-outlet)
│   │   │   ├── admin.component.scss
│   │   │   ├── books/
│   │   │   │   ├── books.module.ts
│   │   │   │   ├── books-routing.module.ts
│   │   │   │   ├── books.component.ts
│   │   │   │   ├── books.component.html (router-outlet)
│   │   │   │   ├── books.component.scss
│   │   │   │   ├── book-list/
│   │   │   │   │   ├── book-list.module.ts
│   │   │   │   │   ├── book-list.component.ts
│   │   │   │   │   ├── book-list.component.html
│   │   │   │   │   └── book-list.component.scss
│   │   │   │   └── book-edit/
│   │   │   │       ├── book-edit.module.ts
│   │   │   │       ├── book-edit.component.ts
│   │   │   │       ├── book-edit.component.html
│   │   │   │       └── book-edit.component.scss
│   │   │   └── users/
│   │   │       ├── users.module.ts
│   │   │       ├── users-routing.module.ts
│   │   │       ├── users.component.ts
│   │   │       ├── users.component.html (router-outlet)
│   │   │       ├── users.component.scss
│   │   │       ├── user-list/
│   │   │       │   ├── user-list.module.ts
│   │   │       │   ├── user-list.component.ts
│   │   │       │   ├── user-list.component.html
│   │   │       │   └── user-list.component.scss
│   │   │       └── user-edit/
│   │   │           ├── user-edit.module.ts
│   │   │           ├── user-edit.component.ts
│   │   │           ├── user-edit.component.html
│   │   │           └── user-edit.component.scss
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app.component.scss
│   └── index.html
```

---

## Backend

### Módulos

**auth/** - Login com JWT
- POST /auth/login

**users/** - CRUD de usuários (protegido)
- GET /users
- GET /users/:id
- POST /users
- PUT /users/:id
- DELETE /users/:id

**books/** - CRUD de livros
- GET /books (público, com busca via query `search`)
- GET /books/:id (público)
- POST /books (protegido)
- PUT /books/:id (protegido)
- DELETE /books/:id (protegido)

### Estrutura de cada módulo

```
{modulo}/
├── {modulo}.controller.ts
├── {modulo}.module.ts
├── index.ts
└── utils/
    ├── {modulo}.dto.ts
    ├── {modulo}-filter.dto.ts (users e books)
    ├── {modulo}.entity.ts (users e books)
    ├── {modulo}.service.ts
    └── index.ts
```

Usar `index.ts` para exportar os arquivos e facilitar imports.

---

## Frontend

### Site Público

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` ou `/books` | BooksComponent | Listagem de livros com busca |
| `/books/:id` | BookDetailComponent | Detalhes do livro |
| `/login` | LoginComponent | Login |

### Admin (protegido, lazy loading aninhado)

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/admin` | AdminComponent | Layout admin (router-outlet) |
| `/admin/books` | BooksComponent | Container (router-outlet) |
| `/admin/books` | BookListComponent | Listagem |
| `/admin/books/new` | BookEditComponent | Cadastro |
| `/admin/books/:id/edit` | BookEditComponent | Edição |
| `/admin/users` | UsersComponent | Container (router-outlet) |
| `/admin/users` | UserListComponent | Listagem |
| `/admin/users/new` | UserEditComponent | Cadastro |
| `/admin/users/:id/edit` | UserEditComponent | Edição |

### Estrutura

- **shared/**: componentes, services, pipes, directives, models, constants, guards (cada item com seu próprio módulo)
- **Componentes de rota**: importam do shared e montam a página
- **Lazy loading aninhado**: app → admin → books/users → list/edit

---

## Regras

1. Usar `index.ts` em todos os módulos do backend
2. Lazy loading obrigatório no frontend
3. Nenhum componente standalone no frontend
4. Cada item do shared tem seu próprio módulo
5. Não criar migrations (usar sync do TypeORM)

---

## Critérios de Avaliação

- Funcionalidades implementadas
- Estrutura de pastas correta
- Qualidade do código
- Lazy loading
- Uso de módulos (sem standalone)
- Uso de index.ts

---

**Boa sorte!**
