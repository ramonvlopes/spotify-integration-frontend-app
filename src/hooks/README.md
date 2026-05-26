# Hooks

## English

Custom React hooks that encapsulate reusable stateful logic.

### Rules
- Hook names are always prefixed with `use`
- Hooks in this folder must be generic and reusable across the app
- Hooks tightly coupled to a single container should live alongside that container
- Each hook has its own file with a corresponding `.test.ts` file

### Examples
| Hook | Purpose |
|------|---------|
| `useDebounce` | Delays a value update by a specified number of ms |
| `useLocalStorage` | Reads and writes a typed value to localStorage |
| `usePagination` | Derives pagination state from a total count and page size |

---

## Português

Custom React hooks que encapsulam lógica com estado reutilizável.

### Regras
- Nomes de hooks sempre prefixados com `use`
- Hooks nesta pasta devem ser genéricos e reutilizáveis
- Hooks acoplados a um único container ficam junto ao container
- Cada hook tem seu próprio arquivo com um `.test.ts` correspondente
