// /modules/transactions/ui/RightPanelForm.tsx
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FeeSummary from "./FeeSummary";

export default function RightPanelForm({
  form,
  setForm,
  disabled,
  onCalculate,
  summary,
  onSubmit,
  loading,
}: any) {
  return (
    <div className="space-y-5">
      <div className="text-xs text-muted-foreground">
        Data berikut dapat diedit jika tidak sesuai.
      </div>

      {/* Nama */}
      <div className="space-y-1">
        <label className="text-sm font-medium flex justify-between">
          Nama pasien
          <Badge variant="secondary">dari PDF</Badge>
        </label>
        <Input
          disabled={disabled}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      {/* TRX + Date */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium">No. transaksi</label>
          <Input
            disabled={disabled}
            value={form.trxNo}
            onChange={(e) => setForm({ ...form, trxNo: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Tanggal</label>
          <Input
            disabled={disabled}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
      </div>

      {/* Address */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Alamat pengiriman</label>
        <Textarea
          disabled={disabled}
          rows={3}
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
      </div>

      {/* Price + Distance */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium">Total tagihan</label>
          <Input
            type="number"
            disabled={disabled}
            value={form.totalPrice}
            onChange={(e) =>
              setForm({
                ...form,
                totalPrice: Number(e.target.value),
              })
            }
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Jarak (km)</label>
          <Input
            type="number"
            disabled={disabled}
            value={form.distance}
            onChange={(e) =>
              setForm({
                ...form,
                distance: Number(e.target.value),
              })
            }
          />
        </div>
      </div>

      {/* Action */}
      <Button
        variant="secondary"
        onClick={onCalculate}
        disabled={disabled}
        className="w-full"
      >
        Hitung Ongkir
      </Button>

      {summary && <FeeSummary summary={summary} />}

      <Button
        onClick={onSubmit}
        disabled={!summary || loading}
        className="w-full"
      >
        {loading ? "Menyimpan..." : "Simpan Transaksi"}
      </Button>
    </div>
  );
}
