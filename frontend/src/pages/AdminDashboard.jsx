import { useState, useEffect } from "react";
import { LayoutDashboard, Calendar, Edit2, Trash2 } from "lucide-react";
import { API } from "../api";
import Header from "../components/Header";
import DutyForm from "../components/DutyForm";

export default function AdminDashboard() {
  const [duties, setDuties] = useState([]);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      setError("");
      const res = await API.get("/duties");
      setDuties(res.data || []);
    } catch (err) {
      setError("Failed to load duties");
    }
  };

  const del = async (id) => {
    if (!confirm("Delete this duty?")) return;
    try {
      setError("");
      await API.delete(`/duties/${id}`);
      load();
    } catch (err) {
      setError("Failed to delete duty");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 border-b pb-4 border-gray-200">
          <h2 className="text-2xl font-bold text-[#213d77] flex items-center">
            <LayoutDashboard className="w-7 h-7 mr-3 text-[#fb792b]" />
            Admin Dashboard
          </h2>
          <p className="text-gray-500 mt-1 ml-10">Manage train driver duties and schedules</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded mb-6 border-l-4 border-red-500">{error}</div>}

        <DutyForm reload={load} editing={editing} onDone={() => setEditing(null)} />

        <div className="bg-white rounded shadow-sm border border-gray-200 p-0 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-bold text-[#213d77] flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Recent Duties
            </h3>
            <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{duties.length} Records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#213d77] text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider text-xs">Date</th>
                  <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider text-xs">Train No.</th>
                  <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider text-xs">From</th>
                  <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider text-xs">To</th>
                  <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider text-xs">Driver</th>
                  <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider text-xs">Remarks</th>
                  <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {duties && duties.length > 0 ? duties.map((d, index) => (
                  <tr key={d._id} className={`border-b border-gray-100 hover:bg-blue-50 transition ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-6 py-4 font-medium text-gray-900">{d.date ? new Date(d.date).toLocaleDateString() : "-"}</td>
                    <td className="px-6 py-4 font-bold text-[#213d77]">{d.trainNumber}</td>
                    <td className="px-6 py-4 text-gray-600">{d.from || "-"}</td>
                    <td className="px-6 py-4 text-gray-600">{d.to || "-"}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{d.driverName || "-"}</td>
                    <td className="px-6 py-4 text-gray-500 italic max-w-xs truncate">{d.remarks || "-"}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setEditing(d)}
                          className="text-blue-600 hover:text-blue-900 transition"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => del(d._id)}
                          className="text-red-500 hover:text-red-800 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500 italic">No duties found. Add a new one above.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
