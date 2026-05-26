# Context

## English

Global client-state management using React Context + `useReducer`, as required by the technical spec.

### When to use Context vs React Query
- **React Query** owns server state: cached API responses, loading/error states for API calls
- **Context** owns client state: UI preferences (language), search filters, pagination state not tied to a URL

### Structure per context
```
ContextName/
  index.ts                    ← re-exports Provider and hook
  ContextName.context.tsx     ← createContext + Provider + useContextName hook
  ContextName.reducer.ts      ← pure reducer function
  ContextName.actions.ts      ← action type constants
  ContextName.types.ts        ← State and Action union types
```

### Available contexts
| Context | State |
|---------|-------|
| `AppContext` | `language`, `searchType` |
| `SearchContext` | `query`, `searchType`, `currentPage` |

---

## Português

Gerenciamento de estado global do cliente usando React Context + `useReducer`.

### Quando usar Context vs React Query
- **React Query** gerencia estado do servidor: respostas de API em cache, estados de loading/erro
- **Context** gerencia estado do cliente: preferências de UI (idioma), filtros de busca, paginação
