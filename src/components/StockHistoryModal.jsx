import axios from "axios";
import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/stock-history";

export default function StockHistoryModal({ product, onClose }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (product) {
      axios.get(`${API}/${product._id}`).then((res) => {
        setLogs(res.data);
      });
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4">
          Stock History – {product.name}
        </h2>

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
            {logs.map((l) => (
              <tr key={l._id} className="border-t text-center">
                <td className="p-2">{l.action}</td>
                <td className="p-2">{l.previousQty}</td>
                <td className="p-2">{l.newQty}</td>
                <td
                  className={`p-2 ${
                    l.change > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {l.change > 0 ? "+" : ""}
                  {l.change}
                </td>
                <td className="p-2">
                  {new Date(l.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
