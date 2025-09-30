import { motion } from 'framer-motion';

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {children}
    </motion.div>
  );
};
