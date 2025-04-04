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
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import DataTableHead from './data-table-head';

interface PaginationState<T> {
  data?: {
    records: T[];
    info: Info;
  };
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  limit: string;
  sort: string;
  currentPage: number;
  searchTerm: string;
  setLimit: (limit: string) => void;
  setSort: (sort: string) => void;
  setCurrentPage: (page: number) => void;
  setSearchTerm: (searchTerm: string) => void;
}

export interface DataTableColumns {
  label: string;
  column?: string;
}

interface DataTableProps<T> {
  pagination?: PaginationState<T>; // Make `pagination` optional for safety
  columns: DataTableColumns[];
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

const DataTable = <T,>({
  pagination = {
    // Provide default values for the pagination state
    data: { records: [], info: { total: 0, pages: 1 } },
    isLoading: false,
    isFetching: false,
    error: null,
    limit: '10',
    sort: '',
    currentPage: 1,
    searchTerm: '',
    setLimit: () => {},
    setSort: () => {},
    setCurrentPage: () => {},
    setSearchTerm: () => {},
  },
  columns,
  actions,
  children,
}: DataTableProps<T>) => {
  const {
    data,
    isLoading,
    isFetching,
    error,
    limit,
    sort,
    currentPage,
    searchTerm,
    setLimit,
    setSort,
    setCurrentPage,
    setSearchTerm,
  } = pagination;

  const records = data?.records || [];
  const info = data?.info;

  const handlePageChange = ({ selected }: { selected: number }) =>
    setCurrentPage(selected + 1);

  return (
    <div className="space-y-3">
      <div className="flex flex-col items-center justify-between gap-2 @xl/main:flex-row">
        {actions && <div>{actions}</div>}
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
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <HorizontalScrollbar>
        <Table className={`border-t ${isFetching ? 'border-primary' : ''}`}>
          <TableHeader className="select-none">
            <TableRow>
              {columns.map(({ label, column }) =>
                column ? (
                  <DataTableHead
                    key={label}
                    sort={sort}
                    setSort={setSort}
                    setCurrentPage={setCurrentPage}
                    label={label}
                    column={column}
                  />
                ) : (
                  <TableHead key={label}>{label}</TableHead>
                ),
              )}
            </TableRow>
          </TableHeader>
          <TableBody className="border-b">
            {children}
            {!isFetching && !error && records.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center font-medium"
                >
                  No data found
                </TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center font-medium"
                >
                  Error loading data
                </TableCell>
              </TableRow>
            )}
            {isLoading && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center font-medium"
                >
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </HorizontalScrollbar>

      <div className="flex flex-col items-center justify-between gap-2 @2xl/main:flex-row">
        <span className="text-muted-foreground text-sm">
          {`Showing ${
            records.length > 0 ? (currentPage - 1) * Number(limit) + 1 : 0
          } to ${(currentPage - 1) * Number(limit) + records.length} of ${
            info?.total || 0
          } entries`}
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
