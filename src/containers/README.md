# Containers

## English

Stateful (smart) components. They connect to hooks, React Query, and Context to orchestrate data and logic, then delegate rendering to presentational components.

### Rules
- Containers fetch data and manage local UI state
- They must delegate rendering to `components/` or compose `screens/`
- Each container lives in its own CamelCase folder following the same structure as components

### Examples
`ArtistGrid`, `SearchBar`, `ArtistDetailHeader`, `TopTracksSection`, `FavoritesForm`

---

## Português

Componentes com estado (smart). Conectam-se a hooks, React Query e Context para orquestrar dados e lógica, delegando a renderização para componentes apresentacionais.

### Regras
- Containers buscam dados e gerenciam estado local de UI
- Devem delegar a renderização para `components/` ou compor `screens/`
- Cada container fica em sua própria pasta CamelCase

### Exemplos
`ArtistGrid`, `SearchBar`, `ArtistDetailHeader`, `TopTracksSection`, `FavoritesForm`
