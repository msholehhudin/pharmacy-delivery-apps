import React from "react";
import { Card, CardContent } from "../ui/card";
import { formatCurrency } from "@/lib/utils/formatters/currency";

const BalanceCard = () => {
  const data = {
    balance: 1500000,
    earned: 5000000,
    withdrawn: 3500000,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Saldo Saat Ini</p>
          <p className="text-xl font-semibold">
            {formatCurrency(data.balance)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Total Pendapatan</p>
          <p className="text-xl font-semibold">{formatCurrency(data.earned)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Total Penarikan</p>
          <p className="text-xl font-semibold">
            {formatCurrency(data.withdrawn)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceCard;
