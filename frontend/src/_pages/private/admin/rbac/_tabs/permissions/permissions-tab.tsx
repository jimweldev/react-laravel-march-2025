import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import { RbacPermission } from '@/_types/rbac-permission';
import DataTable, {
  DataTableColumns,
} from '@/components/data-tables/data-table';
import InputGroup from '@/components/inputs/input-group';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import usePagination from '@/hooks/use-pagination';
import CreatePermission from './_components/create-permission';
import DeletePermission from './_components/delete-permission';
import UpdatePermission from './_components/update-permission';

const PermissionsTab = () => {
  // PAGINATION
  const rbacPermissionsPagination = usePagination(
    '/api/rbac/permissions/paginate',
    'label',
  );

  // MODAL STATES
  const [selectedRbacPermission, setSelectedRbacPermission] =
    useState<RbacPermission | null>(null);

  const [openCreateRbacPermission, setOpenCreateRbacPermission] =
    useState<boolean>(false);
  const [openUpdateRbacPermission, setOpenUpdateRbacPermission] =
    useState<boolean>(false);
  const [openDeleteRbacPermission, setOpenDeleteRbacPermission] =
    useState<boolean>(false);

  // TABLE HEADER
  const dataTableColumns: DataTableColumns[] = [
    {
      label: 'Label',
      column: 'label',
    },
    {
      label: 'Value',
      column: 'value',
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
          setOpenCreateRbacPermission(true);
        }}
      >
        Create
      </Button>
    </div>
  );

  return (
    <>
      <DataTable
        pagination={rbacPermissionsPagination}
        columns={dataTableColumns}
        actions={Actions}
      >
        {!rbacPermissionsPagination.error && rbacPermissionsPagination.data
          ? rbacPermissionsPagination.data.records?.map(
              (rbacPermission: RbacPermission) => (
                <TableRow key={rbacPermission.id}>
                  <TableCell>{rbacPermission.label}</TableCell>
                  <TableCell>{rbacPermission.value}</TableCell>
                  <TableCell>
                    <InputGroup size="sm">
                      <Button
                        variant="info"
                        onClick={() => {
                          setSelectedRbacPermission(rbacPermission);
                          setOpenUpdateRbacPermission(true);
                        }}
                        size="xs"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setSelectedRbacPermission(rbacPermission);
                          setOpenDeleteRbacPermission(true);
                        }}
                        size="xs"
                      >
                        <FaTrash />
                      </Button>
                    </InputGroup>
                  </TableCell>
                </TableRow>
              ),
            )
          : null}
      </DataTable>

      {/* MODALS */}
      <CreatePermission
        open={openCreateRbacPermission}
        setOpen={setOpenCreateRbacPermission}
        refetch={rbacPermissionsPagination.refetch}
      />
      <UpdatePermission
        selectedItem={selectedRbacPermission}
        setSelectedItem={setSelectedRbacPermission}
        open={openUpdateRbacPermission}
        setOpen={setOpenUpdateRbacPermission}
        refetch={rbacPermissionsPagination.refetch}
      />
      <DeletePermission
        selectedItem={selectedRbacPermission}
        setSelectedItem={setSelectedRbacPermission}
        open={openDeleteRbacPermission}
        setOpen={setOpenDeleteRbacPermission}
        refetch={rbacPermissionsPagination.refetch}
      />
    </>
  );
};

export default PermissionsTab;
