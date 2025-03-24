# Ejemplos de Archivos para Pruebas

Este directorio contiene archivos de ejemplo para probar la funcionalidad de subida de archivos.

## Formatos JSON Disponibles

### example1.json
- Usa `deal_id` para el identificador
- Usa `total` para el monto
- Usa `rep_name` para el vendedor
- Usa `sold_at` para la fecha

### example2.json
- Usa `transaction_id` para el identificador
- Usa `amount` para el monto
- Usa `sales_person` para el vendedor
- Usa `date` para la fecha

### example3.json
- Usa los nombres exactos del modelo:
  - `id` para el identificador
  - `amount` para el monto
  - `salesperson` para el vendedor
  - `date` para la fecha

## Formato CSV

### example1.csv
Formato con encabezados:
- `opportunity_id` para el identificador
- `amount` para el monto
- `seller` para el vendedor
- `deal_date` para la fecha (formato YYYY/MM/DD)

## Cómo Usar
1. Descarga cualquiera de estos archivos (JSON o CSV)
2. Arrastra y suelta el archivo en la zona de subida
3. O haz clic en la zona y selecciona el archivo

Todos los formatos son válidos y serán transformados correctamente por el backend.
