'use client';

import { useEffect, useState } from 'react';
import { CommetsTable } from '@/components/CommetsTable';
import { FileUploader } from '@/components/FileUploader';
import { getCommets } from '@/services/commetService';
import { CommetResponse } from '@/types/commet';

export default function Home() {
  const [data, setData] = useState<CommetResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await getCommets();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUploadSuccess = () => {
    fetchData(); // Recargar los datos después de una subida exitosa
  };

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-600">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl text-gray-600">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Deals Dashboard
        </h1>
        
        <FileUploader onUploadSuccess={handleUploadSuccess} />
        
        <CommetsTable
          commets={data.formattedData.table}
          summary={data.formattedData.summary}
        />
      </div>
    </main>
  );
}
