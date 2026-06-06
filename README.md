# Game Hub

A React + Vite game discovery dashboard built with Chakra UI, React Router, React Query, Zustand, and the RAWG video games API.

## 🚀 Project Overview

Game Hub lets users browse games with:

- infinite scroll game grid
- platform filters
- genre filters
- sort options
- search
- dark/light mode support
- responsive layout for desktop and mobile

### Desktop Preview

![](/public/screenshots/home-desktop.png)

![](/public/screenshots/game-desktop.png)

### Mobile Preview

![](/public/screenshots/mobile-home.png)

## 🔧 Tech Stack

- React 19
- Vite
- TypeScript
- Chakra UI
- React Router DOM
- React Query (@tanstack/react-query)
- Zustand
- Axios
- RAWG API

## 📁 Key Architecture

- `src/main.tsx` sets up global providers:
  - `ChakraProvider`
  - `ColorModeProvider`
  - `QueryClientProvider`
  - `RouterProvider`
- `src/routes.tsx` defines the application routes:
  - `/` → `HomePage`
  - `/games/:slug` → `GameDetailPage`

```ts
import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import GameDetailPage from "./pages/GameDetailPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "games/:slug", element: <GameDetailPage /> },
    ],
  },
]);

export default router;
```

## 🧠 Data Fetching & State

The app uses `zustand` for filter state and `@tanstack/react-query` for paginated game fetching.

### API client

`src/services/api-client.ts` abstracts RAWG requests:

```ts
import axios, { type AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  results: T[];
  next: string | null;
}

const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "a6c4c31bb05c4347be4f4444c2c1abd4",
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) =>
    axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);

  get = (id: number | string) =>
    axiosInstance.get<T>(this.endpoint + "/" + id).then((res) => res.data);
}

export default APIClient;
```

### Global query store

`src/store.ts` keeps the selected genre, platform, sort order, and search text:

```ts
import { create } from "zustand";

interface GameQueryStore {
  gameQuery: {
    genreId?: number;
    platformId?: number;
    sortOrder?: string;
    searchText?: string;
  };
  setSearchText: (searchText: string) => void;
  setGenreId: (genreId: number) => void;
  setPlatformId: (platformId: number) => void;
  setSortOrder: (sortOrder: string) => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: {},
  setSearchText: (searchText) => set(() => ({ gameQuery: { searchText } })),
  setGenreId: (genreId) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, genreId } })),
  setPlatformId: (platformId) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, platformId } })),
  setSortOrder: (sortOrder) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, sortOrder } })),
}));

export default useGameQueryStore;
```

## 📦 Infinite Scroll Game Grid

The homepage renders a paginated game grid and loads more games as the user scrolls.

```tsx
import useGames from "@/hooks/useGames";
import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";

const GameGrid = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useGames();

  if (error) return <Text>{error.message}</Text>;

  return (
    <InfiniteScroll
      dataLength={
        data?.pages.reduce((total, page) => total + page.results.length, 0) || 0
      }
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={<Spinner />}
    >
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
        {/* cards here */}
      </SimpleGrid>
    </InfiniteScroll>
  );
};
```

## ⚙️ Installation

```bash
npm install
```

## 🧪 Run locally

```bash
npm run dev
```

Open the local URL shown in the terminal.

## 🔨 Build for production

```bash
npm run build
```

Preview a production build:

```bash
npm run preview
```

## 💡 Customization

- Update API key in `src/services/api-client.ts`
- Add or modify filter options in `src/components/GenreList.tsx`, `src/components/PlatformSelector.tsx`, and `src/components/SortSelector.tsx`
- Adjust layout and theming in `src/components/ui/provider.tsx` and `src/index.css`

## 📷 Screenshots

1. Home page with filters and grid
   - `docs/screenshots/homepage.png`
2. Game detail page with trailer and screenshots
   - `docs/screenshots/game-detail.png`
3. Mobile layout
   - `docs/screenshots/mobile.png`

> Replace these placeholders with real images in the docs folder or the repository root.

## 🧭 Project Structure

- `src/pages/` — page-level routes and layouts
- `src/components/` — reusable UI components
- `src/hooks/` — data fetching hooks
- `src/services/` — API and utility services
- `src/store.ts` — Zustand state store
- `src/entities/` — type definitions for game models

## 📌 Notes

- `@tanstack/react-query` caches game data and handles infinite loading.
- `Chakra UI` is used for responsive layout, theming, and accessible components.
- The app consumes the RAWG API and currently uses a hard-coded API key in `api-client.ts`.

## 📝 License

This project is open source and free to use.
