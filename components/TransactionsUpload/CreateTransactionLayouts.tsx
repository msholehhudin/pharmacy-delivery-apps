// /modules/transactions/ui/CreateTransactionLayout.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import PdfUploadArea from "./PdfUploadArea";
import PdfViewer from "./PdfViewer";
import RightPanelForm from "./RightPanelForm";

export default function CreateTransactionLayout(props: any) {
  const {
    pdfUrl,
    loadingUpload,
    onUpload,
    onReplace,
    form,
    setForm,
    disabled,
    onCalculate,
    summary,
    onSubmit,
    loadingSave,
  } = props;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Tambah Transaksi
        </h1>
        <p className="text-sm text-muted-foreground">
          Upload nota kasir, verifikasi data, lalu simpan transaksi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs">
                1
              </span>
              Upload Dokumen Kasir
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0">
            {!pdfUrl ? (
              <PdfUploadArea onUpload={onUpload} loading={loadingUpload} />
            ) : (
              <PdfViewer pdfUrl={pdfUrl} onReplace={onReplace} />
            )}
          </CardContent>
        </Card>

        {/* RIGHT */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs">
                2
              </span>
              Verifikasi & Konfirmasi
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0">
            <RightPanelForm
              form={form}
              setForm={setForm}
              disabled={disabled}
              onCalculate={onCalculate}
              summary={summary}
              onSubmit={onSubmit}
              loading={loadingSave}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
