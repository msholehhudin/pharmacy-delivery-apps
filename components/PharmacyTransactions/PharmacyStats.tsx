import { Transaction } from "@/types/transactions";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar, Pill, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils/transactions/currency";

interface PharmacyStatsProps {
  transactions: Transaction[];
}

// const PharmacyStats = ({ transactions }: PharmacyStatsProps) => {
const PharmacyStats = () => {
  return (
    <div className="grid md:grid-cols-4 gap-6 grid-cols-1">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {/* {formatCurrency(totalRevenue)} */}
            Rp. 12.000.000
          </div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Medicines Sold</CardTitle>
          <Pill className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {/* {totalMedicinesSold} */}
            40
          </div>
          <p className="text-xs text-muted-foreground">Units this month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
          <Calendar className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">
            {/* {totalMedicinesSold} */}
            40
          </div>
          <p className="text-xs text-muted-foreground">Active prescriptions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          <Calendar className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">
            {/* {totalMedicinesSold} */}0
          </div>
          <p className="text-xs text-muted-foreground">Awaiting processing</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyStats;
