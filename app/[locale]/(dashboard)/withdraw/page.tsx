import FilterBar from "@/components/Withdraw/FilterBar";
import Header from "@/components/Withdraw/Header";
import WithdrawTable from "@/components/Withdraw/WithdrawTable";

const WithDraw = () => {
  return (
    <div className="min-h-screen">
      <div className="px-8 py-6">
        <div className="mb-8 space-y-6">
          <Header />
          <FilterBar />
          {/* <WithdrawTable data={mockData} /> */}

          <WithdrawTable />
        </div>
      </div>
    </div>
  );
};

export default WithDraw;
