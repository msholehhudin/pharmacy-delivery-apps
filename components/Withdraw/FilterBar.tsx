import React from "react";
import { Button } from "../ui/button";

const FilterBar = () => {
  return (
    <div className="flex gap-4">
      <select className="border rounded px-3 py-2">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      <Button>Apply</Button>
    </div>
  );
};

export default FilterBar;
