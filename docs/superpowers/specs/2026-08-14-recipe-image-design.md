# Imagem na Receita — Design

## Contexto

O RecipeHub (backend NestJS + frontend Angular) não possui, atualmente, nenhum
campo de imagem em receitas — nem na entidade/DTOs do backend, nem no
formulário, listagem ou detalhe do frontend. O objetivo desta feature é
permitir que o usuário envie (upload) uma imagem para cada receita e que ela
seja exibida na listagem e na página de detalhe.

## Decisões

- **Origem da imagem**: upload de arquivo (não URL externa).
- **Storage**: disco local do backend (`backend/uploads/recipes/`), servido
  estaticamente. Sem volume Docker dedicado — arquivos não precisam
  sobreviver a recriação do container neste projeto de teste.
- **Obrigatoriedade**: campo opcional. Receitas sem imagem exibem um
  placeholder.
- **Formatos aceitos**: `image/jpeg`, `image/png`, `image/webp`.
- **Tamanho máximo**: 5MB.

## Backend

### Entidade `Recipe`

Adicionar coluna:

```ts
@Column({ type: 'varchar', nullable: true })
imageUrl: string | null;
```

### DTOs

`CreateRecipeDto` e `UpdateRecipeDto` ganham:

```ts
@IsOptional()
@IsString()
imageUrl?: string;
```

### Upload endpoint

Novo endpoint dedicado, desacoplado do create/update JSON existente:

```
POST /recipes/upload-image
Content-Type: multipart/form-data (campo "file")
```

- Usa `FileInterceptor('file')` do `@nestjs/platform-express`.
- `fileFilter` restringe a `image/jpeg`, `image/png`, `image/webp`; rejeita
  outros mimetypes com erro 400.
- `limits.fileSize` = 5MB; excedente retorna erro 400.
- Nome do arquivo salvo: `${uuid()}${extname(original)}`, evitando colisões
  e path traversal.
- Diretório de destino: `backend/uploads/recipes/` (criado se não existir).
- Retorna `{ imageUrl: '/uploads/recipes/<arquivo>' }`.
- Endpoint requer autenticação (mesmo padrão dos demais endpoints de escrita
  de `recipes`, que não têm `@Public()`).

### Servindo arquivos estáticos

Em `main.ts`, configurar `app.useStaticAssets` (ou `NestExpressApplication`)
apontando para `backend/uploads`, montado em `/uploads`.

### `.gitignore`

Adicionar `backend/uploads/` ao `.gitignore` do backend — é conteúdo gerado
em runtime, não deve ser versionado.

## Frontend

### Modelo (`recipe.model.ts`)

`Recipe` e `RecipeInput` ganham `imageUrl?: string`.

### `RecipesService`

Novo método:

```ts
uploadImage(file: File): Observable<{ imageUrl: string }>
```

Faz `POST` multipart (`FormData`) para `/recipes/upload-image`.

### `recipe-edit` (formulário de criar/editar)

- Novo controle de upload de arquivo (`<input type="file" accept="image/jpeg,image/png,image/webp">`).
- Ao selecionar um arquivo, chama `uploadImage` imediatamente; enquanto
  aguarda, exibe estado de carregamento no controle.
- Ao receber `{ imageUrl }`, atualiza `form.imageUrl` e exibe preview da
  imagem (usando a própria `imageUrl` retornada, servida por `/uploads/...`).
- Em modo edição, se a receita já tiver `imageUrl`, o preview já aparece
  carregado ao entrar na tela.
- Submissão do formulário (`onSubmit`) continua sendo o POST/PUT JSON já
  existente, agora incluindo `imageUrl` no payload.
- Erros de upload (formato/tamanho inválido) exibem mensagem e não bloqueiam
  o restante do formulário.

### Listagem (`recipes.component.html`)

Cada `mat-card` passa a exibir a imagem da receita no topo (`mat-card-image`
ou equivalente) quando `recipe.imageUrl` existir; caso contrário, um
placeholder visual simples (bloco com ícone/cor de fundo).

### Detalhe (`recipe-detail.component.html`)

O cabeçalho da receita exibe a imagem (quando existir) acima ou ao lado do
título/descrição.

## Fluxo de dados

1. Usuário seleciona arquivo no formulário de receita.
2. Frontend envia o arquivo para `POST /recipes/upload-image`.
3. Backend valida, salva em disco, responde com a URL pública do arquivo.
4. Frontend guarda essa URL em `form.imageUrl` e mostra o preview.
5. Ao salvar a receita, o payload JSON de sempre (create/update) inclui
   `imageUrl`.

Upload e salvamento da receita são duas requisições separadas — evita
reescrever os DTOs/endpoints existentes de `recipes` para `multipart`.

## Fora de escopo

- Remoção/limpeza de arquivos órfãos no disco quando uma receita troca ou
  deleta sua imagem (não implementado nesta iteração).
- Redimensionamento/otimização de imagem no servidor.
- Persistência de arquivos via volume Docker.
