# SPEC-06 — Context API + useReducer

## Goal
Implement the global client-state layer using React Context + `useReducer`, as required by the tech spec. This layer owns UI state that doesn't belong in React Query (server state) or in component-local state.

---

## Contexts to Implement

### 1. `AppContext` — global UI preferences
**State:**
```ts
interface AppState {
  language: 'en-US' | 'pt-BR'
  searchType: 'artist' | 'album'
}
```
**Actions:** `SET_LANGUAGE`, `SET_SEARCH_TYPE`

**Used by:** `LanguageSwitcher`, `SearchBar`

---

### 2. `SearchContext` — search & pagination state
**State:**
```ts
interface SearchState {
  query: string
  searchType: 'artist' | 'album'
  currentPage: number
}
```
**Actions:** `SET_QUERY`, `SET_SEARCH_TYPE`, `SET_PAGE`, `RESET_SEARCH`

**Used by:** `SearchBar`, `ArtistGrid`, `Pagination`

---

## File Structure

Each context lives under `src/context/ContextName/`:

```
context/
  AppContext/
    index.ts
    AppContext.context.tsx   ← createContext + Provider + useAppContext hook
    AppContext.reducer.ts
    AppContext.actions.ts
    AppContext.types.ts
  SearchContext/
    index.ts
    SearchContext.context.tsx
    SearchContext.reducer.ts
    SearchContext.actions.ts
    SearchContext.types.ts
```

---

## Implementation Pattern

### `*.actions.ts`
```ts
export const APP_ACTIONS = {
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_SEARCH_TYPE: 'SET_SEARCH_TYPE',
} as const
```

### `*.types.ts`
```ts
import { APP_ACTIONS } from './AppContext.actions'

export interface AppState { ... }

export type AppAction =
  | { type: typeof APP_ACTIONS.SET_LANGUAGE; payload: AppState['language'] }
  | { type: typeof APP_ACTIONS.SET_SEARCH_TYPE; payload: AppState['searchType'] }
```

### `*.reducer.ts`
```ts
export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case APP_ACTIONS.SET_LANGUAGE:
      return { ...state, language: action.payload }
    // ...
    default:
      return state
  }
}
```

### `*.context.tsx`
```tsx
const AppContext = createContext<{ state: AppState; dispatch: Dispatch<AppAction> } | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}
```

---

## Provider Tree in `App.tsx`
```tsx
<AppProvider>
  <SearchProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider ... />
    </QueryClientProvider>
  </SearchProvider>
</AppProvider>
```

---

## File Size Budget
Each file in a context folder stays under 60 lines by design of the pattern.

---

## Acceptance Criteria
- [ ] `useAppContext()` throws a meaningful error when used outside `AppProvider`
- [ ] `useSearchContext()` throws a meaningful error when used outside `SearchProvider`
- [ ] Dispatching `SET_LANGUAGE` updates language state
- [ ] Dispatching `SET_QUERY` + `RESET_SEARCH` behaves correctly
- [ ] Dispatching `SET_PAGE` increments/decrements page
- [ ] All context files stay under 200 lines
- [ ] Unit tests cover reducer functions for all actions
