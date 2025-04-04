import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CircleAlert } from 'lucide-react';
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
import { formatName } from '@/lib/format-name';

type DeleteUserProps = {
  selectedItem: User | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<User | null>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const DeleteUser = ({
  selectedItem,
  setSelectedItem,
  open,
  setOpen,
  refetch,
}: DeleteUserProps) => {
  const [isLoadingDeleteItem, setIsLoadingDeleteItem] = useState(false);

  const {
    isFetching,
    data: user,
    refetch: refetchUser,
  } = useQuery<User>({
    queryKey: ['users', selectedItem?.id],
    queryFn: async (): Promise<User> => {
      const res = await mainInstance.get(`/api/users/${selectedItem?.id}`);
      return res.data;
    },
    enabled: false,
  });

  useEffect(() => {
    if (selectedItem && open) {
      // refresh on init
      refetchUser();
    }
  }, [selectedItem, open, refetchUser]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingDeleteItem(true);

    toast.promise(mainInstance.delete(`/api/users/${selectedItem?.id}`), {
      loading: 'Loading...',
      success: () => {
        refetch();
        setSelectedItem(null);
        setOpen(false);
        return 'User deleted successfully';
      },
      error: error => {
        return (
          error.response?.data?.message || error.message || 'An error occurred'
        );
      },
      finally: () => {
        setIsLoadingDeleteItem(false);
      },
    });
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
      <DialogContent>
        <form onSubmit={onSubmit}>
          {isFetching ? (
            <DialogDeleteSkeleton />
          ) : (
            <>
              <DialogTitle />
              <DialogDescription />
              <DialogBody>
                <div>
                  <CircleAlert
                    className="mx-auto mb-4 text-red-500"
                    size={64}
                  />
                  <h3 className="text-center text-xl">Delete User</h3>
                  <p className="mb-2 text-center text-slate-600">
                    Are you sure you want to delete this user?
                  </p>

                  <h2 className="text-center text-2xl font-semibold">
                    {formatName(user, 'semifull')}
                  </h2>
                </div>
              </DialogBody>
              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Close
                </Button>
                <Button
                  variant="destructive"
                  type="submit"
                  disabled={isLoadingDeleteItem}
                >
                  Delete
                </Button>
              </DialogFooter>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUser;
