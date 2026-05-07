import React from "react";

const WithdrawTable = () => {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="font-semibold mb-3">Riwayat Penarikan</h2>

      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {/* {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td>{item.amount}</td>
              <td>{item.status}</td>
              <td>{new Date(item.requested_at).toLocaleString()}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawTable;
