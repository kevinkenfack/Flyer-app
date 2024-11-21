import { motion } from 'framer-motion';

interface LoadingOverlayProps {
  isVisible: boolean;
  progress: number;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  progress,
}) => {
  return (
    <motion.div
      className={`fixed top-0 left-0 w-full h-full bg-white/95 flex flex-col items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="spinner border-4 border-primary-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      <p className="mt-4">Traitement en cours...</p>
      <div className="w-48 h-2 bg-gray-200 rounded-full mt-4">
        <div
          className="h-full bg-primary-500 rounded-full transition-width duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </motion.div>
  );
};