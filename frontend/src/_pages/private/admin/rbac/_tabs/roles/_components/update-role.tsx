import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ReactSelectOption } from '@/_types/common/react-select';
import { RbacRolePermission } from '@/_types/rbac-role-permission';
import { User } from '@/_types/user';
import PermissionsSelect from '@/components/react-select/permissions-select';
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
import { mainInstance } from '@/instances/main-instance';

const FormSchema = z.object({
  label: z.string().min(1, {
    message: 'Required',
  }),
  value: z.string().min(1, {
    message: 'Required',
  }),
  permissions: z
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

type UpdateRoleProps = {
  selectedItem: User | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<User | null>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const UpdateRole = ({
  selectedItem,
  setSelectedItem,
  open,
  setOpen,
  refetch,
}: UpdateRoleProps) => {
  const title = 'Update Role';
  const description = 'Modify the details of an existing role.';

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      label: '',
      value: '',
      permissions: [],
    },
  });

  const [isLoadingGetItem, setIsLoadingGetItem] = useState(false);
  const [isLoadingUpdateItem, setIsLoadingUpdateItem] = useState(false);

  useEffect(() => {
    if (selectedItem && open) {
      setIsLoadingGetItem(true);
      mainInstance
        .get(`/api/rbac/roles/${selectedItem.id}`)
        .then(res => {
          const selectedPermissions = res.data.rbac_role_permissions.map(
            (permission: RbacRolePermission) => ({
              label: permission.rbac_permission?.label,
              value: (permission.rbac_permission?.id || '').toString(),
            }),
          );

          form.reset({
            label: res.data.label || '',
            value: res.data.value || '',
            permissions: selectedPermissions || [],
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
      ...data,
      permission_ids: data.permissions.map(permission => permission.value),
    };

    // remove permissions on newData
    if ('permissions' in newData) {
      delete (newData as { permissions?: unknown }).permissions;
    }

    setIsLoadingUpdateItem(true);

    toast.promise(
      mainInstance.patch(`/api/rbac/roles/${selectedItem?.id}`, newData),
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
                  <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="permissions"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Permissions</FormLabel>
                        <FormControl>
                          <PermissionsSelect
                            placeholder="Select permissions"
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

export default UpdateRole;
