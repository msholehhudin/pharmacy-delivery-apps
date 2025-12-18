export const formatCurrency = (amount: number | string) => {
  if(amount == null || amount == undefined) return "";

  const number = typeof amount === "string" ? parseInt(amount.replace(/\D/g, ""), 10) : amount

  if(isNaN(number)) return "";

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };