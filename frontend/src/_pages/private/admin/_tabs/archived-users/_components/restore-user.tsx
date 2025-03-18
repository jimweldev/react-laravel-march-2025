import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CircleHelp } from 'lucide-react';
import { toast } from 'sonner';
import { User } from '@/_types/user';
import DialogDeleteSkeleton from '@/components/skeletons/dialog-delete-skeleton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { mainInstance } from '@/instances/main-instance';

type RestoreUserProps = {
  selectedItem: User | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<User | null>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const RestoreUser = ({
  selectedItem,
  setSelectedItem,
  open,
  setOpen,
  refetch,
}: RestoreUserProps) => {
  const [isLoadingRestoreItem, setIsLoadingRestoreItem] = useState(false);

  const {
    isFetching,
    data: user,
    refetch: refetchUser,
  } = useQuery<User>({
    queryKey: ['users', selectedItem?.id],
    queryFn: async (): Promise<User> => {
      const res = await mainInstance.get(
        `/api/users/${selectedItem?.id}/archived`,
      );
      return res.data;
    },
    enabled: false,
  });

  useEffect(() => {
    if (selectedItem) {
      // refresh on init
      refetchUser();
    }
  }, [selectedItem]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingRestoreItem(true);

    toast.promise(
      mainInstance.post(`/api/users/${selectedItem?.id}/archived/restore`),
      {
        loading: 'Loading...',
        success: () => {
          refetch();
          setOpen(false);
          setSelectedItem(null);
          return 'User restored successfully';
        },
        error: error => {
          return (
            error.response?.data?.message ||
            error.message ||
            'An error occurred'
          );
        },
        finally: () => {
          setIsLoadingRestoreItem(false);
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        setTimeout(() => {
          setSelectedItem(null);
        }, 200);
      }}
    >
      <DialogContent className="max-w-[425px]">
        <form onSubmit={onSubmit}>
          {isFetching ? (
            <DialogDeleteSkeleton />
          ) : (
            <>
              <DialogTitle />
              <DialogDescription />
              <DialogBody>
                <div>
                  <CircleHelp
                    className="mx-auto mb-4 text-yellow-400"
                    size={64}
                  />
                  <h3 className="text-center text-xl">Restore User</h3>
                  <p className="mb-2 text-center text-slate-600">
                    Are you sure you want to restore this user?
                  </p>

                  <h2 className="text-center text-2xl font-semibold">
                    {`${user?.first_name} ${user?.last_name}`}
                  </h2>
                </div>
              </DialogBody>
              <DialogFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
                <Button
                  variant="warning"
                  type="submit"
                  disabled={isLoadingRestoreItem}
                >
                  Restore
                </Button>
              </DialogFooter>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RestoreUser;
