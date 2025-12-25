export default function Card({ title, value }) {
  return (
    <div className="card p-5">
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
