import { useEffect, useState } from "react";
import api from "../api/axios";

export default function StockHistoryModal({ product, onClose }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!product) return;

    api
      .get(`/stock-history/${product._id}`)
      .then((res) => setLogs(res.data))
      .catch((err) => {
        console.error("Failed to load stock history", err);
        setLogs([]);
      });
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4">
          Stock History – {product.name}
        </h2>

        <div className="max-h-96 overflow-y-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Action</th>
                <th className="p-2">Previous</th>
                <th className="p-2">New</th>
                <th className="p-2">Change</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No stock history available
                  </td>
                </tr>
              ) : (
                logs.map((l) => (
                  <tr key={l._id} className="border-t text-center">
                    <td className="p-2">{l.action}</td>
                    <td className="p-2">{l.previousQty}</td>
                    <td className="p-2">{l.newQty}</td>
                    <td
                      className={`p-2 font-semibold ${
                        l.change > 0
                          ? "text-green-600"
                          : l.change < 0
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {l.change > 0 ? "+" : ""}
                      {l.change}
                    </td>
                    <td className="p-2">
                      {new Date(l.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
