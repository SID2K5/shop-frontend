import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome User 👤</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
