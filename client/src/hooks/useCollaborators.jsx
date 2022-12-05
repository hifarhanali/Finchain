import { useState, useEffect } from "react";
import { useEth } from "../contexts/EthContext";

const useCollaborators = () => {
  const {
    state: { contract, accounts },
  } = useEth();

  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contract) {
      setLoading(true);
      return;
    }
    const getCollaborators = async () => {
      try {
        const collaboratorsList = await contract.methods
          .getCollaborators()
          .call({ from: accounts[0] });

        const formattedCollaboratorsList = collaboratorsList.map(
          (collaborator) => {
            return {
              address: collaborator,
            };
          }
        );

        setCollaborators(formattedCollaboratorsList);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    getCollaborators();
  }, [accounts, contract]);

  return { collaborators, loading };
};

export default useCollaborators;
