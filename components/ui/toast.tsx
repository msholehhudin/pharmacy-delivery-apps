import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Icon,
  Info,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export interface ToastProps {
  message: string;
  type?: string;
  title?: string;
  duration?: number;
  onClose?: () => void;
  autoClose?: boolean;
}

const Toast = ({
  message,
  type = "info",
  title,
  duration = 5000,
  onClose,
  autoClose = true,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!autoClose) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - 100 / (duration / 100);
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, 100);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [duration, onClose, autoClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          bgColor: "bg-green-50 border-green-200",
          textColor: "text-green-800",
          iconColor: "text-green-600",
          progressColor: "bg-green-500",
          Icon: CheckCircle,
          defaultTitle: "Success",
        };
      case "error":
        return {
          bgColor: "bg-red-50 border-red-200",
          textColor: "text-red-800",
          iconColor: "text-red-600",
          progressColor: "bg-red-500",
          Icon: AlertCircle,
          defaultTitle: "Error",
        };
      case "warning":
        return {
          bgColor: "bg-yellow-50 border-yellow-200",
          textColor: "text-yellow-800",
          iconColor: "text-yellow-600",
          progressColor: "bg-yellow-500",
          Icon: AlertTriangle,
          defaultTitle: "Warning",
        };
      case "info":
      default:
        return {
          bgColor: "bg-blue-50 border-blue-200",
          textColor: "text-blue-800",
          iconColor: "text-blue-600",
          progressColor: "bg-blue-500",
          Icon: Info,
          defaultTitle: "Information",
        };
    }
  };

  const config = getToastConfig();
  const displayTitle = title || config.defaultTitle;

  return (
    <div
      className={`
        relative overflow-hidden rounded-lg border shadow-lg max-w-sm w-full
        transform transition-all duration-300 ease-in-out
        ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }
        ${config.bgColor}
      `}
    >
      {autoClose && (
        <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full">
          <div
            className={`h-full transition-all duration-100 ease-linear ${config.progressColor}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="p-4 pt-5">
        <div className="flex items-start space-x-3">
          <div className={`flex-shrink-0 ${config.iconColor}`}>
            <config.Icon className="h-6 w-6" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className={`text-sm font-semibold ${config.textColor} mb-1`}>
              {displayTitle}
            </h4>
            <p
              className={`text-sm ${config.textColor} opacity-90 leading-relaxed`}
            >
              {message}
            </p>
          </div>

          <button
            onClick={handleClose}
            className={`
              flex-shrink-0 p-1 rounded-full transition-colors duration-200
              ${config.textColor} hover:bg-black hover:bg-opacity-10
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50
            `}
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
