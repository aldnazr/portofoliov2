# Theme System: System / Light / Dark with Persistence

## Goal & Context

Add a three-state theme system (System / Forced Light / Forced Dark) with a switcher component and `localStorage` persistence to this Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript portfolio.

**Current state:** The site is hardcoded dark-only. `globals.css` pins `--background: #08090d` and `color-scheme: dark`; every component uses hardcoded dark classes (`bg-[#0c0e14]`, `text-zinc-400`, `border-white/10`, `bg-white/5`, white-alpha overlays). No theme infrastructure exists (no `next-themes`, no `data-theme`, no `dark:` variants).

**Reference:** The implementation follows the official Next.js 16 guide at `node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md` (inline pre-paint script + `suppressHydrationWarning` pattern).

## Locked Decisions

| Decision | Choice |
|---|---|
| Implementation | Hand-rolled, no new dependencies |
| Styling strategy | Semantic CSS token vocabulary (one systematic pass over components) |
| Switcher UI | 3-button segmented control (monitor / sun / moon icons) |
| Default state | System (follows `prefers-color-scheme`; nothing stored until explicit choice) |
| Light palette | Cool zinc (`#fafafa` page, white cards) + emerald-600/700 accents for AA contrast |
| Placement | Header right action area, visible at all breakpoints (availability badge hidden below `sm` to make room) |
| System mechanism | CSS `light-dark()` + per-`data-theme` `color-scheme`; live OS changes react with zero JS |
| Storage | `localStorage` key `theme`, values `system` \| `light` \| `dark` |

## Architecture

- `<html data-theme="system">` server-rendered (static prerendering preserved; no cookies/headers read).
- Blocking inline `<script>` in `<head>` reads `localStorage.theme`, validates it, and sets `data-theme` on `<html>` **before first paint** → no flash, no hydration error (`suppressHydrationWarning` on `<html>`).
- CSS resolves colors via `light-dark()` driven by `color-scheme`:
  - `:root { color-scheme: dark }` static fallback (see pitfall below)
  - Inside `@supports (color: light-dark(#fff, #000))`: `:root { color-scheme: light dark }` plus forced overrides `:root[data-theme="light"] { color-scheme: light }` / `:root[data-theme="dark"] { color-scheme: dark }`.
  - System mode: `color-scheme: light dark` makes `light-dark()` follow the OS live — no `matchMedia` listener needed.
- Semantic tokens defined as `:root` custom properties (dark values as static fallback, `light-dark()` values inside `@supports`), aliased into Tailwind via the existing `@theme inline` block → generates utilities like `bg-surface`, `text-muted`, `border-hairline`, `hover:bg-overlay-strong`.
- Switcher: **no React state**. Active button styling is pure CSS keyed off the `html[data-theme]` attribute (correct from first paint, zero hydration mismatch). Click handlers set the attribute + `localStorage`. `aria-pressed` synced in a `useLayoutEffect` + on click.

### ⚠️ Critical pitfall — the `light-dark()` fallback trap

