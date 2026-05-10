# Portfolio

Personal portfolio site built with **Next.js** (App Router), **React**, **Tailwind CSS**, and **Framer Motion**.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Development server       |
| `npm run build` | Production build        |
| `npm run start` | Run production build    |
| `npm run lint` | ESLint                   |

## Customize

- **Copy & meta:** `src/lib/data.ts` — hero text, projects (titles, links, tags, images), contact links.
- **Images:** put files under `public/` (e.g. `public/images/...`) and reference them with paths starting with `/` in `data.ts`.
- **Layout & sections:** `src/app/page.tsx`, `src/components/`.

## Deploy

Deploy like any Next.js app (e.g. [Vercel](https://vercel.com)) by connecting this repo and using the default build settings (`npm run build`, output handled by Next).
