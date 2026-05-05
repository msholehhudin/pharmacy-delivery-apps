const PdfPreview = ({ pdfUrl, onReplace }: any) => {
  return (
    <div className="space-y-3">
      <iframe src={pdfUrl} className="w-full h-[500px] rounded-md" />

      <button onClick={onReplace} className="text-sm text-blue-500 underline">
        Ganti File
      </button>
    </div>
  );
};

export default PdfPreview;
