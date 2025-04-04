import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CircleAlert } from 'lucide-react';
import { toast } from 'sonner';
import { RbacUserRole } from '@/_types/rbac-user-role';
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

type DeleteUserRolesProps = {
  selectedItem: User | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<User | null>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const DeleteUserRoles = ({
  selectedItem,
  setSelectedItem,
  open,
  setOpen,
  refetch,
}: DeleteUserRolesProps) => {
  const [isLoadingDeleteItem, setIsLoadingDeleteItem] = useState(false);

  const {
    isFetching,
    data: rbacUserRole,
    refetch: refetchRbacUserRole,
  } = useQuery<RbacUserRole>({
    queryKey: ['users', selectedItem?.id],
    queryFn: async (): Promise<RbacUserRole> => {
      const res = await mainInstance.get(
        `/api/users/${selectedItem?.id}/user-roles`,
      );
      return res.data;
    },
    enabled: false,
  });

  useEffect(() => {
    if (selectedItem && open) {
      // refresh on init
      refetchRbacUserRole();
    }
  }, [selectedItem, open, refetchRbacUserRole]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingDeleteItem(true);

    toast.promise(
      mainInstance.delete(`/api/users/${selectedItem?.id}/user-roles`),
      {
        loading: 'Loading...',
        success: () => {
          refetch();
          setSelectedItem(null);
          setOpen(false);
          return 'Role deleted successfully';
        },
        error: error => {
          return (
            error.response?.data?.message ||
            error.message ||
            'An error occurred'
          );
        },
        finally: () => {
          setIsLoadingDeleteItem(false);
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
                  <h3 className="text-center text-xl">Delete Role</h3>
                  <p className="mb-2 text-center text-slate-600">
                    Are you sure you want to delete this role?
                  </p>

                  <h2 className="text-center text-2xl font-semibold">
                    {formatName(rbacUserRole, 'semifull')}
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

export default DeleteUserRoles;
