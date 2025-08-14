import { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { useJobs } from '../context/useJobs';

export const Toast = ({ toast, onRemove }) => {
  const { id, message, type } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, onRemove]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-error';
      case 'warning':
        return 'alert-warning';
      default:
        return 'alert-info';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      case 'error':
        return <XCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  return (
    <div className={`alert ${getToastStyles()} shadow-lg mb-3`}>
      {getIcon()}
      <span className="flex-1">{message}</span>
      <button
        onClick={() => onRemove(id)}
        className="btn btn-ghost btn-sm btn-circle"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

const ToastContainer = () => {
  const { toasts, removeToast } = useJobs();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast toast-top toast-end z-50">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onRemove={removeToast}
        />
      ))}
    </div>
  );
};