import { useState } from 'react';
import { useDebouncedState } from '@mantine/hooks';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { FaHistory } from 'react-icons/fa';
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
import RestoreUser from './_components/restore-user';

const ArchivedUsersTab = () => {
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
    queryKey: ['users/archived/paginate', searchTerm, limit, currentPage, sort],
    queryFn: async (): Promise<PaginatedRecords<User>> => {
      const res = await mainInstance.get(
        `/api/users/archived/paginate?search=${searchTerm}&limit=${limit}&page=${currentPage}&sort=${sort}`,
      );
      return res.data;
    },
    placeholderData: keepPreviousData,
  });

  // MODAL STATES
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [openRestoreUser, setOpenRestoreUser] = useState<boolean>(false);

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

      <RestoreUser
        selectedItem={selectedUser}
        setSelectedItem={setSelectedUser}
        open={openRestoreUser}
        setOpen={setOpenRestoreUser}
        refetch={refetchUsers}
      />
    </>
  );
};

export default ArchivedUsersTab;
