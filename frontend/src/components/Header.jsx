import { Link } from "react-router-dom";
import { Train, LogIn, UserPlus, LayoutDashboard, LogOut } from "lucide-react";

export default function Header() {
  const token = localStorage.getItem("token");
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  return (
    <div className="bg-[#213d77] shadow-md border-b-4 border-[#fb792b]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="flex items-center space-x-3 group text-decoration-none">
            <div className="bg-white p-2 rounded-full shadow-sm group-hover:scale-105 transition-transform duration-200">
              <Train className="w-6 h-6 text-[#213d77]" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white tracking-wide">RAILWAY CREW</h1>
              <span className="text-xs text-blue-200 font-medium tracking-wider uppercase">Management System</span>
            </div>
          </Link>
          <div className="flex space-x-3">
            {!token ? (
              <>
                <Link to="/admin/login">
                  <button className="flex items-center space-x-2 bg-white text-[#213d77] px-4 py-2 rounded font-bold hover:bg-gray-100 transition shadow-sm text-sm uppercase">
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </button>
                </Link>
                {/* <Link to="/admin/signup">
                  <button className="flex items-center space-x-2 bg-[#fb792b] text-white px-4 py-2 rounded font-bold hover:bg-[#e06920] transition shadow-sm text-sm uppercase">
                    <UserPlus className="w-4 h`-4" />
                    <span>Signup</span>
                  </button>
                </Link> */}
              </>
            ) : (
              <>
                <Link to="/admin/dashboard">
                  <button className="flex items-center space-x-2 bg-white text-[#213d77] px-4 py-2 rounded font-bold hover:bg-gray-100 transition shadow-sm text-sm uppercase">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </button>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center justify-center bg-[#dc2626] text-white px-3 py-2 rounded font-bold hover:bg-[#b91c1c] transition shadow-sm"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
