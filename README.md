# Decker API - Sistema de Gestión de Comisiones

API para gestionar comisiones de ventas con soporte para múltiples formatos de datos (JSON y CSV).


## Estructura del Proyecto

```
decker-prueba/
├── frontend/           # Aplicación Next.js
├── prisma/            # Esquema y migraciones de la base de datos
├── src/               # Código fuente del backend
│   ├── controllers/   # Controladores de la API
│   ├── routes/        # Rutas de la API
│   ├── services/      # Servicios y lógica de negocio
│   └── index.ts       # Punto de entrada del backend
└── package.json
```

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd decker-prueba
```

2. Instalar dependencias del backend:
```bash
npm install
```

3. Instalar dependencias del frontend:
```bash
cd frontend
npm install
cd ..
```

4. Configurar la base de datos:
```bash
npx prisma generate
npx prisma migrate dev
```

## Ejecución

1. Iniciar el proyecto en modo desarrollo (backend y frontend):
```bash
npm run dev
```

Esto iniciará:
- Backend en http://localhost:3000
- Frontend en http://localhost:3001

2. Para ejecutar solo el backend:
```bash
npm run backend
```

3. Para ejecutar solo el frontend:
```bash
npm run frontend
```

## Uso de la API

### Endpoints

1. **GET /api/commets**
   - Obtiene todas las comisiones
   - Incluye cálculos de comisiones y resumen

2. **POST /api/commets**
   - Crea nuevas comisiones
   - Acepta array de objetos en formato JSON
   - Soporta diferentes estructuras de datos:
     ```json
     {
       "deal_id": "A1",
       "total": 5000,
       "rep_name": "Ana Pérez",
       "sold_at": "2024-03-01T10:00:00Z"
     }
     ```
     o
     ```json
     {
       "id": "B1",
       "amount": 3000,
       "salesperson": "Carlos García",
       "date": "2024-03-03T00:00:00Z"
     }
     ```

3. **DELETE /api/commets**
   - Limpia la base de datos

## Subida de Archivos

La aplicación soporta la subida de archivos en dos formatos:

### JSON
```json
[
  {
    "deal_id": "A1",
    "total": 5000,
    "rep_name": "Ana Pérez",
    "sold_at": "2024-03-01T10:00:00Z"
  }
]
```

### CSV
```csv
opportunity_id,amount,seller,deal_date
B1,3000,Carlos García,2024/03/03
B2,4500,Maria García,2024/03/04
```

Encontrarás ejemplos de ambos formatos en la carpeta `frontend/src/examples/`.

## Desarrollo

### Scripts Disponibles

- `npm run dev`: Inicia backend y frontend en modo desarrollo
- `npm run backend`: Inicia solo el backend con hot-reload
- `npm run frontend`: Inicia solo el frontend con hot-reload
- `npm run start`: Inicia el proyecto en modo producción

### Tecnologías Principales

- **Backend**:
  - Node.js + Express
  - TypeScript
  - Prisma (ORM)
  - SQLite

- **Frontend**:
  - React
  - TypeScript
  - Tailwind CSS

## Licencia

MIT
