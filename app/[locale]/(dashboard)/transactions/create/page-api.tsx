import PdfPreview from "@/components/TransactionsUpload/PdfPreview";
import PdfUploader from "@/components/TransactionsUpload/PdfUploader";
import TransactionForm from "@/components/TransactionsUpload/TransactionForm";

const CreateTransactionPage = () => {
  //   const tx = useTransactions();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Tambah Transaksi</h1>
        <p className="text-sm text-muted-foreground">
          Upload nota dan proses pengiriman obat
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="border rounded-xl p-4 bg-white">
          {!tx.pdfUrl ? (
            <PdfUploader
              onUpload={tx.handleUpload}
              loading={tx.loadingUpload}
            />
          ) : (
            <PdfPreview pdfUrl={tx.pdfUrl} onReplace={tx.resetFile} />
          )}
        </div>

        {/* RIGHT */}
        <div className="border rounded-xl p-4 bg-white">
          <TransactionForm
            disabled={!tx.pdfUrl}
            form={tx.form}
            setForm={tx.setForm}
            onCalculate={tx.calculate}
            summary={tx.summary}
            onSubmit={tx.save}
            loading={tx.loadingSave}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTransactionPage;
