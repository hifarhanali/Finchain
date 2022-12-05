import { useState, useEffect } from "react";
import { useEth } from "../contexts/EthContext";

const useLedger = () => {
  const {
    state: { contract, accounts },
  } = useEth();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contract) {
      setLoading(true);
      return;
    }
    const getTransactions = async () => {
      try {
        const transactionsList = await contract.methods.getTransactions().call({
          from: accounts[0],
        });

        // Convert the transaction list to a more readable format
        const formattedTransactionsList = transactionsList.map(
          (transaction) => {
            return {
              ...transaction,
              amount: parseInt(transaction.amount),
              date: new Date(parseInt(transaction.date) * 1000),
            };
          }
        );

        // Sort the transactions by date
        formattedTransactionsList.sort((a, b) => {
          return b.date - a.date;
        });

        setTransactions(formattedTransactionsList);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    getTransactions();
  }, [accounts, contract]);
  return { transactions, loading };
};

export default useLedger;
