import { Loader2 } from "lucide-react";
import React from "react";

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 dark:bg-white/10 backdrop-blur-sm">
      <Loader2 className="h-10 w-10 animate-spin text-gray-700 dark:text-white" />
    </div>
  );
};

export default FullScreenLoader;
