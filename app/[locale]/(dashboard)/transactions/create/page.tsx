// /app/transactions/create/page.tsx
"use client";

import CreateTransactionLayout from "@/components/TransactionsUpload/CreateTransactionLayouts";
import { useState, useEffect } from "react";

export default function CreateTransactionPage() {
  // dummy state (UI-first)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const [form, setForm] = useState({
    name: "",
    trxNo: "",
    date: "",
    address: "",
    totalPrice: 0,
    distance: 0,
  });

  const [summary, setSummary] = useState<null | {
    deliveryFee: number;
    systemFee: number;
    operatorFee: number;
    corporateFee: number;
    courierFee: number;
    total: number;
  }>(null);

  const handleUpload = (file: File) => {
    setLoadingUpload(true);
    const url = URL.createObjectURL(file);
    setPdfUrl(url);

    // simulasi auto-fill (optional)
    setForm((s) => ({
      ...s,
      name: "Budi Santoso",
      trxNo: "TRX-2024-00891",
      date: "21 Apr 2026",
      address: "Jl. Mawar No. 12, Kebayoran Lama, Jakarta Selatan 12240",
      totalPrice: 245000,
      distance: 7.5,
    }));

    setTimeout(() => setLoadingUpload(false), 400);
  };

  const resetFile = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
    setSummary(null);
  };

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const calculate = () => {
    const deliveryFee = Math.round(form.distance * 3500);

    const courierFee = Math.round(deliveryFee * 0.55);
    const systemFee = Math.round(deliveryFee * 0.15);
    const operatorFee = Math.round(deliveryFee * 0.15);
    const corporateFee = Math.round(deliveryFee * 0.15);

    const total = form.totalPrice + deliveryFee;

    setSummary({
      deliveryFee,
      systemFee,
      operatorFee,
      corporateFee,
      courierFee,
      total,
    });
  };

  const save = () => {
    setLoadingSave(true);
    setTimeout(() => {
      setLoadingSave(false);
      alert("Simulasi: Transaksi berhasil disimpan");
    }, 600);
  };

  return (
    <CreateTransactionLayout
      pdfUrl={pdfUrl}
      loadingUpload={loadingUpload}
      onUpload={handleUpload}
      onReplace={resetFile}
      form={form}
      setForm={setForm}
      disabled={!pdfUrl}
      onCalculate={calculate}
      summary={summary}
      onSubmit={save}
      loadingSave={loadingSave}
    />
  );
}
