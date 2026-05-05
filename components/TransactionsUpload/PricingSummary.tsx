const PricingSummary = ({ summary }: any) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg text-sm space-y-1">
      <div>Ongkir: Rp {summary.deliveryFee}</div>
      <div className="font-semibold">Total: Rp {summary.total}</div>
    </div>
  );
};

export default PricingSummary;
