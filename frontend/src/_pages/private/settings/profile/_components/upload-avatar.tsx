import { useState } from 'react';
import { toast } from 'sonner';
import useAuthUserStore from '@/_stores/auth-user.store';
import ImageCropper from '@/components/images/image-cropper';
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
import { mainInstance } from '@/instances/main-instance';

// Props interface for the UploadAvatar component
interface UploadAvatarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadAvatar = ({ open, setOpen }: UploadAvatarProps) => {
  // Get authenticated user from store
  const { user, setUser } = useAuthUserStore();

  // State for storing the cropped image data
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  // State for handling upload loading state
  const [isLoadingUploadAvatar, setIsLoadingUploadAvatar] = useState(false);

  // Handler for when image cropping is completed
  const handleCropComplete = (croppedImageUrl: string) => {
    setCroppedImage(croppedImageUrl);
  };

  // Handle form submission for avatar upload
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!croppedImage) {
      toast.error('No image selected');
      return;
    }

    setIsLoadingUploadAvatar(true);

    // Prepare form data for upload
    const formData = new FormData();
    formData.append('avatar', croppedImage);

    // Upload avatar with loading state feedback
    toast.promise(
      mainInstance.post(`/api/users/${user?.id}/profile/avatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
      {
        loading: 'Uploading avatar...',
        success: response => {
          setUser({ ...user!, avatar: response.data.avatar });

          return 'Avatar updated successfully';
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

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        setCroppedImage(null);
      }}
    >
      <DialogContent onOpenAutoFocus={e => e.preventDefault()}>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Upload Avatar</DialogTitle>
            <DialogDescription>Upload a new profile picture</DialogDescription>
          </DialogHeader>

          <DialogBody>
            <ImageCropper onCropComplete={handleCropComplete} />
          </DialogBody>

          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setCroppedImage(null);
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
