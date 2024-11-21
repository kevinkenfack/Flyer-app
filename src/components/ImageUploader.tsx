'use client';

import { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  cropperRef: React.RefObject<HTMLImageElement>;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  cropperRef,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Chargez votre image</h2>
        <button
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg"
          onClick={handleSelectImage}
        >
          Choisir une image
        </button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <Cropper
        ref={cropperRef}
        src="/forex.jpg"
        aspectRatio={1}
        guides
        className="rounded-lg"
      />
    </div>
  );
};