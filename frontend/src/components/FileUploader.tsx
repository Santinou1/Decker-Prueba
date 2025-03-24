import { useFileUpload } from '@/hooks/useFileUpload';

interface FileUploaderProps {
  onUploadSuccess: () => void;
}

export const FileUploader = ({ onUploadSuccess }: FileUploaderProps) => {
  const {
    isDragging,
    error,
    isLoading,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInput
  } = useFileUpload({
    onSuccess: onUploadSuccess
  });

  return (
    <div className="mb-8">
      <div
        className={`relative flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".json,.csv,application/json,text/csv"
          onChange={handleFileInput}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <div className="text-center">
          {isLoading ? (
            <p className="text-gray-600">Procesando archivo...</p>
          ) : (
            <>
              <p className="text-sm text-gray-600">
                Arrastra y suelta un archivo JSON o CSV aquí, o
              </p>
              <p className="mt-1 text-sm font-medium text-blue-600">
                haz clic para seleccionar un archivo
              </p>
            </>
          )}
        </div>
      </div>
      {error && (
        <div className="mt-2 text-center text-sm text-red-600">{error}</div>
      )}
    </div>
  );
};
