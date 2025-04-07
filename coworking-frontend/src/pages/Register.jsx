import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      localStorage.setItem('token', res.data.data.token);
      alert('Registrerad och inloggad!');
      navigate('/bookings');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registreringen misslyckades';
      alert(`❌ ${msg}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrera</h2>
      <input placeholder="Användarnamn" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Lösenord" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button>Registrera</button>
    </form>
  );
}