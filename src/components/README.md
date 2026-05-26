# Components

## English

Stateless, presentational (dumb) components. They receive data and callbacks exclusively via props and have no direct knowledge of the API, global state, or business logic.

### Rules
- Must not import from `services/`, `context/`, or data-fetching hooks
- May import from `commons/` and other `components/`
- Each component lives in its own CamelCase folder

### Structure
```
ComponentName/
  index.ts                    ← re-exports the component as default
  ComponentName.tsx           ← JSX and render logic
  ComponentName.types.ts      ← Props interface (when non-trivial)
  ComponentName.constants.ts  ← Static values (when needed)
```

### Examples
`Button`, `Badge`, `ArtistCard`, `Pagination`, `LoadingSpinner`, `Table`

---

## Português

Componentes sem estado, puramente apresentacionais. Recebem dados e callbacks exclusivamente via props, sem conhecimento direto de API, estado global ou lógica de negócio.

### Regras
- Não deve importar de `services/`, `context/` ou hooks de busca de dados
- Pode importar de `commons/` e de outros `components/`
- Cada componente fica em sua própria pasta CamelCase

### Estrutura
```
ComponentName/
  index.ts
  ComponentName.tsx
  ComponentName.types.ts
  ComponentName.constants.ts
```

### Exemplos
`Button`, `Badge`, `ArtistCard`, `Pagination`, `LoadingSpinner`, `Table`
