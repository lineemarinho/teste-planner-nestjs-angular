# 🍳 Projeto RecipeHub - Teste Técnico

## ⏱️ Tempo Estimado

**16 a 24 horas** de desenvolvimento (2-3 dias úteis)

| Etapa | Tempo |
|-------|-------|
| Setup dos projetos | 1-2h |
| Backend (auth, categories, recipes) | 3-7h |
| Frontend público (listagem, detalhes, filtros, login) | 2-5h |
| Frontend admin (lazy loading aninhado, CRUD) | 3-7h |
| Integração e ajustes finais | 1-3h |

---

## Sobre

Aplicação de receitas culinárias com área administrativa.

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
│   ├── categories/
│   │   ├── categories.controller.ts
│   │   ├── categories.module.ts
│   │   ├── index.ts
│   │   └── utils/
│   │       ├── categories.dto.ts
│   │       ├── categories-filter.dto.ts
│   │       ├── categories.entity.ts
│   │       ├── categories.service.ts
│   │       └── index.ts
│   ├── recipes/
│   │   ├── recipes.controller.ts
│   │   ├── recipes.module.ts
│   │   ├── index.ts
│   │   └── utils/
│   │       ├── recipes.dto.ts
│   │       ├── recipes-filter.dto.ts
│   │       ├── recipes.entity.ts
│   │       ├── recipes.service.ts
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
│   │   ├── recipes/
│   │   │   ├── recipes.module.ts
│   │   │   ├── recipes-routing.module.ts
│   │   │   ├── recipes.component.ts
│   │   │   ├── recipes.component.html
│   │   │   └── recipes.component.scss
│   │   ├── recipe-detail/
│   │   │   ├── recipe-detail.module.ts
│   │   │   ├── recipe-detail-routing.module.ts
│   │   │   ├── recipe-detail.component.ts
│   │   │   ├── recipe-detail.component.html
│   │   │   └── recipe-detail.component.scss
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
│   │   │   ├── recipes/
│   │   │   │   ├── recipes.module.ts
│   │   │   │   ├── recipes-routing.module.ts
│   │   │   │   ├── recipes.component.ts
│   │   │   │   ├── recipes.component.html (router-outlet)
│   │   │   │   ├── recipes.component.scss
│   │   │   │   ├── recipe-list/
│   │   │   │   │   ├── recipe-list.module.ts
│   │   │   │   │   ├── recipe-list.component.ts
│   │   │   │   │   ├── recipe-list.component.html
│   │   │   │   │   └── recipe-list.component.scss
│   │   │   │   └── recipe-edit/
│   │   │   │       ├── recipe-edit.module.ts
│   │   │   │       ├── recipe-edit.component.ts
│   │   │   │       ├── recipe-edit.component.html
│   │   │   │       └── recipe-edit.component.scss
│   │   │   └── categories/
│   │   │       ├── categories.module.ts
│   │   │       ├── categories-routing.module.ts
│   │   │       ├── categories.component.ts
│   │   │       ├── categories.component.html (router-outlet)
│   │   │       ├── categories.component.scss
│   │   │       ├── category-list/
│   │   │       │   ├── category-list.module.ts
│   │   │       │   ├── category-list.component.ts
│   │   │       │   ├── category-list.component.html
│   │   │       │   └── category-list.component.scss
│   │   │       └── category-edit/
│   │   │           ├── category-edit.module.ts
│   │   │           ├── category-edit.component.ts
│   │   │           ├── category-edit.component.html
│   │   │           └── category-edit.component.scss
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

