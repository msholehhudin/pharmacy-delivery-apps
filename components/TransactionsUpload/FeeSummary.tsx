// /modules/transactions/ui/FeeSummary.tsx
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils/formatters/currency";

export default function FeeSummary({ summary }: any) {
  return (
    <div className="p-4 rounded-lg bg-muted text-sm space-y-2">
      <div className="flex justify-between">
        <span>Biaya pengiriman</span>
        <span>{formatCurrency(summary.deliveryFee)}</span>
      </div>

      <Separator />

      <div className="flex justify-between">
        <span>Fee Kurir (55%)</span>
        <span>{formatCurrency(summary.courierFee)}</span>
      </div>

      <div className="flex justify-between">
        <span>Fee System (15%)</span>
        <span>{formatCurrency(summary.systemFee)}</span>
      </div>

      <div className="flex justify-between">
        <span>Fee Operator (15%)</span>
        <span>{formatCurrency(summary.operatorFee)}</span>
      </div>

      <div className="flex justify-between">
        <span>Fee Corporate (15%)</span>
        <span>{formatCurrency(summary.corporateFee)}</span>
      </div>

      <Separator />

      <div className="flex justify-between font-semibold text-base">
        <span>Total</span>
        <span>{formatCurrency(summary.total)}</span>
      </div>
    </div>
  );
}
