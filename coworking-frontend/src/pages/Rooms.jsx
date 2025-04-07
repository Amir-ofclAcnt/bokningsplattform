import { useEffect, useState } from "react";
import api from "../api";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("workspace");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchRooms = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const res = await api.get("/rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Svar från /rooms:", res.data);
      setRooms(res.data?.data || []); // 💥 rätt format!
    } catch (err) {
      console.error("Kunde inte hämta rum:", err);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      setError("");
      setMessage("");
      await api.post(
        "/rooms",
        { name, capacity, type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setName("");
      setCapacity("");
      setType("workspace");
      setMessage("✅ Rummet skapades!");
      fetchRooms(); // uppdatera listan
    } catch (err) {
      console.error("Kunde inte skapa rum:", err);
      setError("❌ Kunde inte skapa rum – du har kanske inte adminbehörighet");
    }
  };

  const handleDeleteRoom = async (roomId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Vill du verkligen ta bort detta rum?")) return;

    try {
      await api.delete(`/rooms/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("✅ Rummet har tagits bort.");
      fetchRooms();
    } catch (err) {
      console.error("Kunde inte ta bort rum:", err);
      setError("❌ Kunde inte ta bort rummet (saknar adminbehörighet?)");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Adminpanel – Rumshantering</h2>

      <form onSubmit={handleCreateRoom} style={styles.form}>
        <h3>➕ Skapa nytt rum</h3>
        <div style={styles.field}>
          <label>Namn:</label>
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div style={styles.field}>
          <label>Kapacitet:</label>
          <input
            style={styles.input}
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>

        <div style={styles.field}>
          <label>Typ av rum:</label>
          <select
            style={styles.select}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="workspace">Arbetsplats</option>
            <option value="conference">Konferensrum</option>
            <option value="meetingroom">Mötesrum</option>
            <option value="private">Privat rum</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>
          Skapa rum
        </button>
        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
      </form>

      <div style={styles.roomList}>
        <h3>📋 Alla rum</h3>
        {loading ? (
          <p>Laddar rum...</p>
        ) : rooms.length === 0 ? (
          <p>Inga rum hittades.</p>
        ) : (
          <ul style={{ paddingLeft: 0 }}>
            {rooms.map((room) => (
              <li key={room._id} style={styles.roomItem}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>
                    <strong>{room.name}</strong> ({room.type}, {room.capacity}{" "}
                    pers)
                  </span>
                  <button
                    onClick={() => handleDeleteRoom(room._id)}
                    style={styles.deleteButton}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  form: {
    background: "#f7f7f7",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    marginBottom: "2rem",
  },
  field: {
    marginBottom: "1rem",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "4px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  select: {
    width: "100%",
    padding: "8px",
    marginTop: "4px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  success: {
    color: "green",
    marginTop: "0.5rem",
  },
  error: {
    color: "red",
    marginTop: "0.5rem",
  },
  roomList: {
    background: "#f1f1f1",
    padding: "1rem",
    borderRadius: "8px",
  },
  roomItem: {
    listStyle: "none",
    padding: "8px",
    borderBottom: "1px solid #ddd",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "4px 8px",
    cursor: "pointer",
  },
};
