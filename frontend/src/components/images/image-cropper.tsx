import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

const ImageCropper = ({
  onCropComplete,
  aspectRatio = 1 / 1,
}: {
  onCropComplete: (croppedImageUrl: string) => void;
  aspectRatio?: number;
}) => {
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imageSource, setImageSource] = useState<string | null>(null);

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 10;

  const handleCropComplete = async (_: any, croppedAreaPixels: any) => {
    try {
      const croppedResult = await generateCroppedImage(
        imageSource!,
        croppedAreaPixels,
      );
      onCropComplete(croppedResult);
    } catch (error) {
      toast.error('Failed to crop image');
    }
  };

  const handleZoomChange = (newZoomLevel: number) => {
    setZoomLevel(newZoomLevel);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if the selected file is an image
    if (!file.type.startsWith('image/')) {
      e.target.value = '';
      toast.error('Please select a valid image.');
      return;
    }

    // GIFs are not supported
    if (file.type === 'image/gif') {
      e.target.value = '';
      toast.error('GIFs are not supported.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImageSource(reader.result as string);
    reader.readAsDataURL(file);
  };

  const generateCroppedImage = (imageSource: string, cropArea: any) => {
    return new Promise<string>((resolve, reject) => {
      const imageElement = new Image();
      imageElement.src = imageSource;
      imageElement.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
          return reject('Could not get canvas context');
        }

        canvas.width = cropArea.width;
        canvas.height = cropArea.height;

        context.drawImage(
          imageElement,
          cropArea.x,
          cropArea.y,
          cropArea.width,
          cropArea.height,
          0,
          0,
          canvas.width,
          canvas.height,
        );

        resolve(canvas.toDataURL('image/png'));
      };

      imageElement.onerror = error => reject(error);
    });
  };

  return (
    <div className="space-y-3">
      {imageSource ? (
        <>
          <div className="relative aspect-square border-4">
            <Cropper
              image={imageSource}
              crop={cropPosition}
              zoom={zoomLevel}
              aspect={aspectRatio}
              onCropChange={setCropPosition}
              onCropComplete={handleCropComplete}
              onZoomChange={handleZoomChange}
              minZoom={MIN_ZOOM}
              maxZoom={MAX_ZOOM}
            />
          </div>

          <Slider
            value={[zoomLevel * 10]}
            max={MAX_ZOOM * 10}
            min={MIN_ZOOM * 10}
            step={1}
            onValueChange={value => setZoomLevel(value[0] / 10)}
          />
        </>
      ) : (
        <div className="border-4 px-3 py-24">
          <p className="text-muted-foreground text-center text-sm">
            No image selected
          </p>
        </div>
      )}

      <Input
        type="file"
        accept="image/*"
        inputSize="sm"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageCropper;
