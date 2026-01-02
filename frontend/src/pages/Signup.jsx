import { useState } from "react";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import Header from "../components/Header";

export default function Signup() {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async () => {
    try {
      setLoading(true);
      setError("");
      await API.post("/auth/signup", form);
      alert("Admin created. Login now.");
      navigate("/admin/login");
    } catch (err) {
      setError("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded shadow-lg border-t-4 border-[#fb792b] p-8 w-full max-w-md">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="bg-orange-50 p-4 rounded-full mb-4">
              <UserPlus className="w-10 h-10 text-[#fb792b]" />
            </div>
            <h2 className="text-2xl font-bold text-[#213d77]">Admin Signup</h2>
            <p className="text-gray-500 text-sm mt-1">Create a new administrator account</p>
          </div>
          {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-6 text-sm border-l-4 border-red-500">{error}</div>}

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Username</label>
              <input
                placeholder="Choose username"
                onChange={e => setForm({ ...form, username: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#fb792b] focus:border-[#fb792b]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Password</label>
              <input
                type="password"
                placeholder="Choose password"
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#fb792b] focus:border-[#fb792b]"
              />
            </div>
            <button
              onClick={signup}
              disabled={loading}
              className="w-full bg-[#213d77] text-white py-3 rounded font-bold hover:bg-[#1a3263] transition disabled:bg-gray-400 shadow mt-2 uppercase tracking-wide"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
