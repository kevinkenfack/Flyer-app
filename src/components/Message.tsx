import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../hooks/useStore';

export const Message: React.FC = () => {
  const { message, type, clearMessage } = useStore();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (message) {
      timer = setTimeout(clearMessage, 3000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [message, clearMessage]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-${type}-500 text-white px-6 py-3 rounded-lg shadow-md`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};