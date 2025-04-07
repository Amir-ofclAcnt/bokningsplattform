import { useEffect, useState } from "react";
import api from "../api";
import { Trash2 } from "lucide-react";

export default function Admin() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    name: "",
    capacity: "",
    type: "workspace",
  });

  const getRooms = () => {
    api
      .get("/rooms", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setRooms(res.data.data))
      .catch((err) => console.error("Kunde inte hämta rum", err));
  };

  useEffect(() => {
    getRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/rooms", form, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setForm({ name: "", capacity: "", type: "workspace" });
    getRooms();
  };

  const handleDelete = async (roomId) => {
    await api.delete(`/rooms/${roomId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    getRooms();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
        Adminpanel – Rumshantering
      </h2>

      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          ➕ Skapa nytt rum
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Namn"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 rounded border"
          />
          <input
            placeholder="Kapacitet"
            type="number"
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            className="w-full p-2 rounded border"
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full p-2 rounded border"
          >
            <option value="workspace">Arbetsplats</option>
            <option value="conference">Konferensrum</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Skapa rum
          </button>
        </form>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          📁 Alla rum
        </h3>
        <div className="space-y-2">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="flex items-center justify-between bg-white dark:bg-gray-900 p-3 rounded-lg shadow"
            >
              <span className="text-gray-700 dark:text-gray-100">
                <strong>{room.name}</strong> ({room.type}, {room.capacity} pers)
              </span>
              <button
                onClick={() => handleDelete(room._id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
