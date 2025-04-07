import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

// 👇 Glöm inte att ta emot setIsLoggedIn som prop
export default function Login({ setIsLoggedIn }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      const token = res.data.data.token;

      localStorage.setItem("token", token);
      setIsLoggedIn(true); // Uppdatera login-status

      alert("✅ Inloggad!");
      navigate("/bookings");
    } catch (err) {
      alert("❌ Fel användarnamn eller lösenord");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Logga in</h2>
      <input
        placeholder="Användarnamn"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Lösenord"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Logga in</button>
    </form>
  );
}
