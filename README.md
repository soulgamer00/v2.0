# VBD-DB v2.0

Vector-Borne Disease Database - Modern Offline-First System

## Tech Stack

- **Framework:** SvelteKit (Node.js Adapter)
- **Language:** TypeScript (Strict Mode)
- **Database:** PostgreSQL 16 (Docker)
- **ORM:** Prisma
- **Auth:** Custom (Bcryptjs + HttpOnly Cookies + Session Table)
- **Offline:** Dexie.js (IndexedDB)
- **Reporting:** Chart.js + jsPDF
- **Import/Export:** xlsx (SheetJS)
- **UI:** Tailwind CSS + DaisyUI

## Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start PostgreSQL (Docker):**
   ```bash
   npm run docker:up
   ```

3. **Configure Environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

4. **Initialize Database:**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. **Start Development Server:**
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run docker:up` - Start PostgreSQL container
- `npm run docker:down` - Stop PostgreSQL container

## Project Structure

```
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── lib/               # Shared utilities
│   ├── routes/            # SvelteKit routes
│   └── app.html           # App template
├── docker-compose.yml     # PostgreSQL setup
└── package.json
```

# v2.0
