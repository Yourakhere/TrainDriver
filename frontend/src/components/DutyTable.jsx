import { useState } from "react";

export default function DutyTable({ duties }) {
  if (!duties || duties.length === 0) {
    return <p>No duties found.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Train</th>
          <th>From</th>
          <th>To</th> 
          <th>Driver</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
        {duties.map((d) => (
          <tr key={d._id}>
            <td>{new Date(d.date).toLocaleDateString()}</td>
            <td>{d.trainNumber}</td>
            <td>{d.from || "-"}</td>
            <td>{d.to || "-"}</td>
             <td>{d.driverName}</td>
            <td>{d.remarks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
