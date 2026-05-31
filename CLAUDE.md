# Diamond Lux — Website Memory

## Stack
- **Tipo**: Sitio HTML standalone (sin framework) servido con `npx serve@latest public`
- **Hosting**: Hostinger Business — Node.js app (framework: Other)
- **Dominio**: www.diamondlux.com.au
- **GitHub**: https://github.com/javier-m-esc/diamond-lux

## Archivo principal
El sitio está en **`public/index.html`** — este es el único archivo que hay que editar para cambiar el diseño o contenido del sitio web.

- `public/mail.php` — formulario de contacto, envía a javier@diamondlux.com.au
- `public/preview.html` — copia de index.html para preview local

## Flujo para editar el sitio

1. **Editar** `public/index.html` (o `public/mail.php` si es el formulario)
2. **Hacer commit y push** a GitHub (rama `main`)
3. Hostinger **auto-deploya** en 1-3 minutos (auto-deployment activo)
4. Si el sitio no se actualiza visualmente → **Flush cache** en hPanel → Performance → CDN → Flush cache

## Cómo ver preview local
```bash
cd ~/diamond-lux
npx serve@latest public -l 3002
# Abrir http://localhost:3002/index.html
```

## Estructura del repo
```
diamond-lux/
├── public/           ← AQUÍ ESTÁ EL SITIO WEB
│   ├── index.html    ← ARCHIVO PRINCIPAL (editar este)
│   ├── mail.php      ← Formulario de contacto
│   └── preview.html  ← Copia para preview
├── .htaccess         ← Apache config (no tocar)
├── index.html        ← Copia en raíz (Hostinger fallback)
├── mail.php          ← Copia en raíz (Hostinger fallback)
└── package.json      ← start: "npx serve@latest public"
```

## Diseño
- Colores: `--accent: #b8a88a` (gold), `--black: #080808`, `--charcoal: #111111`
- Fuentes: Cormorant Garamond (serif, títulos) + Jost (sans-serif, body)
- Estilo: dark luxury, minimalista

## Configuración Hostinger
- Framework: Other
- Build command: (vacío)
- Output directory: public
- Start: `npx serve@latest public` (en package.json)
- Auto-deployment: ON (push a main → deploy automático)
- CDN: Activo — flush cache si los cambios no se ven
