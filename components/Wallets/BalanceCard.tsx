"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import { formatCurrency } from "@/lib/utils/formatters/currency";
import { useTranslations } from "next-intl";
import { Wallet, TrendingUp, ArrowUpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
  variant?: "default" | "primary";
};

const StatCard = ({
  label,
  value,
  subtitle,
  icon,
  variant = "default",
}: StatCardProps) => {
  const isPrimary = variant === "primary";

  return (
    <Card
      className={cn(
        "relative overflow-hidden",
        isPrimary && "bg-emerald-700 border-emerald-700 text-white",
      )}
    >
      <CardContent className="p-5">
        <div
          className={cn(
            "flex items-center gap-2 text-xs mb-2",
            isPrimary ? "text-emerald-100" : "text-muted-foreground",
          )}
        >
          {icon}
          <span>{label}</span>
        </div>
        <p
          className={cn(
            "text-2xl font-semibold tracking-tight",
            isPrimary ? "text-white" : "text-foreground",
          )}
        >
          {formatCurrency(value)}
        </p>
        <p
          className={cn(
            "text-xs mt-2",
            isPrimary ? "text-emerald-200" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>

        {/* decorative background icon */}
        <div
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 opacity-10",
            isPrimary ? "text-white" : "text-foreground",
          )}
          aria-hidden="true"
        >
          <div className="scale-[2.5]">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

const BalanceCard = () => {
  const t = useTranslations("walletCards");

  const data = {
    balance: 1500000,
    earned: 5000000,
    withdrawn: 3500000,
  };

  const cards: StatCardProps[] = [
    {
      label: t("card1"),
      value: data.balance,
      subtitle: t("card1Subtitle", { defaultValue: "Siap ditarik kapan saja" }),
      icon: <Wallet className="w-4 h-4" />,
      variant: "primary",
    },
    {
      label: t("card2"),
      value: data.earned,
      subtitle: t("card2Subtitle", { defaultValue: "+12 order bulan ini" }),
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      label: t("card3"),
      value: data.withdrawn,
      subtitle: t("card3Subtitle", { defaultValue: "3 kali penarikan" }),
      icon: <ArrowUpCircle className="w-4 h-4" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
};

export default BalanceCard;
