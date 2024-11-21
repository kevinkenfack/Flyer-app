import Image from 'next/image';
import { ImageUploader } from '../components/ImageUploader';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { Message } from '../components/Message';
import { useImageProcessing } from '../hooks/useImageProcessing';

export default function Home() {
  const {
    flyerBase,
    userImage,
    cropperRef,
    isLoading,
    progress,
    handleImageUpload,
    handleCropImage,
    handleDownload,
  } = useImageProcessing();

  return (
    <div>
      <Image
        src="/forex.jpg"
        alt="Flyer de base"
        width={1024}
        height={1280}
        className="mb-8 rounded-lg"
      />

      <ImageUploader
        onImageUpload={handleImageUpload}
        cropperRef={cropperRef}
      />

      {flyerBase && userImage && (
        <div className="mt-8">
          <button
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg"
            onClick={handleCropImage}
          >
            Recadrer l'image
          </button>
          <button
            className="bg-success hover:bg-green-600 text-white px-4 py-2 rounded-lg ml-4"
            onClick={handleDownload}
          >
            Télécharger le flyer
          </button>
        </div>
      )}

      <LoadingOverlay isVisible={isLoading} progress={progress} />
      <Message />
    </div>
  );
}