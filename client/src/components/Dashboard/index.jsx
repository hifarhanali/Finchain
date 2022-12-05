import { useState, useReducer, useEffect } from "react";
import { useEth } from "../../contexts/EthContext";

import NoticeWrongNetwork from "./Notices/NoticeWrongNetwork";
import OverviewSection from "./overview";
import CollaboratorSection from "./collaborator";
import TransactionSection from "./transaction";

const cashFlowInitialState = {
  income: 0,
  expense: 0,
};

const cashFlowReducer = (state, action) => {
  switch (action.type) {
    case "income":
      return { ...state, income: action.payload };
    case "expense":
      return { ...state, expense: action.payload };
    case "reset":
      return cashFlowInitialState;
    default:
      return state;
  }
};

function Dashboard() {
  const { state } = useEth();
  const [cashFlow, dispatchCashFlow] = useReducer(
    cashFlowReducer,
    cashFlowInitialState
  );

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    var component = (
      <>
        <div className="dashboard-container">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <OverviewSection cashFlow={cashFlow} />
          <TransactionSection
            cashFlow={cashFlow}
            dispatchCashFlow={dispatchCashFlow}
          />
          <CollaboratorSection />
        </div>
      </>
    );

    if (!state || !state.artifact || !state.contract) {
      component = <NoticeWrongNetwork />;
    }

    setDashboard(component);

    return () => {
      setDashboard(null);
    };
  }, [state, cashFlow]);

  return <>{dashboard}</>;
}

export default Dashboard;
