import { useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'sonner';
import useAuthUserStore from '@/_stores/auth-user.store';
import ImageCropper from '@/components/images/image-cropper';
import InputGroup from '@/components/inputs/input-group';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { mainInstance } from '@/instances/main-instance';
import { resizeImage } from '@/lib/resize-image';
import '@/assets/styles/theme-toggle.css';

// Props interface for the UploadAvatar component
interface UploadAvatarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadAvatar = ({ open, setOpen }: UploadAvatarProps) => {
  const { user, setUser } = useAuthUserStore();

  const fileImageRef = useRef<HTMLInputElement>(null);

  const [imageSource, setImageSource] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const [isLoadingUploadAvatar, setIsLoadingUploadAvatar] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!croppedImage) {
      toast.error('No image selected');
      return;
    }

    setIsLoadingUploadAvatar(true);

    // Prepare form data for upload
    const formData = new FormData();

    const resizedImage = await resizeImage(croppedImage, 128, 128);

    formData.append('avatar', resizedImage);

    // Upload avatar with loading state feedback
    toast.promise(
      mainInstance.post(`/api/users/${user?.id}/profile/avatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
      {
        loading: 'Loading...',
        success: response => {
          setUser({ ...user!, avatar: response.data.avatar });

          return 'Avatar uploaded successfully';
        },
        error: error => {
          return (
            error.response?.data?.message ||
            error.message ||
            'An error occurred'
          );
        },
        finally: () => {
          setIsLoadingUploadAvatar(false);
        },
      },
    );
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // accept only jpg and png
    if (file && !file.type.match('image/jpeg|image/png')) {
      toast.error('Only jpg and png images are allowed');
      return;
    }

    if (file) {
      setImageSource(URL.createObjectURL(file));
    }
  };

  const onRemoveImage = () => {
    setImageSource(null);
    setCroppedImage(null);
    if (fileImageRef.current) {
      fileImageRef.current.value = '';
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        onRemoveImage();
      }}
    >
      <DialogContent onOpenAutoFocus={e => e.preventDefault()}>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Upload Avatar</DialogTitle>
            <DialogDescription>Upload a new profile picture</DialogDescription>
          </DialogHeader>

          <DialogBody className="space-y-3">
            <ImageCropper
              imageSource={imageSource}
              onCropComplete={setCroppedImage}
              aspectRatio={1 / 1}
            />

            <InputGroup>
              <Input
                ref={fileImageRef}
                id="image-cropper"
                type="file"
                accept=".jpg, .png"
                inputSize="sm"
                onChange={onFileChange}
              />
              <Button variant="destructive" size="sm" onClick={onRemoveImage}>
                <FaTimes />
              </Button>
            </InputGroup>
          </DialogBody>

          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                onRemoveImage();
              }}
            >
              Close
            </Button>
            <Button type="submit" disabled={isLoadingUploadAvatar}>
              Upload
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadAvatar;
