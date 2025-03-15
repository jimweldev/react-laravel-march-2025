import { ChevronUp } from 'lucide-react';
import { TableHead } from '../ui/table';

interface DataTableHeadProps {
  sort: string;
  setSort: (sort: string) => void;
  setCurrentPage: (page: number) => void;
  label: string;
  column: string;
  className?: string;
}

const DataTableHead: React.FC<DataTableHeadProps> = ({
  sort,
  setSort,
  setCurrentPage,
  label,
  column,
  className = '',
}) => {
  const isCurrentSort = sort.replace('-', '') === column;
  const isDescending = sort.startsWith('-');

  const handleSetSort = () => {
    const newSort = isCurrentSort
      ? isDescending
        ? column
        : `-${column}`
      : column;
    setSort(newSort);
    setCurrentPage(1);
  };

  return (
    <TableHead
      className={`cursor-pointer ${className}`}
      onClick={handleSetSort}
    >
      <div className="flex items-center justify-between">
        <span>{label}</span>
        <ChevronUp
          className={`transform transition-transform duration-200 ${isCurrentSort ? (isDescending ? 'rotate-180' : '') : 'hidden'}`}
          size={16}
        />
      </div>
    </TableHead>
  );
};

export default DataTableHead;
