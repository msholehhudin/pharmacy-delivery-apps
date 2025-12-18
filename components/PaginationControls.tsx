import { Button } from "./ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "./ui/select";

interface PaginationControlProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (page: number) => void;
}

const PaginationControls = ({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: PaginationControlProps) => {
  const totalPages = Math.ceil(total / pageSize);
  return (
    <div className="flex justify-between items-center mt-4">
      {/* Left */}
      <div className="items-center space-x-2 flex">
        <Button
          variant={"outline"}
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="hover:cursor-pointer"
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          variant={"outline"}
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="hover:cursor-pointer"
        >
          Next
        </Button>
      </div>

      {/* Right */}
      <div className="md:flex items-center space-x-4 hidden">
        {/* <span>Showing</span> */}
        <span>Rows per page</span>
        <Select
          value={String(pageSize)}
          onValueChange={(e) => onPageSizeChange(Number(e))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 50, 100].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PaginationControls;
