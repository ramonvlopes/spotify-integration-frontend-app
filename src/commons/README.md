# Commons

## English

Shared, framework-agnostic utilities organized into sub-folders by concern.

### Sub-folders
| Folder | Purpose |
|--------|---------|
| `constants/` | App-wide static values: route paths, React Query keys, pagination defaults |
| `helpers/` | Pure domain transformation functions: format duration, format followers, format date |
| `utils/` | Pure generic utility functions: debounce logic (non-hook), localStorage wrapper |
| `icons/` | Icon abstraction layer — see `icons/README.md` |

### Rules
- Nothing in `commons/` may import React or any app-specific module
- All functions must be pure and easily unit-testable

---

## Português

Utilitários compartilhados e independentes de framework, organizados em sub-pastas por responsabilidade.

### Sub-pastas
| Pasta | Propósito |
|-------|-----------|
| `constants/` | Valores estáticos globais: rotas, React Query keys, padrões de paginação |
| `helpers/` | Funções puras de transformação de domínio: formatar duração, seguidores, data |
| `utils/` | Funções utilitárias genéricas puras |
| `icons/` | Camada de abstração de ícones — ver `icons/README.md` |

### Regras
- Nada em `commons/` pode importar React ou módulos específicos do app
- Todas as funções devem ser puras e facilmente testáveis
