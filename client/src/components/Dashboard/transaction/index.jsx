import { useState, useReducer, useEffect } from "react";

import Ledger from "./Ledger/Ledger";
import AddTransactionModal from "./AddTransactionModal/AddTransactionModal";

import InvoicePdfLink from "./Invoice";

import { useLedger, useAddTransaction } from "../../../hooks";

import { PlusIcon } from "../../icons";
import { IconButton } from "../../common";

import { useEth } from "../../../contexts/EthContext";

const newTransactionInitialState = {
  title: "",
  description: "",
  amount: "",
  date: "",
  isExpense: false,
};

const newTransactionReducer = (state, action) => {
  switch (action.type) {
    case "title":
      return { ...state, title: action.payload };
    case "description":
      return { ...state, description: action.payload };
    case "amount":
      return { ...state, amount: parseInt(action.payload) };
    case "date":
      return { ...state, date: action.payload };
    case "isExpense":
      return { ...state, isExpense: action.payload };
    case "reset":
      return newTransactionInitialState;
    default:
      return state;
  }
};

const TransactionSection = ({ cashFlow, dispatchCashFlow }) => {
  const { state } = useEth();

  const { transactions, loading: transactionsLoading } = useLedger();

  const [newTransaction, dispatchNewTransaction] = useReducer(
    newTransactionReducer,
    newTransactionInitialState
  );

  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);

  const closeAddTransactionModal = () => {
    setShowAddTransactionModal(false);
    dispatchNewTransaction({ type: "reset" });
  };

  const openAddTransactionModal = () => {
    setShowAddTransactionModal(true);
  };

  const {
    addTransaction,
    loading: addTransactionLoading,
    error: addTransactionError,
  } = useAddTransaction();

  useEffect(() => {
    if (addTransactionError) {
      console.error(addTransactionError);
    }
  }, [addTransactionError]);

  const onSaveNewTransactionHandler = async () => {
    console.log("Saving new transaction...");
    console.log(newTransaction);

    try {
      const addTransactionResult = await addTransaction({
        ...newTransaction,
        date: parseInt(Date.now() / 1000),
      });

      const { id, title, description, amount, date, isExpense } =
        addTransactionResult.events.TransactionAdded.returnValues;

      // add transaction to the frontend ledger
      transactions.unshift({
        id,
        title,
        description,
        amount,
        date: new Date(parseInt(date) * 1000),
        isExpense,
      });

      // update cash flow TODO
      if (isExpense) {
        dispatchCashFlow({
          type: "expense",
          payload: parseInt(cashFlow.expense) + parseInt(amount),
        });
      } else {
        dispatchCashFlow({
          type: "income",
          payload: parseInt(cashFlow.income) + parseInt(amount),
        });
      }

      console.log("addTransactionResult", addTransactionResult);
    } catch (error) {
      console.error(error);
    }

    closeAddTransactionModal();
  };

  // update cash flow
  useEffect(() => {
    const calculateCashFlow = () => {
      let income = 0;
      let expense = 0;

      console.log("calculating cash flow...");

      transactions.forEach((transaction) => {
        if (transaction.isExpense) {
          expense += transaction.amount;
        } else {
          income += transaction.amount;
        }
      });

      dispatchCashFlow({ type: "income", payload: income });
      dispatchCashFlow({ type: "expense", payload: expense });
    };
    calculateCashFlow();
  }, [transactions, dispatchCashFlow]);

  return (
    <>
      <div className="transactions">
        <AddTransactionModal
          newTransaction={newTransaction}
          dispatchNewTransaction={dispatchNewTransaction}
          showModal={showAddTransactionModal}
          onClose={closeAddTransactionModal}
          onSave={onSaveNewTransactionHandler}
        />
        <div className="bg-white p-8 rounded-md w-full">
          <div className=" flex items-center justify-between pb-6">
            <div>
              <h2 className="text-gray-600 font-semibold">
                Transactions History
              </h2>
              <span className="text-xs">
                {transactions.length} transactions in total
              </span>
            </div>
            <IconButton
              text="Add Transaction"
              title="Add New Transaction To Ledger"
              onClick={openAddTransactionModal}
              icon={<PlusIcon color="white" strokeWidth={3} />}
            />
          </div>

          {transactionsLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <Ledger transactions={transactions} />
              {state.accounts && state.accounts.length > 0 && (
                <InvoicePdfLink
                  transactions={transactions}
                  userInfo={{
                    address: state.accounts[0],
                  }}
                  income={cashFlow.income}
                  expense={cashFlow.expense}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TransactionSection;
