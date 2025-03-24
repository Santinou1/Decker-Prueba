# Workflow de Git - Explicacion de como entiendo yo como funciona git para Decker

## Estructura de Branches

### Branch Principal
- `master` o `main`: Contiene el código en producción
- Siempre debe estar estable y lista para deploy

## Workflow para Nuevas Features

### 1. Crear Nueva Branch
```bash

git checkout main
git pull origin main


git checkout -b NK-01
```

### 2. Desarrollo
- Trabajar en la feature en la branch NK-01
- Hacer commits frecuentes y descriptivos
```bash
git add .
git commit -m "NK-01: Agregado skeleton loader y animaciones"
```

### 3. Push y Pull Request
```bash
# Subir cambios a la branch
git push origin NK-01

# Crear Pull Request en GitHub
# NK-01 -> main
```

### 4. Nueva Feature mientras PR está pendiente
```bash
# Volver a main y actualizar
git checkout main
git pull origin main

# Crear nueva branch para siguiente feature
git checkout -b NK-02
```

### 5. Actualizar Branch con Cambios de Main
```bash
# Si main fue actualizado y necesitas esos cambios en tu branch
git checkout NK-02
git pull origin main
```

## Ejemplos Prácticos

### Ejemplo 1: Nueva Feature de UI
```bash
git checkout main
git pull origin main
git checkout -b NK-01
# Trabajar en los cambios...
git add .
git commit -m "NK-01: Implementado nuevo diseño del dashboard"
git push origin NK-01
# Crear PR en GitHub
```

### Ejemplo 2: Feature Mientras PR está Pendiente
```bash
git checkout main
git pull origin main
git checkout -b NK-02
# Trabajar en nueva feature...
git add .
git commit -m "NK-02: Agregado sistema de notificaciones"
git push origin NK-02
```

### Ejemplo 3: Actualizar Branch con Cambios Aprobados
```bash
git checkout NK-02
git pull origin main
# Resolver conflictos si existen
git add .
git commit -m "NK-02: Merge main into NK-02"
git push origin NK-02
```

## Ejemplos Prácticos con el Sistema de Transformación

### Ejemplo 1: Agregar Soporte para Nuevo CRM
```bash
git checkout main
git pull origin main
git checkout -b NK-03
# 1. Actualizar fieldMappings.ts con nuevos campos
# 2. Agregar validaciones específicas si es necesario
git add .
git commit -m "NK-03: Agregado soporte para CRM XYZ"
git push origin NK-03
```
