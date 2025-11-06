# Choppi

Monorepo con:
- Backend (NestJS) en `./backend`
- Frontend (Next.js App Router) en `./frontend`

## Prerrequisitos
- Node.js 18+ (recomendado 20+)
- npm o pnpm
- Base de datos (ej. PostgreSQL) si tu backend la requiere

---

## Backend (NestJS)
Ruta: `./backend`

1) Instalar dependencias
- npm: `npm install`
- pnpm: `pnpm install`

2) Variables de entorno (.env)
Crea `./backend/.env` con valores acordes a tu entorno:
```
PORT=4000
JWT_SECRET=super_secret_key
# Ejemplo Postgres (ajusta según tu setup)
DATABASE_URL=postgres://user:pass@localhost:5432/choppi
```

3) (Opcional) Migraciones/seed
- Ajusta según tu setup de TypeORM/migrations (si aplica).

4) Levantar en desarrollo
- npm: `npm run start:dev`
- pnpm: `pnpm start:dev`

El backend quedará en: http://localhost:4000

---

## Frontend (Next.js)
Ruta: `./frontend`

1) Instalar dependencias
- npm: `npm install`
- pnpm: `pnpm install`

2) Variables de entorno (.env.local)
Crea `./frontend/.env`:
```
# URL del backend NestJS para los repositorios del core
BACKEND_URL=http://localhost:4000
```

3) Levantar en desarrollo
- npm: `npm run dev`
- pnpm: `pnpm dev`

El frontend quedará en: http://localhost:3000

---

## Flujo básico
- Inicia sesión en http://localhost:3000 (ruta raíz).
- Redirige a `/stores`:
  - Comprador: lista de tiendas y los productos por tienda.
  - Admin: además puede crear tiendas/productos y borrarlos.

Cookies de sesión:
- El login del frontend setea cookie `session` (HTTP-only, SameSite=Lax, Path=/).
- Las rutas API del frontend reenvían el JWT de la cookie al backend automáticamente.
