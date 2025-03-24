import { fieldMappings } from '../config/fieldMappings';

interface StandardizedCommet {
  id?: string;
  amount: number;
  salesperson: string;
  date: Date;
}

class TransformationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TransformationError';
  }
}

export class TransformerService {
  private findMatchingField(sourceField: string, targetFields: string[]): string | null {
    // Convertir el campo fuente a minúsculas para comparación sin distinción de mayúsculas/minúsculas
    const normalizedSourceField = sourceField.toLowerCase();
    
    // Buscar una coincidencia en los campos objetivo
    return targetFields.find(field => field.toLowerCase() === normalizedSourceField) || null;
  }

  private transformToStandardFormat(data: Record<string, any>): StandardizedCommet {
    const standardizedData: Partial<StandardizedCommet> = {};

    // Iterar sobre cada campo en el mapeo de campos
    for (const [standardField, possibleFields] of Object.entries(fieldMappings)) {
      // Buscar el primer campo que coincida en los datos de entrada
      const matchingField = Object.keys(data).find(field => 
        this.findMatchingField(field, possibleFields)
      );

      if (matchingField) {
        // Si encontramos una coincidencia, usar el valor en el formato estándar
        switch (standardField) {
          case 'amount':
            standardizedData.amount = parseFloat(data[matchingField]);
            break;
          case 'salesperson':
            standardizedData.salesperson = String(data[matchingField]);
            break;
          case 'date':
            standardizedData.date = new Date(data[matchingField]);
            break;
          case 'id':
            standardizedData.id = String(data[matchingField]);
            break;
        }
      }
    }

    // Validar que tenemos todos los campos requeridos
    if (!standardizedData.amount || !standardizedData.salesperson || !standardizedData.date) {
      throw new TransformationError('Faltan campos requeridos en los datos');
    }

    return standardizedData as StandardizedCommet;
  }

  public transformArrayToStandardFormat(dataArray: Record<string, any>[]): StandardizedCommet[] {
    // Transformar cada objeto en el array al formato estándar
    return dataArray.map((item, index) => {
      try {
        return this.transformToStandardFormat(item);
      } catch (error) {
        throw new TransformationError(
          `Error transformando item en índice ${index}: ${error instanceof Error ? error.message : 'Error desconocido'}`
        );
      }
    });
  }
}
