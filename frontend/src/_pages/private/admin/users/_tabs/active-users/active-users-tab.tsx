import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaBoxArchive } from 'react-icons/fa6';
import { User } from '@/_types/user';
import fallbackImage from '@/assets/images/default-avatar.png';
import DataTable, {
  DataTableColumns,
} from '@/components/data-tables/data-table';
import Fancybox from '@/components/images/fancy-box';
import ReactImage from '@/components/images/react-image';
import InputGroup from '@/components/inputs/input-group';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import usePagination from '@/hooks/use-pagination';
import { formatName } from '@/lib/format-name';
import { getImageUrl } from '@/lib/get-image-url';
import CreateUser from './_components/create-user';
import DeleteUser from './_components/delete-user';
import ImportUsers from './_components/import-users';
import UpdateUser from './_components/update-user';

const ActiveUsersTab = () => {
  // PAGINATION
  const usersPagination = usePagination('/api/users/paginate', 'first_name');

  // MODAL STATES
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [openCreateUser, setOpenCreateUser] = useState<boolean>(false);
  const [openUpdateUser, setOpenUpdateUser] = useState<boolean>(false);
  const [openDeleteUser, setOpenDeleteUser] = useState<boolean>(false);
  const [openImportUsers, setOpenImportUsers] = useState<boolean>(false);

  // TABLE HEADER
  const dataTableColumns: DataTableColumns[] = [
    {
      label: 'Name',
      column: 'first_name',
    },
    {
      label: 'Email',
      column: 'email',
    },
    {
      label: 'Role',
      column: 'is_admin',
    },
    {
      label: 'Actions',
    },
  ];

  // ACTIONS
  const Actions = (
    <div className="space-x-2">
      <Button
        size="sm"
        onClick={() => {
          setOpenCreateUser(true);
        }}
      >
        Create
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpenImportUsers(true)}
      >
        Import
      </Button>
    </div>
  );

  return (
    <>
      <Fancybox>
        <DataTable
          pagination={usersPagination}
          columns={dataTableColumns}
          actions={Actions}
        >
          {!usersPagination.error && usersPagination.data
            ? usersPagination.data.records?.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <a
                        data-fancybox={`${user.id}`}
                        href={getImageUrl(
                          `${import.meta.env.VITE_STORAGE_BASE_URL}/avatars`,
                          user.avatar,
                          fallbackImage,
                        )}
                      >
                        <div className="outline-primary border-card flex aspect-square h-8 cursor-pointer items-center overflow-hidden rounded-full border-1 outline-2 select-none">
                          <ReactImage
                            className="pointer-events-none h-full w-full object-cover"
                            src={getImageUrl(
                              `${import.meta.env.VITE_STORAGE_BASE_URL}/avatars`,
                              user.avatar,
                              fallbackImage,
                            )}
                            fallback={fallbackImage}
                          />
                        </div>
                      </a>
                      <div>
                        <h6 className="font-medium">
                          {formatName(user, 'semifull')}
                        </h6>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.is_admin ? 'success' : 'default'}>
                      {user.is_admin ? 'Admin' : 'User'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <InputGroup size="sm">
                      <Button
                        variant="info"
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenUpdateUser(true);
                        }}
                        size="xs"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenDeleteUser(true);
                        }}
                        size="xs"
                      >
                        <FaBoxArchive />
                      </Button>
                    </InputGroup>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </DataTable>
      </Fancybox>

      {/* modals */}
      <CreateUser
        open={openCreateUser}
        setOpen={setOpenCreateUser}
        refetch={usersPagination.refetch}
      />
      <UpdateUser
        selectedItem={selectedUser}
        setSelectedItem={setSelectedUser}
        open={openUpdateUser}
        setOpen={setOpenUpdateUser}
        refetch={usersPagination.refetch}
      />
      <DeleteUser
        selectedItem={selectedUser}
        setSelectedItem={setSelectedUser}
        open={openDeleteUser}
        setOpen={setOpenDeleteUser}
        refetch={usersPagination.refetch}
      />
      <ImportUsers
        open={openImportUsers}
        setOpen={setOpenImportUsers}
        refetch={usersPagination.refetch}
      />
    </>
  );
};

export default ActiveUsersTab;
