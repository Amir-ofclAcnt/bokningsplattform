import { useEffect, useState } from "react";
import api from "../api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api
      .get("/bookings", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setBookings(res.data.data))
      .catch((err) => console.error("Kunde inte hämta bokningar", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Mina bokningar
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Du har inga bokningar ännu.
        </p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="border rounded-xl p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-blue-600">
                📍 {b.roomId?.name || "Okänt rum"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                ⏰ {new Date(b.startTime).toLocaleString()} →{" "}
                {new Date(b.endTime).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Boknings-ID: {b._id}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
