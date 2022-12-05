import DashboardCard from "./DashboardCard/DashboardCard";

const OverviewSection = ({ cashFlow }) => {
  return (
    <>
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold">Overview</h2>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <DashboardCard
            title="Income"
            description="Cash In"
            amount={cashFlow.income}
            isExpense={false}
          />
          <DashboardCard
            title="Expense"
            description="Cash Out"
            amount={cashFlow.expense}
            isExpense={true}
          />
          <DashboardCard
            title="Net"
            description="Cash Flow"
            amount={Math.abs(cashFlow.income - cashFlow.expense)}
            isExpense={cashFlow.income - cashFlow.expense < 0}
          />
        </div>
      </div>
    </>
  );
};

export default OverviewSection;
