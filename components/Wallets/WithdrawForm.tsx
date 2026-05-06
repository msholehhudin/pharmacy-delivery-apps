"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const WithdrawForm = () => {
  const [amount, setAmount] = useState("");
  // const supabase = createClient()

  const handleWithdraw = async () => {
    const value = Number(amount);

    if (!value || value <= 0) return alert("Invalid amount");

    // const { error } = await supabase
    //   .from("withdraw_requests")
    //   .insert({
    //     amount: value,
    //     role: "courier", // dynamic later
    //   })

    // if (error) {
    //   alert(error.message)
    // } else {
    //   alert("Withdraw request submitted")
    //   setAmount("")
    // }
  };

  return (
    <div className="flex gap-2 items-end">
      <div>
        <label className="text-sm">Jumlah Penarikan</label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Masukkan jumlah"
        />
      </div>

      <Button onClick={handleWithdraw}>Tarik Saldo</Button>
    </div>
  );
};

export default WithdrawForm;
