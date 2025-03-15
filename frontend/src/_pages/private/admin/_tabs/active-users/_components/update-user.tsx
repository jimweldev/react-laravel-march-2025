import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { User } from '@/_types/user';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mainInstance } from '@/instances/main-instance';

const FormSchema = z.object({
  email: z.string().min(1, {
    message: 'Required',
  }),
  first_name: z.string().min(1, {
    message: 'Required',
  }),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, {
    message: 'Required',
  }),
  suffix: z.string().optional(),
  is_admin: z.string().min(1, {
    message: 'Required',
  }),
  account_type: z.string().min(1, {
    message: 'Required',
  }),
});

type UpdateUserProps = {
  selectedItem: User | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<User | null>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const UpdateUser = ({
  selectedItem,
  setSelectedItem,
  open,
  setOpen,
  refetch,
}: UpdateUserProps) => {
  const title = 'Update User';
  const description = 'Modify the details of an existing user account.';

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      suffix: '',
      is_admin: '0',
      account_type: 'main',
    },
  });

  const [isLoadingGetItem, setIsLoadingGetItem] = useState(false);
  const [isLoadingUpdateItem, setIsLoadingUpdateItem] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setIsLoadingGetItem(true);
      mainInstance
        .get(`/api/users/${selectedItem.id}`)
        .then(res => {
          form.reset({
            email: res.data.email || '',
            first_name: res.data.first_name || '',
            middle_name: res.data.middle_name || '',
            last_name: res.data.last_name || '',
            suffix: res.data.suffix || '',
            is_admin: res.data.is_admin ? '1' : '0',
            account_type: res.data.account_type || 'main',
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
  }, [selectedItem, form]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsLoadingUpdateItem(true);

    toast.promise(mainInstance.patch(`/api/users/${selectedItem?.id}`, data), {
      loading: 'Loading...',
      success: () => {
        refetch();
        return 'User updated successfully';
      },
      error: error => {
        return (
          error.response?.data?.message || error.message || 'An error occurred'
        );
      },
      finally: () => {
        setIsLoadingUpdateItem(false);
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        setSelectedItem(null);
      }}
    >
      <DialogContent onOpenAutoFocus={e => e.preventDefault()}>
        {isLoadingGetItem ? (
          <>
            <DialogSkeleton
              title={title}
              description={description}
              inputCount={3}
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
                    name="first_name"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="middle_name"
                    render={({ field }) => (
                      <FormItem className="col-span-5">
                        <FormLabel>Middle Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem className="col-span-5">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="suffix"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Suffix</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="col-span-6">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="is_admin"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormLabel>Admin</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a value" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="0">No</SelectItem>
                              <SelectItem value="1">Yes</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="account_type"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormLabel>Account Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a value" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="main">Main</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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

export default UpdateUser;
