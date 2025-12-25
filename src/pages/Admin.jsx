import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome Admin 👑</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
