import { useState, useEffect } from "react";
import API from "../api";

export default function DutyForm({ reload, editing, onDone }) {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // sync editing prop into form state
  useEffect(() => {
    if (editing && editing._id) {
      setForm({ ...editing });
    }
  }, [editing]);

  const submit = async () => {
    try {
      setLoading(true);
      setError("");
      if (form._id) {
        await API.put(`/duties/${form._id}`, form);
      } else {
        await API.post("/duties", form);
      }
      setForm({});
      if (reload) await reload();
      if (onDone) onDone();
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || "Failed to add duty");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Add Duty</h4>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input placeholder="Train No" value={form.trainNumber || ""} onChange={(e) => setForm({ ...form, trainNumber: e.target.value })} />
      
      <input placeholder="From (Station)" value={form.from || ""} onChange={(e) => setForm({ ...form, from: e.target.value })} />
      <input placeholder="To (Station)" value={form.to || ""} onChange={(e) => setForm({ ...form, to: e.target.value })} />
       
      <input placeholder="Date" type="date" value={form.date || ""} onChange={(e) => setForm({ ...form, date: e.target.value })} />
       <input placeholder="Driver Name" value={form.driverName || ""} onChange={(e) => setForm({ ...form, driverName: e.target.value })} />
      <input placeholder="Remarks" value={form.remarks || ""} onChange={(e) => setForm({ ...form, remarks: e.target.value })} />
      <button onClick={submit} disabled={loading}>{loading ? "Saving..." : "Save"}</button>
    </div>
  );
}
