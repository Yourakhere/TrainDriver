export default function StatusView({ statusData }) {
  if (!statusData || statusData.length === 0) {
    return <p>No status records found.</p>;
  }

  return (
    <div>
      <h3>Status List</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Driver</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {statusData.map((s) => (
            <tr key={s._id}>
              <td>{new Date(s.date).toLocaleDateString()}</td>
              <td>{s.driverName}</td>
              <td>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
