# Example website with NL Design System and Next.js

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000/)

## Getting Started with Docker

First, run the development server with support for automatic reloading.

```bash
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up --remove-orphans
```

Open [localhost:3000](http://localhost:3000/)

Or run the production server:

```bash
docker-compose build
docker-compose up --remove-orphans
```

Open [localhost:3000](http://localhost:3000/)

Configure the following environment variables to connect with the API:

```text
NEXT_PUBLIC_API_URL=https://huwelijksplanner-gateway.commonground.nu/api
NEXT_PUBLIC_API_TOKEN=...
```
