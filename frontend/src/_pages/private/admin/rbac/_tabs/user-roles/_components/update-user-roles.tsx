import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ReactSelectOption } from '@/_types/common/react-select';
import { RbacUserRole } from '@/_types/rbac-user-role';
import { User } from '@/_types/user';
import RolesSelect from '@/components/react-select/roles-select';
import DialogSkeleton from '@/components/skeletons/dialog-skeleton';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mainInstance } from '@/instances/main-instance';
import { formatName } from '@/lib/format-name';

const FormSchema = z.object({
  roles: z
    .array(
      z.object({
        label: z.string().min(1, {
          message: 'Required',
        }),
        value: z.string().min(1, {
          message: 'Required',
        }),
      }),
    )
    .min(1, { message: 'Required' }),
});

type UpdateUserRolesProps = {
  selectedItem: User | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<User | null>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const UpdateUserRoles = ({
  selectedItem,
  setSelectedItem,
  open,
  setOpen,
  refetch,
}: UpdateUserRolesProps) => {
  const title = 'Update Role';
  const description = 'Modify the details of an existing role.';

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      roles: [],
    },
  });

  const [isLoadingGetItem, setIsLoadingGetItem] = useState(false);
  const [isLoadingUpdateItem, setIsLoadingUpdateItem] = useState(false);

  useEffect(() => {
    if (selectedItem && open) {
      setIsLoadingGetItem(true);
      mainInstance
        .get(`/api/users/${selectedItem.id}/user-roles`)
        .then(res => {
          const selectedRoles = res.data.rbac_user_roles.map(
            (role: RbacUserRole) => ({
              label: role.rbac_role?.label,
              value: (role.rbac_role?.id || '').toString(),
            }),
          );

          form.reset({
            roles: selectedRoles || [],
          });
        })
        .catch(err => {
          toast.error(
            err.response?.data?.message || err.message || 'An error occurred',
          );
        })
        .finally(() => {
          setIsLoadingGetItem(false);
        });
    }
  }, [selectedItem, form, open]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const newData = {
      role_ids: data.roles.map(role => role.value),
    };

    setIsLoadingUpdateItem(true);

    toast.promise(
      mainInstance.patch(`/api/users/${selectedItem?.id}/user-roles`, newData),
      {
        loading: 'Loading...',
        success: () => {
          refetch();
          return 'Role updated successfully';
        },
        error: error => {
          return (
            error.response?.data?.message ||
            error.message ||
            'An error occurred'
          );
        },
        finally: () => {
          setIsLoadingUpdateItem(false);
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
      <DialogContent onOpenAutoFocus={e => e.preventDefault()}>
        {isLoadingGetItem ? (
          <>
            <DialogSkeleton
              title={title}
              description={description}
              inputCount={2}
            />
          </>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>

              <DialogBody>
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-12">
                    <Label className="mb-1">User</Label>
                    <Input value={formatName(selectedItem)} readOnly />
                  </div>

                  <FormField
                    control={form.control}
                    name="roles"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Roles</FormLabel>
                        <FormControl>
                          <RolesSelect
                            placeholder="Select roles"
                            isMulti
                            closeMenuOnSelect={false}
                            filterOption={(candidate: ReactSelectOption) => {
                              const selectedValues = (field.value || []).map(
                                (item: ReactSelectOption) =>
                                  item.value.toString(),
                              );

                              return !selectedValues.includes(
                                candidate.value.toString(),
                              );
                            }}
                            value={field.value || []}
                            onChange={(value: ReactSelectOption[]) => {
                              const newValue = value.map(
                                (item: ReactSelectOption) => ({
                                  ...item,
                                  value: item.value.toString(),
                                }),
                              );
                              field.onChange(newValue);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </DialogBody>

              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Close
                </Button>
                <Button type="submit" disabled={isLoadingUpdateItem}>
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserRoles;
