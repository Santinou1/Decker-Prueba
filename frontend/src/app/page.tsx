'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { CommetsTable } from '@/components/CommetsTable';
import { FileUploader } from '@/components/FileUploader';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { getCommets } from '@/services/commetService';
import { CommetResponse } from '@/types/commet';

// Función para simular delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function Home() {
  const [data, setData] = useState<CommetResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      // Agregamos un delay artificial 
      await delay(300); // CAMBIAR ESTO PARA PROBAR EL COMPONENTE DE SKELETON
      const response = await getCommets();
      setData(response);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ha ocurrido un error');
      toast.error('Error al cargar los datos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUploadSuccess = async () => {
    toast.success('¡Datos subidos exitosamente!');
    // También agregamos delay aquí para ver el skeleton al recargar
    setIsLoading(true);
    await delay(100); // CAMBIAR ESTO PARA PROBAR EL COMPONENTE DE SKELETON
    await fetchData();
  };

  if (error) {
    return (
      <motion.div 
        className="flex h-screen items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.h1 
            className="mb-4 text-2xl font-bold text-red-600"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            Error
          </motion.h1>
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {error}
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <Toaster position="top-right" />
      
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="mb-8 text-center text-3xl font-bold text-gray-800"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          Panel de Comisiones
        </motion.h1>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SkeletonLoader />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="rounded-lg bg-white p-6 shadow-lg"
              >
                <FileUploader onUploadSuccess={handleUploadSuccess} />
              </motion.div>

              {data && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-lg bg-white p-6 shadow-lg"
                >
                  <CommetsTable
                    commets={data.formattedData.table}
                    summary={data.formattedData.summary}
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
