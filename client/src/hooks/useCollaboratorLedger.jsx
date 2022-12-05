import { useEffect, useState } from "react";
import { useEth } from "../contexts/EthContext";

const useCollaboratorLedger = ({ collaboratorAddress }) => {
  const {
    state: { contract, accounts },
  } = useEth();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!contract) return;

    const getCollaboratorLedger = async (collaboratorAddress) => {
      setLoading(true);

      try {
        const transactions = await contract.methods
          .getCollaboratorTransactions(collaboratorAddress)
          .call({ from: accounts[0] });
        setTransactions(transactions);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    getCollaboratorLedger(collaboratorAddress);
  }, [contract, accounts, collaboratorAddress]);

  return { transactions, loading };
};

export default useCollaboratorLedger;
