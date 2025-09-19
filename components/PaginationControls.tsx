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
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}{" "}
        </span>
        <Button
          variant={"outline"}
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-4">
        {/* <span>Showing</span> */}
        <Select
          value={String(pageSize)}
          onValueChange={(e) => onPageSizeChange(Number(e))}
        >
          <SelectTrigger className="min-w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 50, 100].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size} per page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PaginationControls;
