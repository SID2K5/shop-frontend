export default function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-xl p-6">
        <h2 className="text-lg font-bold mb-3">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this item?
        </p>

        <div className="flex justify-end gap-3">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
