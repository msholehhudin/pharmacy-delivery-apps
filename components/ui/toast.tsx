import { AlertCircle, CheckCircle, Icon, X } from "lucide-react";
import React from "react";

export interface ToastProps {
  message: string;
  type?: string;
  onClose?: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  const Icon = type === "success" ? CheckCircle : AlertCircle;
  return (
    <div>
      <Icon className="h-5 w-5" />
      <span>{message}</span>
      <button onClick={onClose}>
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;
