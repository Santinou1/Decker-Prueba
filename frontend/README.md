# Frontend - Decker Comisiones

Este directorio contiene la aplicación frontend del sistema de gestión de comisiones. La estructura está diseñada para maximizar la reusabilidad y mantener una separación clara de responsabilidades.

## Estructura de Directorios

```
frontend/
├── src/
│   ├── app/              # Páginas y configuración de Next.js
│   ├── components/       # Componentes reutilizables
│   ├── hooks/           # Hooks personalizados
│   ├── services/        # Servicios para comunicación con API
│   ├── types/           # Definiciones de tipos TypeScript
│   └── examples/        # Ejemplos de archivos para pruebas
```

## Componentes Reutilizables

### FileUploader (`components/FileUploader.tsx`)
- **Propósito**: Componente para subir archivos con drag & drop
- **Características**:
  - Acepta archivos JSON y CSV
  - Muestra feedback visual durante el drag & drop
  - Maneja estados de carga y errores
  - Personalizable mediante props
- **Reutilización**: Puede adaptarse para cualquier tipo de archivo modificando:
  - Tipos de archivo aceptados
  - Lógica de procesamiento
  - Mensajes de feedback

### CommetsTable (`components/CommetsTable.tsx`)
- **Propósito**: Tabla para mostrar datos de comisiones
- **Características**:
  - Ordenamiento por columnas
  - Cálculo automático de comisiones
  - Resumen de totales
- **Reutilización**: Puede adaptarse para mostrar diferentes tipos de datos tabulares

## Hooks Personalizados

### useFileUpload (`hooks/useFileUpload.ts`)
- **Propósito**: Encapsula la lógica de subida de archivos
- **Características**:
  - Manejo de drag & drop
  - Procesamiento de archivos JSON y CSV
  - Estados de carga y error
  - Transformación de datos
- **Reutilización**: 
  - Base para crear otros hooks de subida de archivos
  - Puede extenderse para manejar más tipos de archivos
  - Separación clara entre UI y lógica de negocio

## Servicios

### commetService (`services/commetService.ts`)
- **Propósito**: Centraliza la comunicación con el backend
- **Características**:
  - Endpoints para CRUD de comisiones
  - Transformación de datos
  - Manejo de errores
- **Reutilización**:
  - Patrón base para otros servicios
  - Fácil de extender para nuevos endpoints

## Tipos

### commet.ts (`types/commet.ts`)
- **Propósito**: Define interfaces y tipos del dominio
- **Características**:
  - Interfaces para datos de comisiones
  - Tipos para respuestas de API
- **Reutilización**:
  - Asegura consistencia de tipos en toda la app
  - Base para extender el modelo de datos

## Ejemplos

### examples/
- **Propósito**: Proporciona archivos de ejemplo para pruebas
- **Contenido**:
  - JSONs con diferentes estructuras
  - CSVs con diferentes formatos
  - README con explicaciones
- **Uso**: 
  - Facilita pruebas de la aplicación
  - Documenta formatos soportados



## Extensibilidad

El código está estructurado para facilitar:
1. Agregar nuevos tipos de archivos
2. Implementar nuevas visualizaciones de datos
3. Extender funcionalidad de componentes existentes
4. Agregar nuevas integraciones con APIs
