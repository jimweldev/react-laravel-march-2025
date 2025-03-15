import { useState } from 'react';
import { useDebouncedState } from '@mantine/hooks';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { FaEdit } from 'react-icons/fa';
import { FaBoxArchive } from 'react-icons/fa6';
import { PaginatedRecords } from '@/_types/common/paginated-records';
import { User } from '@/_types/user';
import DataTable from '@/components/data-tables/data-table';
import DataTableHead from '@/components/data-tables/data-table-head';
import InputGroup from '@/components/inputs/input-group';
import { Button } from '@/components/ui/button';
import {
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mainInstance } from '@/instances/main-instance';
import CreateUser from './_components/create-user';
import DeleteUser from './_components/delete-user';
import UpdateUser from './_components/update-user';

const ActiveUsersTab = () => {
  // PAGINATION
  const [limit, setLimit] = useState<string>('10');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sort, setSort] = useState<string>('first_name');
  const [searchTerm, setSearchTerm] = useDebouncedState('', 200);

  const {
    isLoading,
    isFetching,
    error,
    data: users,
    refetch: refetchUsers,
  } = useQuery<PaginatedRecords<User>>({
    queryKey: ['users/paginate', searchTerm, limit, currentPage, sort],
    queryFn: async (): Promise<PaginatedRecords<User>> => {
      const res = await mainInstance.get(
        `/api/users/paginate?search=${searchTerm}&limit=${limit}&page=${currentPage}&sort=${sort}`,
      );
      return res.data;
    },
    placeholderData: keepPreviousData,
  });

  // MODAL STATES
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [openCreateUser, setOpenCreateUser] = useState<boolean>(false);
  const [openUpdateUser, setOpenUpdateUser] = useState<boolean>(false);
  const [openDeleteUser, setOpenDeleteUser] = useState<boolean>(false);
  const [openImportUsers, setOpenImportUsers] = useState<boolean>(false);

  // TABLE HEADER
  const DataTableHeader = (
    <TableHeader className="select-none">
      <TableRow>
        <DataTableHead
          sort={sort}
          setSort={setSort}
          setCurrentPage={setCurrentPage}
          label="Name"
          column="first_name"
        />
        <DataTableHead
          sort={sort}
          setSort={setSort}
          setCurrentPage={setCurrentPage}
          label="Email"
          column="email"
        />
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );

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
      <Button variant="outline" size="sm">
        Import
      </Button>
    </div>
  );

  return (
    <>
      <DataTable
        data={users?.records}
        setLimit={setLimit}
        setCurrentPage={setCurrentPage}
        setSearchTerm={setSearchTerm}
        limit={limit}
        currentPage={currentPage}
        searchTerm={searchTerm}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
        info={users?.info}
        header={DataTableHeader}
        actions={Actions}
      >
        {!error && users
          ? users.records?.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex gap-2">
                    <div>
                      <h6 className="font-medium">{`${user?.first_name} ${user?.last_name}`}</h6>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
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

      {/* modals */}
      <CreateUser
        open={openCreateUser}
        setOpen={setOpenCreateUser}
        refetch={refetchUsers}
      />
      <UpdateUser
        selectedItem={selectedUser}
        setSelectedItem={setSelectedUser}
        open={openUpdateUser}
        setOpen={setOpenUpdateUser}
        refetch={refetchUsers}
      />
      <DeleteUser
        selectedItem={selectedUser}
        setSelectedItem={setSelectedUser}
        open={openDeleteUser}
        setOpen={setOpenDeleteUser}
        refetch={refetchUsers}
      />
    </>
  );
};

export default ActiveUsersTab;
