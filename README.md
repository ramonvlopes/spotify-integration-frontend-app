# Spotify Explorer

> 🇧🇷 [Versão em Português abaixo](#portuguese)

A futuristic dark-themed frontend application to explore Spotify artists and albums, view discographies, and manage a personal favorites list — built as a Kanastra frontend hiring challenge.

🔗 **Live demo:** [https://spotfy-integration-app.web.app](https://spotfy-integration-app.web.app/)

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS + Space Grotesk / Inter |
| State | Context API + useReducer |
| Server state | TanStack Query v5 |
| HTTP | Axios |
| Forms | React Hook Form + Zod |
| i18n | react-i18next (PT-BR + EN-US) |
| Charts | Recharts |
| Icons | react-icons (via `commons/icons`) |
| Testing | Vitest + React Testing Library |
| Linting | ESLint (zero warnings) |
| Deploy | Firebase Hosting |

---

## Features

- **Artist & album search** — search by artist name or album name with 500ms debounce
- **Featured content** — curated artist and album grids shown before any search
- **Paginated grid** — 10 items per page, glassmorphism card layout
- **Artist detail** — cinematic hero, genres, followers, popularity bar, Spotify link
- **Top tracks** — table with track name and duration from the latest album
- **Popularity chart** — Recharts bar chart of discography tracks count per album
- **Discography** — paginated album grid; click any album to open its track list in a modal (bottom-sheet on mobile)
- **Favorites** — heart-button on every artist and album card; saved to localStorage; dedicated favorites screen
- **i18n** — PT-BR / EN-US toggle in the header
- **Futuristic UI** — void-black base, neon glows, glassmorphism, gradient text, shimmer skeletons

---

## Authentication

Uses **OAuth 2.0 Client Credentials** flow — a machine-to-machine token fetched client-side via `VITE_SPOTIFY_CLIENT_ID` and `VITE_SPOTIFY_CLIENT_SECRET`. No Spotify account is required to use the app.

> In production, the **Authorization Code + PKCE** flow would be preferred (no secret exposed client-side).

---

## Known Limitations

Spotify's Web API caps `limit` at **10** for unverified apps in development mode. Extended Quota Mode (removed with Spotify's approval) would lift this to 50.

The batch `/artists?ids=` endpoint returns 403 in development mode — featured artists are fetched individually via `useQueries`.

---

## Getting Started

### Prerequisites

- Node.js 18+
- [Spotify Developer](https://developer.spotify.com/dashboard) account

### 1. Create a Spotify App

1. Open [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click **Create app**
3. Set Redirect URI to `http://localhost:5173/callback`
4. Select **Web API**
5. Copy **Client ID** and **Client Secret**

### 2. Clone & install

```bash
git clone https://github.com/ramonvlopes/spotify-integration-frontend-app.git
cd spotify-integration-frontend-app
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

```env
VITE_SPOTIFY_CLIENT_ID=your_client_id
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint (zero warnings) |
| `npm run test` | Tests in watch mode |
| `npm run test:coverage` | Coverage report |
| `npm run deploy` | Build + deploy to Firebase |

---

## Project Structure

```
src/
├── components/     # Presentational components
├── containers/     # Data-fetching / stateful containers
├── screens/        # Page-level route components
├── commons/
│   ├── constants/  # Query keys and static values
│   ├── helpers/    # Pure transformation functions
│   └── icons/      # Icon abstraction layer
├── context/        # Global state (App, Search, Favorites)
├── hooks/          # Custom reusable hooks
├── i18n/           # i18next config + locale JSON
└── services/
    ├── core/       # Axios instance + token management
    ├── artists/    # Artist search & detail
    └── albums/     # Album detail, tracks & search
```

---

## Code Standards

- **200-line max** per file
- **No inline comments** in source code
- **Pre-commit hook** (Husky + lint-staged): ESLint on every staged `.ts`/`.tsx`
- **Zero ESLint warnings** via `--max-warnings 0`

---

## Next Steps

- **E2E testing with Playwright** — the current test suite covers unit and component tests via Vitest + React Testing Library. The natural next layer is end-to-end testing. Playwright was chosen as the tool of choice due to its first-class TypeScript support, cross-browser coverage (Chromium, Firefox, WebKit), built-in network interception for mocking Spotify API responses, and a powerful locator API that aligns well with accessibility-first selectors. Priority flows to cover: artist search and navigation, favorites add/remove cycle, album modal open/close, and language toggle.
- **CI/CD pipeline with GitHub Actions + Firebase Hosting** — automate the full build, lint, test, and deploy cycle on every push to `main`. The workflow would run `npm run lint`, `npm run test -- --run`, and `npm run build`, then deploy to Firebase Hosting via the official `FirebaseExtended/action-hosting-deploy` action using repository secrets for the Firebase token and Spotify credentials. Pull request previews would also be enabled, spinning up a temporary Firebase preview channel for every PR so reviewers can test changes live before merging.

---

## License

MIT

---

<a name="portuguese"></a>

# Spotify Explorer — PT-BR

> 🇺🇸 [English version above](#spotify-explorer)

Aplicação frontend com tema futurista escuro para explorar artistas e álbuns do Spotify, visualizar discografias e gerenciar uma lista pessoal de favoritos — desenvolvida como desafio técnico frontend da Kanastra.

🔗 **Visualizar projeto:** [https://spotfy-integration-app.web.app](https://spotfy-integration-app.web.app/)

---

## Stack

| Categoria | Tecnologia |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Estilo | Tailwind CSS + Space Grotesk / Inter |
| Estado | Context API + useReducer |
| Estado do servidor | TanStack Query v5 |
| HTTP | Axios |
| Formulários | React Hook Form + Zod |
| i18n | react-i18next (PT-BR + EN-US) |
| Gráficos | Recharts |
| Ícones | react-icons (via `commons/icons`) |
| Testes | Vitest + React Testing Library |
| Lint | ESLint (zero warnings) |
| Deploy | Firebase Hosting |

---

## Funcionalidades

- **Busca de artistas e álbuns** — busca por nome de artista ou álbum com debounce de 500ms
- **Conteúdo em destaque** — grades curadas de artistas e álbuns exibidas antes de qualquer busca
- **Grade paginada** — 10 itens por página com layout de cards glassmorphism
- **Detalhe do artista** — hero cinemático, gêneros, seguidores, barra de popularidade, link do Spotify
- **Músicas mais tocadas** — tabela com nome da faixa e duração do álbum mais recente
- **Gráfico de popularidade** — gráfico de barras Recharts com contagem de faixas por álbum
- **Discografia** — grade de álbuns paginada; clique em qualquer álbum para abrir as faixas em modal (bottom-sheet no mobile)
- **Favoritos** — botão de coração em todos os cards de artistas e álbuns; salvo no localStorage; tela dedicada de favoritos
- **i18n** — alternância PT-BR / EN-US no cabeçalho
- **UI futurista** — fundo void-black, neon glows, glassmorphism, texto com gradiente, skeletons com shimmer

---

## Autenticação

Utiliza o fluxo **OAuth 2.0 Client Credentials** — token machine-to-machine obtido no cliente via `VITE_SPOTIFY_CLIENT_ID` e `VITE_SPOTIFY_CLIENT_SECRET`. Nenhuma conta Spotify é necessária para usar o app.

> Em produção, o fluxo **Authorization Code + PKCE** seria preferível (sem expor o secret no cliente).

---

## Limitações Conhecidas

A API do Spotify limita o `limit` a **10** para apps não verificados em modo de desenvolvimento. O Extended Quota Mode (liberado com aprovação do Spotify) aumentaria esse limite para 50.

O endpoint batch `/artists?ids=` retorna 403 em modo de desenvolvimento — os artistas em destaque são buscados individualmente via `useQueries`.

---

## Como Rodar

### Pré-requisitos

- Node.js 18+
- Conta no [Spotify for Developers](https://developer.spotify.com/dashboard)

### 1. Criar um App no Spotify

1. Acesse o [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Clique em **Create app**
3. Defina o Redirect URI como `http://localhost:5173/callback`
4. Selecione **Web API**
5. Copie o **Client ID** e o **Client Secret**

### 2. Clonar e instalar

```bash
git clone https://github.com/ramonvlopes/spotify-integration-frontend-app.git
cd spotify-integration-frontend-app
npm install
```

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

```env
VITE_SPOTIFY_CLIENT_ID=seu_client_id
VITE_SPOTIFY_CLIENT_SECRET=seu_client_secret
```

### 4. Rodar

```bash
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173).

---

## Scripts

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Verificação de tipos + build de produção |
| `npm run preview` | Pré-visualiza o build de produção |
| `npm run lint` | ESLint (zero warnings) |
| `npm run test` | Testes em modo watch |
| `npm run test:coverage` | Relatório de cobertura |
| `npm run deploy` | Build + deploy no Firebase |

---

## Estrutura do Projeto

```
src/
├── components/     # Componentes apresentacionais
├── containers/     # Containers com estado e busca de dados
├── screens/        # Componentes de página (uma por rota)
├── commons/
│   ├── constants/  # Query keys e valores estáticos
│   ├── helpers/    # Funções de transformação puras
│   └── icons/      # Camada de abstração de ícones
├── context/        # Estado global (App, Search, Favorites)
├── hooks/          # Hooks customizados reutilizáveis
├── i18n/           # Configuração i18next + JSONs de locale
└── services/
    ├── core/       # Instância Axios + gerenciamento de token
    ├── artists/    # Busca e detalhe de artistas
    └── albums/     # Detalhe, faixas e busca de álbuns
```

---

## Padrões de Código

- **Máximo de 200 linhas** por arquivo
- **Sem comentários inline** no código-fonte
- **Pre-commit hook** (Husky + lint-staged): ESLint em todo `.ts`/`.tsx` staged
- **Zero ESLint warnings** via `--max-warnings 0`

---

## Próximos Passos

- **Testes E2E com Playwright** — a suíte atual cobre testes unitários e de componentes via Vitest + React Testing Library. A camada natural seguinte são testes end-to-end. O Playwright foi escolhido como ferramenta por seu suporte de primeira classe a TypeScript, cobertura multi-browser (Chromium, Firefox, WebKit), interceptação de rede nativa para mockar as respostas da API do Spotify e uma API de localizadores que se alinha bem com seletores orientados a acessibilidade. Fluxos prioritários a cobrir: busca e navegação de artistas, ciclo de adicionar/remover favoritos, abertura e fechamento do modal de álbum, e troca de idioma.
- **Pipeline de CI/CD com GitHub Actions + Firebase Hosting** — automatizar o ciclo completo de build, lint, testes e deploy a cada push na `main`. O workflow executaria `npm run lint`, `npm run test -- --run` e `npm run build`, realizando o deploy no Firebase Hosting via a action oficial `FirebaseExtended/action-hosting-deploy` com secrets de repositório para o token do Firebase e as credenciais do Spotify. Previews para pull requests também seriam habilitados, criando um canal temporário no Firebase para cada PR e permitindo que revisores testem as alterações ao vivo antes do merge.

---

## Licença

MIT
