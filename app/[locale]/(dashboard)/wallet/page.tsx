import BalanceCard from "@/components/Wallets/BalanceCard";
import WalletHeader from "@/components/Wallets/Header";
import TransactionTable from "@/components/Wallets/TransactionTable";
import WithdrawForm from "@/components/Wallets/WithdrawForm";
import WithdrawTable from "@/components/Wallets/WithdrawTable";

const Wallet = async () => {
  return (
    <div className="min-h-screen">
      <div className="px-8 py-6">
        <div className="mb-8 space-y-6">
          <WalletHeader />
          <BalanceCard />
          <WithdrawForm />
          <TransactionTable />
          <WithdrawTable />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
