import React from "react";

const TransactionTable = () => {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="font-semibold mb-3">Riwayat Transaksi</h2>

      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {/* {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td>{item.type}</td>
              <td>{item.amount}</td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
