import PricingSummary from "./PricingSummary";

const TransactionForm = ({
  disabled,
  form,
  setForm,
  onCalculate,
  summary,
  onSubmit,
  loading,
}: any) => {
  return (
    <div className="space-y-4">
      <input
        disabled={disabled}
        placeholder="Nama Pasien"
        className="input"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <textarea
        disabled={disabled}
        placeholder="Alamat"
        className="input"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <input
        type="number"
        disabled={disabled}
        placeholder="Total Harga"
        className="input"
        value={form.totalPrice}
        onChange={(e) => setForm({ ...form, totalPrice: +e.target.value })}
      />

      <input
        type="number"
        disabled={disabled}
        placeholder="Jarak (km)"
        className="input"
        value={form.distance}
        onChange={(e) => setForm({ ...form, distance: +e.target.value })}
      />

      <button onClick={onCalculate} disabled={disabled} className="btn">
        Hitung Ongkir
      </button>

      {summary && <PricingSummary summary={summary} />}

      <button
        onClick={onSubmit}
        disabled={!summary || loading}
        className="btn-primary w-full"
      >
        {loading ? "Menyimpan..." : "Simpan Transaksi"}
      </button>
    </div>
  );
};

export default TransactionForm;
