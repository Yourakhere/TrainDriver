import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { API } from "../api";

export default function DutyForm({ reload, editing, onDone }) {
    const [form, setForm] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editing && editing._id) {
            setForm({ ...editing, date: editing.date ? editing.date.split('T')[0] : '' });
        } else {
            setForm({});
        }
    }, [editing]);

    const submit = async () => {
        try {
            setLoading(true);
            setError("");
            // Basic validation
            if (!form.trainNumber || !form.date || !form.driverName) {
                setError("Train Number, Date and Driver Name are required.");
                setLoading(false);
                return;
            }

            if (form._id) {
                await API.put(`/duties/${form._id}`, form);
            } else {
                await API.post("/duties", form);
            }
            setForm({});
            if (reload) await reload();
            if (onDone) onDone();
        } catch (err) {
            setError("Failed to save duty");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded shadow-md border-t-4 border-[#213d77] p-6 mb-6">
            <h3 className="text-lg font-bold text-[#213d77] mb-6 flex items-center border-b pb-2">
                <Plus className="w-5 h-5 mr-2 text-[#fb792b]" />
                {form._id ? 'Edit Duty Record' : 'Add New Duty'}
            </h3>
            {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-6 text-sm">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Train Number</label>
                    <input
                        placeholder="Ex: 12002"
                        value={form.trainNumber || ""}
                        onChange={(e) => setForm({ ...form, trainNumber: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#213d77] focus:border-[#213d77]"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Date</label>
                    <input
                        type="date"
                        value={form.date || ""}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#213d77] focus:border-[#213d77]"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Driver Name</label>
                    <input
                        placeholder="Ex: John Doe"
                        value={form.driverName || ""}
                        onChange={(e) => setForm({ ...form, driverName: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#213d77] focus:border-[#213d77]"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">From Station</label>
                    <input
                        placeholder="Station Code"
                        value={form.from || ""}
                        onChange={(e) => setForm({ ...form, from: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#213d77] focus:border-[#213d77]"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">To Station</label>
                    <input
                        placeholder="Station Code"
                        value={form.to || ""}
                        onChange={(e) => setForm({ ...form, to: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#213d77] focus:border-[#213d77]"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Remarks</label>
                    <input
                        placeholder="Optional"
                        value={form.remarks || ""}
                        onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#213d77] focus:border-[#213d77]"
                    />
                </div>
            </div>

            <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-100 justify-end">
                {form._id && (
                    <button
                        onClick={() => { setForm({}); onDone(); }}
                        className="flex items-center space-x-2 bg-gray-100 text-gray-600 px-5 py-2 rounded font-semibold hover:bg-gray-200 transition text-sm"
                    >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                    </button>
                )}
                <button
                    onClick={submit}
                    disabled={loading}
                    className="flex items-center space-x-2 bg-[#fb792b] text-white px-8 py-2 rounded font-bold hover:bg-[#e06920] transition disabled:bg-gray-400 text-sm shadow-md"
                >
                    <span>{loading ? "Saving..." : "Save Record"}</span>
                </button>
            </div>
        </div>
    );
}
