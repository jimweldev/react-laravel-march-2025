import React from 'react';
import ReactPaginate from 'react-paginate';
import { Info } from '@/_types/common/paginated-records';
import HorizontalScrollbar from '../scrollbars/horizontal-scrollbar';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';

interface DataTableProps<T> {
  data?: T[];
  setLimit: (limit: string) => void;
  setCurrentPage: (page: number) => void;
  setSearchTerm: (searchTerm: string) => void;
  limit: string;
  currentPage: number;
  searchTerm: string;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  info?: Info;
  header: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

const DataTable = <T,>({
  data,
  setLimit,
  setCurrentPage,
  setSearchTerm,
  limit,
  currentPage,
  searchTerm,
  isLoading,
  isFetching,
  error,
  info,
  header,
  actions,
  children,
}: DataTableProps<T>) => {
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col items-center justify-between gap-2 @xl/main:flex-row">
        {actions ? <div>{actions}</div> : <div />}
        <div className="flex flex-col items-center justify-between gap-2 @lg/main:flex-row">
          <Input
            placeholder="Search..."
            className="w-[180px]"
            inputSize="sm"
            defaultValue={searchTerm}
            onChange={e => {
              setCurrentPage(1);
              setSearchTerm(e.target.value);
            }}
          />
          <Select
            value={limit}
            onValueChange={value => {
              setLimit(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger size="sm" className="@lg/main:w-[70px]">
              <SelectValue placeholder="Select entry" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Entries</SelectLabel>
                {[10, 25, 50, 100].map(value => (
                  <SelectItem key={value} value={value.toString()}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <HorizontalScrollbar>
        <Table className={`border-t ${isFetching ? 'border-primary' : ''}`}>
          {header}
          <TableBody className="border-b">
            {children}
            {!isFetching && !error && data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={100} className="text-center font-medium">
                  No data found
                </TableCell>
              </TableRow>
            )}
            {!isFetching && error && (
              <TableRow>
                <TableCell colSpan={100} className="text-center font-medium">
                  Error loading data
                </TableCell>
              </TableRow>
            )}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={100} className="text-center font-medium">
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </HorizontalScrollbar>
      <div className="flex flex-col items-center justify-between gap-2 @2xl/main:flex-row">
        <span className="text-muted-foreground text-sm">
          {`Showing ${(data?.length || 0) > 0 ? (currentPage - 1) * Number(limit) + 1 : 0} to ${(currentPage - 1) * Number(limit) + (data ? data.length : 0)} of ${data ? info?.total || 0 : 0} entries`}
        </span>
        <ReactPaginate
          containerClassName="pagination pagination-sm"
          pageCount={info?.pages || 1}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          forcePage={currentPage - 1}
          previousLabel={<>&laquo;</>}
          nextLabel={<>&raquo;</>}
          breakLabel="..."
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default DataTable;
