import { Download, Plus, Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

interface PharmacyFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  onAddTransaction: () => void;
}

const PharmacyFilters = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onAddTransaction,
}: PharmacyFiltersProps) => {
  // console.log("search : ", search);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between my-6">
      <div className="sm:flex sm:items-center sm:flex-row space-x-4 hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 2-4" />
          <Input
            placeholder="Search transactions or medicines..."
            className="pl-10 w-80"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="hover:cursor-pointer">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">On Delivery</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant={"outline"} className="hover:cursor-pointer">
          <Download className="mr-2 w-4 h-4" />
          Export
        </Button>
        <Button className="hover:cursor-pointer" onClick={onAddTransaction}>
          <Plus className="mr-2 w-4 h-4" />
          Add Transaction
        </Button>
      </div>
    </div>
  );
};

export default PharmacyFilters;
