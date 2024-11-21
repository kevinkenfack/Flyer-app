import { useRef, useState } from 'react';
import { useStore } from './useStore';
import { compressImage } from '../utils/imageProcessing';
import { FlyerDimensions } from '../types';

export const useImageProcessing = () => {
  const [flyerBase, setFlyerBase] = useState<HTMLImageElement | null>(null);
  const [userImage, setUserImage] = useState<HTMLImageElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const cropperRef = useRef<HTMLImageElement>(null);

  const { showMessage } = useStore();

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    setProgress(0);

    try {
      const compressedFile = await compressImage(file);
      const imageUrl = URL.createObjectURL(compressedFile);
      setUserImage(await loadImage(imageUrl));
      setIsLoading(false);
      setProgress(100);
      showMessage('Image chargée avec succès', 'success');
    } catch (error) {
      console.error('Erreur lors du chargement de l\'image:', error);
      showMessage('Erreur lors du chargement de l\'image', 'error');
      setIsLoading(false);
    }
  };

  const handleCropImage = async () => {
    setIsLoading(true);
    setProgress(0);

    try {
      const croppedImage = await cropImage(cropperRef.current!, {
        width: FlyerDimensions.imageZone.width,
        height: FlyerDimensions.imageZone.height,
      });
      setUserImage(croppedImage);
      setIsLoading(false);
      setProgress(100);
      showMessage('Image recadrée avec succès', 'success');
    } catch (error) {
      console.error('Erreur lors du recadrage de l\'image:', error);
      showMessage('Erreur lors du recadrage de l\'image', 'error');
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    setIsLoading(true);
    setProgress(0);

    try {
      const blob = await generateFlyerImage(flyerBase!, userImage!);
      const url = URL.createObjectURL(blob);
      const filename = `flyer_${new Date().toISOString().slice(0, 10)}.jpg`;

      if (isIOS) {
        window.location.href = url;
      } else {
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      URL.revokeObjectURL(url);
      setIsLoading(false);
      setProgress(100);
      showMessage('Flyer téléchargé avec succès', 'success');
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      showMessage('Erreur lors du téléchargement', 'error');
      setIsLoading(false);
    }
  };

  return {
    flyerBase,
    userImage,
    cropperRef,
    isLoading,
    progress,
    handleImageUpload,
    handleCropImage,
    handleDownload,
  };
};