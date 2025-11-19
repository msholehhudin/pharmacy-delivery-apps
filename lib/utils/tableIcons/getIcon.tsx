import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
} from "lucide-react";

export const getPaymentIcon = (method: string) => {
  switch (method) {
    case "credit_card":
    case "debit_card":
      return <CreditCard className="h-4 w-4" />;
    default:
      return <DollarSign className="h-4 w-4" />;
  }
};

export const getTransactionTypeIcon = (type: string) => {
  switch (type) {
    case "payment":
      return <ArrowUpRight className="h-4 w-4 text-green-600" />;
    case "refund":
      return <ArrowDownRight className="h-4 w-4 text-red-600" />;
    default:
      return <DollarSign className="h-4 w-4" />;
  }
};
