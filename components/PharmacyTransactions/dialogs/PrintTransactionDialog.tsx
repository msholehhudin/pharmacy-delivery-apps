import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Transaction } from "@/types/transactions";
import { formatDateTime } from "@/utils/helper";
import { FileText, Printer } from "lucide-react";

interface PrintTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
}

const PrintTransactionDialog = ({
  open,
  onOpenChange,
  transaction,
}: PrintTransactionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl maxh-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b-2 border-gray-900  bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-blue-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold">
                Receipt Preview
              </DialogTitle>
              <DialogDescription className="text-xs">
                Transaction ID: {transaction?.prescriptionCode}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable Content dark:bg-blue-400/20 */}
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50 dark:bg-gray-950">
          <div className=" bg-white dark:bg-accent-foreground rounded-lg shadow-sm  p-6 border border-gray-200 ">
            {/* Receipt Header */}
            <div className="text-center border-b-2 border-gray-900 pb-4 mb-5">
              <h1 className="text-xl font-bold text-gray-900 mb-1 dark:text-gray-900">
                mediXpress Pharmacy Delivery Apps
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-600">
                Jl. Pharmacy No . 123, Jakarta
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-600">
                Telp. (021) 1234-5678
              </p>
            </div>

            {/* Transaction Information */}
            <div className="mb-5">
              <h3 className="text-xs font-bold mb-2 text-gray-700 uppercase tracking-wide">
                Informasi Transaksi
              </h3>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between py-1.5 border-b border-dashed border-gray-300">
                  <span className="text-gray-600">ID Transaction</span>
                  <span className="font-medium text-black">
                    {transaction?.prescriptionCode}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-dashed border-gray-300">
                  <span className="text-gray-600">Tanggal Transaksi</span>
                  <span className="font-medium text-black">
                    {transaction?.transactionDate &&
                      formatDateTime(transaction.transactionDate)}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-dashed border-gray-300">
                  <span className="text-gray-600">Metode Transaksi</span>
                  <span className="font-medium text-black uppercase">
                    {transaction?.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-600">Status</span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      transaction?.status == "delivered"
                        ? "bg-green-100 text-green-700"
                        : transaction?.status == "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {transaction?.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="mb-5">
              <h3 className="uppercase text-xs font-bold mb-2 text-gray-700 tracking-wide">
                Informasi Pasien
              </h3>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between py-1.5 border-b border-dashed border-gray-300">
                  <span className="text-gray-600">Nama Pasien</span>
                  <span className="font-medium text-black">
                    {transaction?.patientName}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-dashed border-gray-300">
                  <span className="text-gray-600">No. Telpon</span>
                  <span className="font-medium text-black">
                    {transaction?.patientPhone}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-dashed border-gray-300">
                  <span className="text-gray-600">Alamat Pasien</span>
                  <span className="font-medium text-black max-w-[200px] text-right">
                    {transaction?.patientAddress}
                  </span>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-5">
              <h3 className="uppercase text-xs font-bold mb-2 text-gray-700 tracking-wide">
                Items
              </h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                      <th className="py-2 px-3 text-left text-xs font-semibold text-gray-700">
                        Item
                      </th>
                      <th className="py-2 px-3 text-center text-xs font-semibold text-gray-700">
                        Qty
                      </th>
                      <th className="py-2 px-3 text-right text-xs font-semibold text-gray-700">
                        Price
                      </th>
                      <th className="py-2 px-3 text-right text-xs font-semibold text-gray-700">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 last:border-0">
                      <td className="py-2.5 px-3 text-gray-700">
                        {transaction?.prescriptionDetails}
                      </td>
                      <td className="py-2.5 px-3 text-center text-gray-700">
                        10
                      </td>
                      <td className="py-2.5 px-3 text-right text-gray-700">
                        Rp. 10.000,00
                      </td>
                      <td className="py-2.5 px-3 text-right font-medium text-gray-700">
                        Rp. 100.000,00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total Section */}
            <div className="border-t-2 border-gray-900 pt-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-600 font-medium">
                    Rp.100.000,00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Section */}
        <DialogFooter className="py-4 px-6 border-t ">
          <Button type="button" variant={"outline"}>
            Close
          </Button>
          <Button type="submit">
            <Printer className="w-4 h-4" />
            Print Receipt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrintTransactionDialog;
