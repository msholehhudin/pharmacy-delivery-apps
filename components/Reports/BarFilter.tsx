import { Button } from "../ui/button";
import { Input } from "../ui/input";

const BarFilter = () => {
  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div>
        <label className="text-sm">Start Date</label>
        <Input type="date" />
      </div>

      <div>
        <label className="text-sm">End Date</label>
        <Input type="date" />
      </div>

      <Button>Apply</Button>
    </div>
  );
};

export default BarFilter;
