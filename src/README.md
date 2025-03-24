# Backend - Sistema de Transformación de Datos CRM

Este directorio contiene el backend del sistema, diseñado con una arquitectura que facilita la incorporación de nuevos CRMs y formatos de datos.

## Estructura de Directorios

```
src/
├── controllers/        # Controladores de la API
├── services/          # Servicios de transformación y lógica de negocio
├── routes/            # Definición de rutas
├── config/           # Configuraciones y mapeos
└── index.ts          # Punto de entrada de la aplicación
```

## Arquitectura para Múltiples CRMs

### Sistema de Transformación

La arquitectura está diseñada para manejar datos de diferentes CRMs mediante un sistema de transformación flexible:

```
CRM A (JSON) → 
CRM B (CSV)  →  Transformer Service → Formato Estándar → Base de Datos
CRM C (XML)  → 
```

#### 1. Mapeo de Campos (`config/fieldMappings.ts`)
```typescript
{
  id: ['id', 'deal_id', 'transaction_id', 'opportunity_id'],
  amount: ['amount', 'total', 'value'],
  salesperson: ['salesperson', 'sales_person', 'rep_name', 'seller'],
  date: ['date', 'sold_at', 'deal_date']
}
```
- Define las equivalencias entre campos de diferentes CRMs
- Fácilmente extensible para nuevos campos y formatos

### Componentes Principales

#### 1. TransformerService (`services/transformer.service.ts`)
- **Propósito**: Transformar datos de cualquier formato al formato estándar
- **Características**:
  - Detección automática de campos equivalentes
  - Validación de datos
  - Manejo de errores específicos
- **Extensibilidad**:
  - Agregar nuevos formatos modificando solo el mapeo de campos
  - Sin necesidad de modificar la lógica core

#### 2. CommetController (`controllers/commet.controller.ts`)
- **Propósito**: Manejar las operaciones CRUD
- **Características**:
  - Creación/actualización inteligente (upsert)
  - Cálculo de comisiones
  - Resúmenes y estadísticas
- **Extensibilidad**:
  - Lógica de negocio independiente del formato de entrada
  - Fácil de extender para nuevas operaciones

### Flujo de Datos

1. **Recepción de Datos**
   ```typescript
   // Ejemplo CRM A
   {
     "deal_id": "A1",
     "total": 5000,
     "rep_name": "Ana Pérez"
   }
   ```

2. **Transformación**
   ```typescript
   // Formato Estándar
   {
     "id": "A1",
     "amount": 5000,
     "salesperson": "Ana Pérez"
   }
   ```

3. **Almacenamiento**
   - Datos normalizados en SQLite
   - Modelo Prisma estandarizado

## Cómo Agregar un Nuevo CRM

1. **Actualizar Mapeo de Campos**
   ```typescript
   // En fieldMappings.ts
   {
     id: [...campos_existentes, 'nuevo_campo_id'],
     amount: [...campos_existentes, 'nuevo_campo_monto'],
     // ...
   }
   ```

2. **Agregar Validaciones (si es necesario)**
   ```typescript
   // En transformer.service.ts
   if (nuevoFormatoEspecial) {
     // Lógica de validación específica
   }
   ```

## Ejemplos de Integración

### CRM con JSON
```json
{
  "deal_id": "A1",
  "total": 5000,
  "rep_name": "Ana Pérez"
}
```

### CRM con CSV
```csv
opportunity_id,amount,seller,deal_date
B1,3000,Carlos García,2024/03/03
```

## Validación y Seguridad

1. **Validación de Datos**
   - Tipos de datos correctos
   - Campos requeridos presentes
   - Formatos de fecha válidos

2. **Manejo de Errores**
   - Errores específicos por tipo de problema
   - Mensajes claros para debugging
   - Logs detallados

## Mantenibilidad

1. **Separación de Responsabilidades**
   - Transformación de datos (TransformerService)
   - Lógica de negocio (Controllers)
   - Rutas y endpoints (Routes)

2. **Código Tipado**
   - TypeScript para seguridad de tipos
   - Interfaces claras
   - Documentación inline


