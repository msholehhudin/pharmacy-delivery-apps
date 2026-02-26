import { Transaction } from "@/types/transactions";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar, Pill, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

interface PharmacyStatsProps {
  transactions: Transaction[];
}

// const PharmacyStats = ({ transactions }: PharmacyStatsProps) => {
const PharmacyStats = () => {
  const t = useTranslations("Transactions");
  return (
    <div className="grid md:grid-cols-4 gap-6 grid-cols-1">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("card1Title")}
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {/* {formatCurrency(totalRevenue)} */}
            Rp. 12.000.000
          </div>
          <p className="text-xs text-muted-foreground">+12% {t("card1Desc")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("card2Title")}
          </CardTitle>
          <Pill className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {/* {totalMedicinesSold} */}
            40
          </div>
          <p className="text-xs text-muted-foreground">{t("card2Desc")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("card3Title")}
          </CardTitle>
          <Calendar className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">
            {/* {totalMedicinesSold} */}
            40
          </div>
          <p className="text-xs text-muted-foreground">{t("card3Desc")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("card4Title")}
          </CardTitle>
          <Calendar className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">
            {/* {totalMedicinesSold} */}0
          </div>
          <p className="text-xs text-muted-foreground">{t("card4Desc")}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyStats;
