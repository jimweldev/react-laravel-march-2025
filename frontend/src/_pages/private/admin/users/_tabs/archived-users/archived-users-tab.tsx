import { useState } from 'react';
import { FaHistory } from 'react-icons/fa';
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
import RestoreUser from './_components/restore-user';

const ArchivedUsersTab = () => {
  // PAGINATION
  const usersPagination = usePagination(
    '/api/users/archived/paginate',
    'first_name',
  );

  // MODAL STATES
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openRestoreUser, setOpenRestoreUser] = useState<boolean>(false);

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

  return (
    <>
      <Fancybox>
        <DataTable pagination={usersPagination} columns={dataTableColumns}>
          {!usersPagination.error && usersPagination.data
            ? usersPagination.data.records?.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <a
                        data-fancybox={`${user.id}`}
                        href={`${user?.avatar ? `${import.meta.env.VITE_STORAGE_BASE_URL}/avatars/${user.avatar}` : fallbackImage}`}
                      >
                        <div className="outline-primary border-card flex aspect-square h-8 cursor-pointer items-center overflow-hidden rounded-full border-1 outline-2 select-none">
                          <ReactImage
                            className="pointer-events-none h-full w-full object-cover"
                            src={`${user?.avatar ? `${import.meta.env.VITE_STORAGE_BASE_URL}/avatars/${user.avatar}` : fallbackImage}`}
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
                        variant="warning"
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenRestoreUser(true);
                        }}
                        size="xs"
                      >
                        <FaHistory />
                      </Button>
                    </InputGroup>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </DataTable>
      </Fancybox>

      <RestoreUser
        selectedItem={selectedUser}
        setSelectedItem={setSelectedUser}
        open={openRestoreUser}
        setOpen={setOpenRestoreUser}
        refetch={usersPagination.refetch}
      />
    </>
  );
};

export default ArchivedUsersTab;
