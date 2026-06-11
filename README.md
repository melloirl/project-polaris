# Project Polaris

Clean Nuxt frontend starter using Bun, TypeScript, SCSS, and Docker.

## Local Development

Install dependencies:

```bash
bun install
```

Start the Nuxt dev server:

```bash
bun run dev
```

Run quality checks:

```bash
bun run check
```

Build for production:

```bash
bun run build
```

Preview the production build locally:

```bash
bun run preview
```

## Docker

Build and run the frontend container:

```bash
docker compose up --build
```

The app is served on `http://localhost:3000` by default. Override the host port with `FRONTEND_PORT`.
