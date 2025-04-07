import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const syncUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setUser(jwtDecode(token));
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    syncUser();
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold text-gray-800">
          🏢 Coworking
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-6 items-center text-sm">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Rum</Link>
          {user && <Link to="/bookings" className="text-gray-700 hover:text-blue-600">Mina bokningar</Link>}
          {user?.role === "Admin" && (
            <Link to="/admin" className="text-gray-700 hover:text-blue-600">Admin</Link>
          )}
          {!user && (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Logga in</Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">Registrera</Link>
            </>
          )}
          {user && (
            <>
              <span className="text-gray-600">👤 {user.username}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>Logga ut</Button>
            </>
          )}
        </div>

        {/* Mobil */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem asChild><Link to="/">Rum</Link></DropdownMenuItem>
              {user && <DropdownMenuItem asChild><Link to="/bookings">Mina bokningar</Link></DropdownMenuItem>}
              {user?.role === "Admin" && <DropdownMenuItem asChild><Link to="/admin">Admin</Link></DropdownMenuItem>}
              {!user && (
                <>
                  <DropdownMenuItem asChild><Link to="/login">Logga in</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/register">Registrera</Link></DropdownMenuItem>
                </>
              )}
              {user && (
                <>
                  <DropdownMenuItem disabled>👤 {user.username}</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>Logga ut</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