A duplicate-declaration fallback (`--x: #fff; --x: light-dark(a,b);`) **does not work for custom properties**: unsupported function tokens still parse as a valid custom property value, the later declaration wins the cascade, and `var(--x)` then computes to `initial` (transparent). Therefore all `light-dark()` overrides MUST be gated behind `@supports (color: light-dark(#fff, #000))`. Browsers without `light-dark()` get the static **dark** values (identical to today's site — zero visual regression for that band) with `color-scheme: dark` kept outside the `@supports` block so UA widgets stay consistent.

## Implementation Steps

### 1. `app/globals.css` — token foundation

- Remove `color-scheme: dark` from the `html` rule; replace with the `@supports`-gated `color-scheme` rules described above (base `:root { color-scheme: dark }`).
- Replace `:root { --background; --foreground }` with the full token set from the **Token Reference** below: each token gets its dark value as a plain declaration, then the `@supports` block overrides all with `light-dark(light, dark)`.
- Extend `@theme inline` with `--color-*` aliases for every token (following the existing `--color-background: var(--background)` pattern).
- Update `::selection` to use `--selection-bg` / `--selection-fg`.
- Add segmented-control CSS (uses tokens so it themes itself):

```css
.theme-seg-btn { color: var(--muted); }
.theme-seg-btn:hover { color: var(--foreground); }
[data-theme="system"] .theme-seg-btn[data-mode="system"],
[data-theme="light"]  .theme-seg-btn[data-mode="light"],
[data-theme="dark"]   .theme-seg-btn[data-mode="dark"] {
  color: var(--accent-strong);
  background-color: var(--accent-wash);
}
```

### 2. `app/layout.tsx` — pre-paint script

- `<html lang="en" data-theme="system" suppressHydrationWarning ...>` (keep existing font classes).
- Add to `<head>` (before body content; standard docs pattern, no CSP on this site):

```tsx
<script
  dangerouslySetInnerHTML={{
    __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"||t==="system")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
  }}
/>
```

- Optional polish: `export const viewport: Viewport` with media-based `themeColor` (`#fafafa` light / `#08090d` dark).

### 3. NEW `app/components/theme-toggle.tsx` — segmented control

- `"use client"`, **no useState**.
- Structure: `<div role="group" aria-label="Tema tampilan">` pill (`flex items-center gap-0.5 rounded-full border border-hairline bg-overlay p-0.5`) containing three `<button class="theme-seg-btn" data-mode="..." aria-pressed="..." aria-label="...">` with inline SVG icons (monitor / sun / moon, `stroke="currentColor"`, ~16px). Visual active state comes from the CSS in step 1 — do not drive it with React state.
- `setTheme(mode)`: `try { localStorage.setItem("theme", mode) } catch {}`, `document.documentElement.setAttribute("data-theme", mode)`, sync `aria-pressed` on all three buttons (via refs or `querySelectorAll`), optionally update `<meta name="theme-color">`.
- `useLayoutEffect` on mount: re-apply stored theme (guards against React StrictMode dev remount clearing `<html>` attributes — no-op in production, per docs guide) and sync `aria-pressed` from `document.documentElement.dataset.theme`.
- Buttons need `focus-visible` styling (ring with accent token) for keyboard a11y. Indonesian aria-labels to match site copy: "Tema: ikuti sistem" / "Tema: terang" / "Tema: gelap".
- Optional: `window.addEventListener("storage", ...)` to sync across tabs.

### 4. `app/components/header.tsx` — integration

- Insert `<ThemeToggle />` in the right action area (between availability badge and hamburger, or before the badge).
- Availability badge: add `hidden sm:flex` so the control fits on small screens (name span is already `hidden sm:inline`).
- Apply token mappings (pill `bg-[#0c0e14]/80` → `bg-surface/80`, etc. — see mapping table).

### 5. Extract `app/components/background-mesh.tsx` (small refactor)

`page.tsx`, `projects/[slug]/page.tsx` (identical 3-glow + grid markup) share one component; `not-found.tsx` (single glow) edited in place. Prevents triple-maintenance of the token edits. Grid-line gradients become `bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)]` (replacing `#ffffff05`/`#ffffff07`).

### 6. Token replacement pass — all components

Apply the **Class → Token mapping** below across: `page.tsx`, `projects/[slug]/page.tsx`, `not-found.tsx`, `hero-section.tsx`, `about-section.tsx`, `projects-section.tsx`, `project-card.tsx`, `project-visual.tsx`, `experience-section.tsx`, `contact-section.tsx`, `footer.tsx`, `button.tsx`, `section-header.tsx`. `reveal.tsx` has no color classes — untouched.

Per-file specials:
- **`hero-section.tsx`**: headline gradient `from-white via-zinc-200 to-emerald-400` → `from-foreground via-foreground to-accent` (acceptable simplification; dedicated gradient tokens only if fidelity is desired).
- **`button.tsx`**: primary → `bg-primary text-on-primary hover:bg-primary-hover` (keep emerald glow shadow); secondary → `border-hairline bg-overlay text-foreground-soft hover:bg-overlay-strong`.
- **`hero-section.tsx` / `contact-section.tsx`**: inner arrow-circle `bg-zinc-950/10` → `bg-on-primary-wash`.
- **`project-card.tsx`**: tech chips & image placeholder `bg-zinc-900` → `bg-surface-muted`.
- **`project-visual.tsx`**: ghost number `text-white/4` → `text-ghost`; identity gradient → `from-foreground via-foreground to-accent`; keep emerald/teal ambient glows as-is initially.
- **`experience-section.tsx`**: timeline inactive dot `bg-zinc-700` → `bg-shade`; its `border-[#0c0e14]` → `border-surface` (must match card surface).
- **`contact-section.tsx`**: inputs → `bg-overlay border-hairline text-foreground` + placeholder token (`placeholder:text-muted` — verify Tailwind v4 variant syntax); `focus:border-emerald-500/50` → `focus:border-accent`; error box red classes → danger tokens; success box → accent wash tokens.
- **`projects-section.tsx`**: active pagination `bg-emerald-500/20 text-emerald-400 border-emerald-500/30` → `bg-accent-wash-strong text-accent-strong border-accent-wash-border`.
- **`header.tsx`**: ping dot `bg-emerald-400`/`bg-emerald-500` → `bg-accent`.
- **Glow mesh divs**: keep `from-emerald-500/10 via-teal-500/5 …` gradients initially (subtler on light is acceptable); optional polish pass to boost light-mode strength via `var()` stops.
- Alpha modifiers on tokens (e.g. `bg-surface/80`) work in Tailwind v4 via `color-mix`.

## Token Reference

`light | dark` — static fallback value is the **dark** column.

| Token (`--x`, utility `x`) | Light | Dark (current) |
|---|---|---|
| `background` | `#fafafa` | `#08090d` |
| `surface` | `#ffffff` | `#0c0e14` |
| `surface-muted` | `#f4f4f5` | `#18181b` (zinc-900) |
| `shade` | `#d4d4d8` | `#3f3f46` (zinc-700) |
| `foreground` | `#18181b` | `#f3f4f6` |
| `foreground-soft` | `#3f3f46` | `#d4d4d8` (zinc-300) |
| `muted` | `#52525b` | `#a1a1aa` (zinc-400) |
| `subtle` | `#71717a` | `#71717a` (zinc-500) |
| `hairline` | `rgba(24,24,27,.10)` | `rgba(255,255,255,.10)` |
| `hairline-soft` | `rgba(24,24,27,.06)` | `rgba(255,255,255,.05)` |
| `overlay-faint` | `rgba(24,24,27,.03)` | `rgba(255,255,255,.02)` |
| `overlay` | `rgba(24,24,27,.05)` | `rgba(255,255,255,.05)` |
| `overlay-strong` | `rgba(24,24,27,.08)` | `rgba(255,255,255,.10)` |
| `ghost` | `rgba(24,24,27,.06)` | `rgba(255,255,255,.04)` |
| `accent` | `#059669` (emerald-600) | `#34d399` (emerald-400) |
| `accent-strong` | `#047857` (emerald-700, small text AA) | `#34d399` |
| `accent-hover` | `#047857` | `#6ee7b7` (emerald-300) |
| `accent-wash` | `rgba(5,150,105,.09)` | `rgba(16,185,129,.10)` |
| `accent-wash-border` | `rgba(5,150,105,.25)` | `rgba(16,185,129,.30)` |
| `accent-wash-strong` | `rgba(5,150,105,.16)` | `rgba(16,185,129,.20)` |
| `primary` | `#059669` | `#10b981` (emerald-500) |
| `primary-hover` | `#047857` | `#34d399` |
| `on-primary` | `#ffffff` | `#09090b` (zinc-950) |
| `on-primary-wash` | `rgba(255,255,255,.22)` | `rgba(9,9,11,.10)` |
| `danger` | `#dc2626` | `#f87171` |
| `danger-wash` | `rgba(220,38,38,.08)` | `rgba(239,68,68,.10)` |
| `danger-border` | `rgba(220,38,38,.30)` | `rgba(239,68,68,.30)` |
| `grid-line` (var only) | `rgba(24,24,27,.06)` | `rgba(255,255,255,.05)` |
| `selection-bg/-fg` (var only) | `rgba(5,150,105,.16)` / `#047857` | `rgba(16,185,129,.25)` / `#34d399` |

## Class → Token Mapping (recurring patterns)

| Current class(es) | Replacement |
|---|---|
| `bg-[#08090d]` | `bg-background` |
| `bg-[#0c0e14]` (incl. `/80`, `/95`) | `bg-surface` (alpha works via color-mix) |
| `bg-zinc-900` | `bg-surface-muted` |
| `text-white`, `text-zinc-100`, `hover:text-white` | `text-foreground`, `hover:text-foreground` |
| `text-zinc-300` | `text-foreground-soft` |
| `text-zinc-400` | `text-muted` |
| `text-zinc-500` | `text-subtle` |
| `border-white/10` | `border-hairline` |
| `border-white/5` | `border-hairline-soft` |
| `border-[#0c0e14]` | `border-surface` |
| `bg-white/2` | `bg-overlay-faint` |
| `bg-white/5` (incl. `hover:`) | `bg-overlay` (incl. `hover:`) |
| `bg-white/10` | `bg-overlay-strong` |
| `text-white/4` | `text-ghost` |
| `#ffffff05` / `#ffffff07` (grid stops) | `var(--grid-line)` |
| `text-emerald-400` | `text-accent-strong` (small/mono text) or `text-accent` (icons/dots) |
| `hover:text-emerald-300`, `group-hover:text-emerald-300/400` | `hover:text-accent-hover` etc. |
| `bg-emerald-500/10` | `bg-accent-wash` |
| `border-emerald-500/20`, `/30`, `hover:border-emerald-500/30|40`, `group-hover:border-emerald-500/30` | `border-accent-wash-border` (with matching variant) |
| `hover:bg-emerald-500/20`, `bg-emerald-500/20` | `bg-accent-wash-strong` |
| `focus:border-emerald-500/50` | `focus:border-accent` |
| `text-emerald-400/70` | `text-accent/70` |
| `bg-red-500/10` / `border-red-500/30` / `text-red-400` | `bg-danger-wash` / `border-danger-border` / `text-danger` |
| `placeholder-zinc-500` | `placeholder:text-muted` (verify v4 syntax; fallback `placeholder:text-[var(--muted)]`) |

## Edge Cases & Risks

- **`light-dark()` fallback trap** — must use `@supports` gate (detailed above). Biggest implementation risk.
- **Hydration mismatch on switcher** — avoided by CSS-driven active state (no React state, no conditional icon rendering).
- **StrictMode dev remount clears `<html>` attributes** — handled by `useLayoutEffect` re-apply in the toggle (docs pattern; no-op in prod).
- **Invalid/corrupt `localStorage` value** — inline script validates against the three allowed values; anything else falls through to `system`.
- **`localStorage` unavailable** (private mode) — all access wrapped in try/catch; toggle still works per-session, just not persisted.
- **JS disabled** — `data-theme="system"` + CSS `light-dark()` still yields correct OS-following theming; only persistence is lost.
- **Old browsers (no `light-dark()`)** — static dark fallback = current site appearance; `color-scheme: dark` kept outside `@supports` so form controls/scrollbars never mismatch the token colors.
- **Static prerendering** — preserved; no `cookies()`/`headers()` usage. Inline script is a static string.
- **CSP** — none on this site; inline script needs no nonce (noted for future CSP adoption).

## Validation

1. `bun run lint` — clean.
2. `bun run build` — passes (type-check + prerender of `/` and `/projects/*`).
3. Manual matrix (`bun run dev`):
   - No stored value → follows OS; flip OS pref via DevTools → updates live, no reload.
   - Force Light / Dark → persisted; hard reload with network throttling → **no flash of wrong theme**; `localStorage.theme` holds the value.
   - Invalid stored value (`"banana"`) → ignored, system mode.
   - Client-side nav `/` ↔ `/projects/[slug]` via `<Link>` → theme and switcher state stable.
   - Dev StrictMode double-mount → theme attribute survives remount.
   - Browser console → zero hydration errors/warnings.
   - Visual pass both themes: contrast of emerald accents on light (AA for small mono text), card/surface separation, grid pattern & ghost numbers visible on light, form focus rings, selection color, header pill translucency, mobile header layout with badge hidden.
4. Optional: Lighthouse accessibility run for contrast verification.

## Out of Scope

- Cookie/SSR-based theme (server-read theme) — deliberately avoided to keep static prerendering.
- `next-themes` migration, multi-site theming, per-project theme overrides.
- Content copy changes, new pages, component redesigns beyond token replacement.
- Boosting glow-mesh intensity on light (optional polish, may be follow-up).
