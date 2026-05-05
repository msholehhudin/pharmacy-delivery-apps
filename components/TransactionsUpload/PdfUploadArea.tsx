// /modules/transactions/ui/PdfUploadArea.tsx
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PdfUploadArea({ onUpload, loading }: any) {
  return (
    <div
      className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-[420px] text-center px-6 cursor-pointer"
      onClick={() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/pdf";
        input.onchange = (e: any) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
        };
        input.click();
      }}
    >
      <UploadCloud className="h-10 w-10 mb-3 text-muted-foreground" />

      <p className="text-sm font-medium">
        Drop PDF di sini atau klik untuk memilih file
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        PDF hasil kasir • Maks 10MB
      </p>

      <Button variant="secondary" className="mt-4 cursor-pointer">
        Pilih File
      </Button>

      {loading && <p className="text-xs mt-2">Uploading...</p>}
    </div>
  );
}
