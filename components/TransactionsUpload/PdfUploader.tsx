const PdfUploader = ({ onUpload, loading }: any) => {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed rounded-lg">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => onUpload(e.target.files[0])}
      />

      {loading && <p className="text-sm mt-2">Uploading...</p>}
    </div>
  );
};

export default PdfUploader;
