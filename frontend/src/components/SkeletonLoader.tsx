import { motion } from 'framer-motion';

export const SkeletonLoader = () => {
  return (
    <div className="w-full space-y-4 py-4">
      {/* Skeleton para el título */}
      <motion.div
        className="mx-auto h-8 w-1/3 rounded-lg bg-gray-200"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Skeleton para el área de upload */}
      <motion.div
        className="mx-auto my-8 h-32 w-full max-w-2xl rounded-lg bg-gray-200"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2
        }}
      />
      
      {/* Skeleton para la tabla */}
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="h-12 w-full rounded-lg bg-gray-200"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1 * i
            }}
          />
        ))}
      </div>
    </div>
  );
};
