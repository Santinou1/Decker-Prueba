import { useState } from 'react';
import { createCommets } from '@/services/commetService';

interface UseFileUploadProps {
  onSuccess: () => void;
}

interface UseFileUploadReturn {
  isDragging: boolean;
  error: string | null;
  isLoading: boolean;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: () => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const parseCSV = (text: string): any[] => {
  const lines = text.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  return lines.slice(1)
    .filter(line => line.trim()) // Ignorar líneas vacías
    .map(line => {
      const values = line.split(',').map(value => value.trim());
      const row: any = {};
      
      headers.forEach((header, index) => {
        // Mapear los nombres de columnas CSV a los nombres esperados
        const value = values[index];
        switch (header.toLowerCase()) {
          case 'opportunity_id':
            row.deal_id = value;
            break;
          case 'amount':
            row.amount = parseFloat(value);
            break;
          case 'seller':
            row.salesperson = value;
            break;
          case 'deal_date':
            // Convertir fecha formato YYYY/MM/DD a ISO
            const [year, month, day] = value.split('/');
            row.date = `${year}-${month}-${day}T00:00:00Z`;
            break;
          default:
            row[header] = value;
        }
      });
      
      return row;
    });
};

export const useFileUpload = ({ onSuccess }: UseFileUploadProps): UseFileUploadReturn => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const processFile = async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);

      const text = await file.text();
      let data;

      if (file.type === 'application/json') {
        try {
          data = JSON.parse(text);
          if (!Array.isArray(data)) {
            data = [data];
          }
        } catch (e) {
          throw new Error('El archivo debe contener JSON válido');
        }
      } else if (file.type === 'text/csv') {
        try {
          data = parseCSV(text);
        } catch (e) {
          throw new Error('El archivo CSV no tiene el formato esperado');
        }
      } else {
        throw new Error('Formato de archivo no soportado');
      }

      await createCommets(data);
      onSuccess();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el archivo');
    } finally {
      setIsLoading(false);
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/json' || file.type === 'text/csv')) {
      await processFile(file);
    } else {
      setError('Por favor, sube un archivo JSON o CSV');
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'application/json' || file.type === 'text/csv')) {
      await processFile(file);
    } else {
      setError('Por favor, sube un archivo JSON o CSV');
    }
  };

  return {
    isDragging,
    error,
    isLoading,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInput
  };
};
