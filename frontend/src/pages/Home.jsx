import { useState, useEffect } from "react";
import { Train, Search, Calendar, LayoutDashboard } from "lucide-react";
import { API } from "../api";
import Header from "../components/Header";
 
export default function Home() {
  const [duties, setDuties] = useState([]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("calendar");

  const fetchData = async () => {
    try {
      setError("");
      const res = await API.get("/duties", {
        params: { driver: search, date }
      });
      setDuties(res.data || []);
    } catch (err) {
      setError("Failed to load duties");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getDutiesByDate = () => {
    const dutyMap = {};
    duties.forEach(duty => {
      const dateKey = new Date(duty.date).toISOString().split('T')[0];
      if (!dutyMap[dateKey]) dutyMap[dateKey] = [];
      dutyMap[dateKey].push(duty);
    });
    return dutyMap;
  };

  const renderCalendar = () => {
    const dutyMap = getDutiesByDate();
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startDay; i++) {
      // empty cells before 1st of month
      days.push(<div key={`empty-${i}`} className="p-2 border-b border-r bg-gray-50"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayDuties = dutyMap[dateStr] || [];
      const isToday = day === today.getDate() && month === today.getMonth();

      days.push(
        <div key={day} className={`border-b border-r p-2 min-h-24 transition hover:bg-gray-50 ${isToday ? 'bg-orange-50' : 'bg-white'}`}>
          <div className={`text-sm font-bold mb-1 ${isToday ? 'text-[#fb792b]' : 'text-gray-700'}`}>{day}</div>
          <div className="space-y-1 overflow-y-auto max-h-20 custom-scrollbar">
            {dayDuties.map((duty, idx) => (
              <div key={idx} className="bg-blue-50 hover:bg-blue-100 text-xs p-1.5 rounded border-l-2 border-[#213d77] cursor-pointer" title={`${duty.trainNumber} - ${duty.driverName}`}>
                <div className="font-bold text-[#213d77]">{duty.trainNumber}</div>
                <div className="text-gray-600 truncate">{duty.driverName}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-[#213d77] flex items-center">
              <Train className="w-8 h-8 mr-3 text-[#fb792b]" />
              Duty Roster
            </h2>
            <p className="text-gray-500 ml-11 mt-1 text-sm">View and manage train driver schedules</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center space-x-2 px-4 py-2 rounded font-semibold transition text-sm ${viewMode === "calendar" ? "bg-[#213d77] text-white shadow-md" : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"}`}
            >
              <Calendar className="w-4 h-4" />
              <span>Calendar</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center space-x-2 px-4 py-2 rounded font-semibold transition text-sm ${viewMode === "list" ? "bg-[#213d77] text-white shadow-md" : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>List</span>
            </button>
          </div>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">{error}</div>}

        <div className="bg-[#213d77] rounded-lg shadow-lg p-6 mb-8 text-white">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-blue-200">Search Records</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative text-gray-900">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                placeholder="Search by Driver Name or Train Number"
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded border-0 outline-none focus:ring-2 focus:ring-[#fb792b]"
              />
            </div>
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              className="text-gray-900 px-4 py-2.5 rounded border-0 outline-none focus:ring-2 focus:ring-[#fb792b]"
            />
            <button
              onClick={fetchData}
              className="flex items-center justify-center space-x-2 bg-[#fb792b] text-white px-8 py-2.5 rounded font-bold hover:bg-[#e06920] transition shadow-lg uppercase tracking-wide text-sm"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {viewMode === "calendar" ? (
          <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h3 className="text-lg font-bold text-[#213d77] flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Monthly Overview
              </h3>
            </div>
            <div className="grid grid-cols-7 border-b border-gray-200 bg-[#213d77] text-white">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-bold text-xs uppercase tracking-wider p-3">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 bg-gray-200 gap-px border-l border-b border-gray-200">
              {renderCalendar()}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h3 className="text-lg font-bold text-[#213d77] flex items-center">
                <LayoutDashboard className="w-5 h-5 mr-2" />
                Duty List
              </h3>
            </div>
            {duties && duties.length > 0 ? (
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
                    </tr>
                  </thead>
                  <tbody>
                    {duties.map((d, index) => (
                      <tr key={d._id} className={`border-b border-gray-100 hover:bg-blue-50 transition ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="px-6 py-4 font-medium text-gray-900">{new Date(d.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 font-bold text-[#213d77]">{d.trainNumber}</td>
                        <td className="px-6 py-4 text-gray-600">{d.from || "-"}</td>
                        <td className="px-6 py-4 text-gray-600">{d.to || "-"}</td>
                        <td className="px-6 py-4 font-medium text-gray-800">{d.driverName}</td>
                        <td className="px-6 py-4 text-gray-500 italic">{d.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8 italic">No duties match your search.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