**categories/** - CRUD de categorias (protegido)
- GET /categories (público, para filtros)
- GET /categories/:id
- POST /categories (protegido)
- PUT /categories/:id (protegido)
- DELETE /categories/:id (protegido)

**recipes/** - CRUD de receitas
- GET /recipes (público, com busca via query `search` e filtro por `categoryId`)
- GET /recipes/:id (público)
- POST /recipes (protegido)
- PUT /recipes/:id (protegido)
- DELETE /recipes/:id (protegido)

### Entidades

**Category**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | number | ID único |
| name | string | Nome da categoria (ex: Sobremesas, Massas, Saladas) |
| description | string | Descrição da categoria |
| createdAt | Date | Data de criação |

**Recipe**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | number | ID único |
| title | string | Título da receita |
| description | string | Descrição breve |
| ingredients | text | Lista de ingredientes |
| instructions | text | Modo de preparo |
| preparationTime | number | Tempo de preparo em minutos |
| servings | number | Número de porções |
| difficulty | enum | Nível de dificuldade (easy, medium, hard) |
| categoryId | number | FK para categoria |
| createdAt | Date | Data de criação |

### Estrutura de cada módulo

```
{modulo}/
├── {modulo}.controller.ts
├── {modulo}.module.ts
├── index.ts
└── utils/
    ├── {modulo}.dto.ts
    ├── {modulo}-filter.dto.ts (categories e recipes)
    ├── {modulo}.entity.ts (categories e recipes)
    ├── {modulo}.service.ts
    └── index.ts
```

Usar `index.ts` para exportar os arquivos e facilitar imports.

---

## Frontend

### Site Público

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` ou `/recipes` | RecipesComponent | Listagem de receitas com busca e filtro por categoria |
| `/recipes/:id` | RecipeDetailComponent | Detalhes da receita (ingredientes, modo de preparo) |
| `/login` | LoginComponent | Login |

### Admin (protegido, lazy loading aninhado)

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/admin` | AdminComponent | Layout admin (router-outlet) |
| `/admin/recipes` | RecipesComponent | Container (router-outlet) |
| `/admin/recipes` | RecipeListComponent | Listagem |
| `/admin/recipes/new` | RecipeEditComponent | Cadastro |
| `/admin/recipes/:id/edit` | RecipeEditComponent | Edição |
| `/admin/categories` | CategoriesComponent | Container (router-outlet) |
| `/admin/categories` | CategoryListComponent | Listagem |
| `/admin/categories/new` | CategoryEditComponent | Cadastro |
| `/admin/categories/:id/edit` | CategoryEditComponent | Edição |

### Estrutura

- **shared/**: componentes, services, pipes, directives, models, constants, guards (cada item com seu próprio módulo)
- **Componentes de rota**: importam do shared e montam a página
- **Lazy loading aninhado**: app → admin → recipes/categories → list/edit

---

## Funcionalidades Específicas

### Listagem Pública de Receitas
- Campo de busca por título
- Dropdown de filtro por categoria (carrega categorias via GET /categories)
- Exibir: título, tempo de preparo, dificuldade, categoria

### Detalhes da Receita
- Título e descrição
- Lista de ingredientes formatada
- Modo de preparo passo a passo
- Tempo de preparo e porções
- Nível de dificuldade (com ícone ou badge colorido)
- Categoria

### Formulário de Receita (Admin)
- Campos obrigatórios: title, ingredients, instructions, preparationTime, servings, difficulty, categoryId
- Campo description opcional
- Dropdown de categoria
- Dropdown de dificuldade (Fácil, Médio, Difícil)

### Formulário de Categoria (Admin)
- Campos obrigatórios: name
- Campo description opcional

---

## Regras

1. Usar `index.ts` em todos os módulos do backend
2. Lazy loading obrigatório no frontend
3. Nenhum componente standalone no frontend
4. Cada item do shared tem seu próprio módulo
5. Não criar migrations (usar sync do TypeORM)
6. Relacionamento: Recipe pertence a uma Category (ManyToOne)

---

## Critérios de Avaliação

- Funcionalidades implementadas
- Estrutura de pastas correta
- Qualidade do código
- Lazy loading
- Uso de módulos (sem standalone)
- Uso de index.ts
- Relacionamento entre entidades (Recipe → Category)

---

**Boa sorte!**
