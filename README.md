# ButterflyArt.sv — Crochet Portfolio (MVP)

Stack: **React + Vite + TailwindCSS (JS)** · **Framer Motion** · **React Router** · **react-hook-form + Zod** · **Firebase (Auth, Firestore, Storage)**

> Marca: [@butterflyart.sv en Instagram](https://www.instagram.com/butterflyart.sv/) · Identidad visual artesanal con espíritu “mariposa”.

## Características (MVP)
- Home/Hero animado (Framer Motion), CTA **Ver Galería** y **Pedir Personalizado**.
- **Galería** con grid _masonry_, filtros por categoría/tags, búsqueda y _lazy loading_.
- **Detalle de pieza** con carrusel arrastrable, ficha técnica, rango de precio y _badge_ **Personalizable**.
- **Pedidos personalizados** (formulario validado con react-hook-form + Zod) → guarda en `orders` y simula envío de email en consola.
- **Testimonios** y **Acerca de**.
- **Contacto** con enlaces a WhatsApp/Instagram.
- **Admin** protegido con Firebase Auth (email/password). CRUD básico de `products`, `categories`, `testimonials`. Subida a Storage con variantes (`cover`, `card`, `thumb`) y metadatos en Firestore. Estados `draft/published` y `createdAt/updatedAt/tags`.
- Accesible (WCAG AA), SEO-friendly (meta + schema.org), performante (LCP objetivo < 2.5s).

## Estructura
```
/ (repo root)
├─ /client                # Vite + React + Tailwind
│  ├─ /public
│  ├─ /src
│  │  ├─ /assets
│  │  ├─ /components      # Button, Card, Navbar, Footer, ImageCard, MasonryGrid, Badge, Modal
│  │  ├─ /features
│  │  │  ├─ gallery       # pages, components, hooks
│  │  │  ├─ product
│  │  │  ├─ orders
│  │  │  ├─ admin
│  │  ├─ /hooks
│  │  ├─ /lib             # firebase.ts, seo.ts, analytics.ts
│  │  ├─ /pages           # Home.tsx, Gallery.tsx, ProductDetail.tsx, CustomOrder.tsx, About.tsx, Contact.tsx, Admin*.tsx
│  │  ├─ /routes
│  │  ├─ /styles          # tailwind.css
│  │  ├─ /types
│  │  └─ main.tsx
│  ├─ index.html
│  ├─ tailwind.config.js
│  ├─ postcss.config.js
│  └─ vite.config.ts
├─ /firebase              # reglas y utilidades
├─ /server                # (opcional) Spring Boot skeleton (README + placeholders)
└─ .github/workflows      # CI
```

## Requisitos
- Node.js 20+
- Cuenta Firebase (Firestore/Storage/Auth habilitados)

## Configuración rápida
1. **Clonar e instalar**:
   ```bash
   git clone <tu-repo.git>
   cd ButterflyArt.sv/client
   npm i
   ```
2. **Variables**: copia `.env.example` → `.env` y rellena tus valores de Firebase y GA4.
3. **Tailwind** ya configurado.
4. **Firebase**: revisa `/firebase/firestore.rules` y `/firebase/storage.rules` (borrador seguro).
5. **Dev**:
   ```bash
   npm run dev
   ```
6. **Admin**: crea un usuario con email/password en Firebase Auth y asígnale `customClaims.role = "ADMIN"` (ver nota abajo).

### Reglas/Claims de Admin
- Lectura pública: `products` con `status == "published"`.
- Escritura: solo usuarios con `customClaims.role == "ADMIN"`.
- `orders`: creación pública; lectura solo ADMIN.

> Asigna el rol mediante Cloud Functions o script de administración (ver `/client/scripts/set-admin-claim.mjs`).

## Seeds
- `npm run seed:firebase` para insertar categorías, productos de ejemplo (8–12), y 3 testimonios. Requiere **Firebase Admin** y credencial `GOOGLE_APPLICATION_CREDENTIALS`. También puedes usar `/features/admin/SeedButton` (sólo en modo dev si `VITE_ENABLE_SEED=true`).

## CI
- GitHub Actions: lint + build.

## Deploy
- Netlify / Vercel. Configurar variables de entorno y redirecciones SPA (`/* -> /index.html`).

## TODO (Issues sugeridos)
- Integrar Instagram (Basic Display API) en `/features/instagram`.
- Email service real para pedidos.
- Migrar a imágenes optimizadas con workers (Cloudflare/Imgix).
- i18n ES/EN.

