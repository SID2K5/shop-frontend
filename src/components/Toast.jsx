import toast, { Toaster } from "react-hot-toast";
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

const iconMap = {
  success: <CheckCircle2 size={16} />,
  error: <XCircle size={16} />,
  warning: <AlertTriangle size={16} />,
  info: <Info size={16} />,
};

const colorMap = {
  success: { bg: "var(--success-light)", color: "var(--success)", border: "var(--success-border)" },
  error: { bg: "var(--danger-light)", color: "var(--danger)", border: "var(--danger-border)" },
  warning: { bg: "var(--warning-light)", color: "var(--warning)", border: "var(--warning-border)" },
  info: { bg: "var(--primary-light)", color: "var(--primary)", border: "var(--powder-blue)" },
};

export function showToast(message, type = "success") {
  const c = colorMap[type] || colorMap.success;
  toast.custom(
    (t) => (
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] text-sm font-medium transition-all duration-300 ${
          t.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
        style={{
          background: "var(--bg-card)",
          border: `1px solid ${c.border}`,
          boxShadow: "var(--shadow-lg)",
          color: "var(--text-primary)",
          maxWidth: 360,
        }}
      >
        <span style={{ color: c.color }} className="flex-shrink-0">
          {iconMap[type]}
        </span>
        <span className="flex-1">{message}</span>
      </div>
    ),
    { duration: 3000, position: "top-right" }
  );
}

export function ToastProvider() {
  return <Toaster containerStyle={{ top: 12, right: 12 }} />;
}
