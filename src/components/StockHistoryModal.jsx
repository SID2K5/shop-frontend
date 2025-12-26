import { useEffect, useState } from "react";
import api from "../api/axios";

export default function StockHistoryModal({ product, onClose, isOpen }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!product || !isOpen) return;

    const fetchHistory = async () => {
      try {
        const res = await api.get(`/stock-history/${product._id}`);
        setLogs(res.data.history || []);
      } catch (err) {
        console.error("Failed to fetch stock history", err);
        setLogs([]);
      }
    };

    fetchHistory();
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-slate-900 text-gray-200 rounded-xl p-6 w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4">
          📜 Stock History – {product.name}
        </h2>

        {logs.length === 0 ? (
          <p className="text-gray-400 text-center">
            No history available for this product.
          </p>
        ) : (
          <table className="w-full border border-slate-700">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-2">Previous</th>
                <th className="p-2">New</th>
                <th className="p-2">Change</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l, i) => {
                const change = l.newQty - l.previousQty;
                return (
                  <tr key={i} className="border-t border-slate-700 text-center">
                    <td className="p-2">{l.previousQty}</td>
                    <td className="p-2">{l.newQty}</td>
                    <td
                      className={`p-2 ${
                        change > 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {change > 0 ? "+" : ""}
                      {change}
                    </td>
                    <td className="p-2">
                      {new Date(l.date).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
