# Icons

## English

Single source of truth for all icons used in the application.

### Why this folder exists

All icons are imported and re-exported exclusively from this folder. If the icon library (`react-icons`) ever needs to be replaced with another (e.g., `lucide-react`, `phosphor-react`), **only this folder changes** — no search-and-replace across the codebase, no risk of missing usages or breaking components.

### Rule
**Never import directly from `react-icons` outside of this folder.**

### Usage
```tsx
import { SearchIcon, MusicIcon, HeartIcon } from '@/commons/icons'
```

### Structure
```
icons/
  index.ts       ← re-exports all icons from the files below
  music.icons.ts ← music-domain icons (music note, headphones, mic...)
  ui.icons.ts    ← general UI icons (search, close, chevron, star...)
  nav.icons.ts   ← navigation icons (arrow-left, home, external-link...)
```

---

## Português

Fonte única de verdade para todos os ícones usados na aplicação.

### Por que essa pasta existe

Todos os ícones são importados e re-exportados exclusivamente desta pasta. Se a biblioteca de ícones (`react-icons`) precisar ser substituída por outra, **apenas esta pasta precisa mudar** — sem busca-e-substituição por todo o projeto, sem risco de esquecer usages ou quebrar componentes.

### Regra
**Nunca importe diretamente de `react-icons` fora desta pasta.**

### Uso
```tsx
import { SearchIcon, MusicIcon, HeartIcon } from '@/commons/icons'
```

### Estrutura
```
icons/
  index.ts
  music.icons.ts
  ui.icons.ts
  nav.icons.ts
```
