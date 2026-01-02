import { useState } from "react";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import Header from "../components/Header";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded shadow-lg border-t-4 border-[#213d77] p-8 w-full max-w-md">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="bg-blue-50 p-4 rounded-full mb-4">
              <LogIn className="w-10 h-10 text-[#213d77]" />
            </div>
            <h2 className="text-2xl font-bold text-[#213d77]">Admin Login</h2>
            <p className="text-gray-500 text-sm mt-1">Sign in to manage duty roster</p>
          </div>
          {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-6 text-sm border-l-4 border-red-500">{error}</div>}

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Username</label>
              <input
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#213d77] focus:border-[#213d77]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#213d77] focus:border-[#213d77]"
              />
            </div>
            <button
              onClick={login}
              disabled={loading}
              className="w-full bg-[#fb792b] text-white py-3 rounded font-bold hover:bg-[#e06920] transition disabled:bg-gray-400 shadow mt-2 uppercase tracking-wide"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
