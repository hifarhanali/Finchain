import React from "react";

function DashboardCard({
  title = "Income",
  description = "Cash In",
  amount = 10000,
  isExpense = false,
}) {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="px-5 py-5 bg-amber-400">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">{title}</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">
          {description}
        </div>
        <div
          className={`flex items-start ${
            isExpense ? "text-red-600" : "text-green-600"
          }`}
        >
          <div className="text-3xl font-bold text-slate-800 mr-2">
            {isExpense ? "-" : "+"} Rs. {amount}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
