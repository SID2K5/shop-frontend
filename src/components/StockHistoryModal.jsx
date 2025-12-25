import React from "react";

export default function StockHistoryModal({ isOpen, onClose, history = [] }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-xl w-full max-w-2xl p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            📜 Stock History
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        {history.length === 0 ? (
          <p className="text-gray-400 text-center py-6">
            No history available for this product.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-800">
                <tr>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Action</th>
                  <th className="p-2 text-left">Qty</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr
                    key={i}
                    className="border-t border-slate-700"
                  >
                    <td className="p-2">
                      {new Date(h.date).toLocaleString()}
                    </td>
                    <td className="p-2">{h.action}</td>
                    <td className="p-2">{h.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* FOOTER */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
