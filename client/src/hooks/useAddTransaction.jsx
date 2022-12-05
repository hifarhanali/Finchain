import { useState } from "react";
import { useEth } from "../contexts/EthContext";

const useAddTransaction = () => {
  const {
    state: { contract, accounts },
  } = useEth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTransaction = async (transaction) => {
    console.log("useAddTransaction: transaction", transaction);
    var addTransactionResult = null;
    try {
      setLoading(true);
      addTransactionResult = await contract.methods
        .addTransaction(
          transaction.title,
          transaction.description,
          transaction.amount,
          transaction.date,
          transaction.isExpense
        )
        .send({ from: accounts[0] });
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setLoading(false);
    return addTransactionResult;
  };

  return { addTransaction, loading, error };
};

export default useAddTransaction;
