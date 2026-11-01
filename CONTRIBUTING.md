# Cómo trabajamos — Exchange Tracker

## Ramas
- `main` → versión estable. Solo recibe merges desde `develop`.
- `develop` → integración. Aquí entran todos los PR.
- Una rama por tarea, creada desde `develop`:
  - `feat/et-nombre` → funcionalidad nueva (ej. `feat/et-button`)
  - `fix/et-nombre` → corrección de un error
  - `chore/nombre` → configuración, dependencias, docs
  - `test/nombre` → tests

## Commits (Conventional Commits)
Formato: `tipo: descripción corta en minúscula`

| Tipo | Cuándo | Ejemplo |
|---|---|---|
| feat | algo nuevo | `feat: añade componente Button` |
| fix | arreglar un error | `fix: corrige cálculo de total en Bs` |
| refactor | mejorar código sin cambiar lo que hace | `refactor: extrae formatMoney a lib` |
| style | formato, CSS | `style: ajusta espaciado del sidebar` |
| test | tests | `test: añade tests de currency` |
| chore | config, dependencias | `chore: instala react-router-dom` |
| docs | documentación | `docs: actualiza README` |

## Nombres en el código
- Componentes: **PascalCase** → `InvoiceForm.tsx`, `RateCard.tsx`
- Hooks: **camelCase con use** → `useInvoices.ts`, `useAuth.ts`
- Utilidades: **camelCase** → `formatMoney`, `toBs`
- Tipos e interfaces: **PascalCase** → `Invoice`, `ExchangeRate`
- Componentes reutilizables en `src/components/ui`; los de una sola pantalla en `src/features/<pantalla>`

## Flujo de trabajo
1. Antes de empezar: `git checkout develop && git pull`
2. Crear rama: `git checkout -b feat/et-nombre`
3. Commits pequeños y frecuentes
4. Subir: `git push -u origin feat/et-nombre`
5. Abrir PR hacia `develop` y rellenar la plantilla
6. El otro dev revisa y aprueba
7. Merge con **Squash and merge**
8. Mover la tarea en Notion a **Hecho**

## Reglas
- Nadie hace push directo a `main` ni a `develop`.
- Cada PR lo revisa la otra persona antes de fusionarlo.
- Un PR = una tarea. Si crece demasiado, se divide.
- Dudas y decisiones → Feed de Notion.