// /modules/transactions/ui/PdfViewer.tsx
import { Button } from "@/components/ui/button";

export default function PdfViewer({ pdfUrl, onReplace }: any) {
  return (
    <div className="space-y-3">
      <iframe src={pdfUrl} className="w-full h-[420px] rounded-md border" />

      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">Preview dokumen</span>

        <Button variant="outline" size="sm" onClick={onReplace}>
          Ganti PDF
        </Button>
      </div>
    </div>
  );
}
