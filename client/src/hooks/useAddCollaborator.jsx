import { useState } from "react";
import { useEth } from "../contexts/EthContext";

const useAddCollaborator = () => {
  const {
    state: { contract, accounts },
  } = useEth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addCollaborator = async (collaborator) => {
    console.log("useAddCollaborator: collaborator", collaborator);
    var addCollaboratorResult = null;

    try {
      setLoading(true);
      addCollaboratorResult = await contract.methods
        .addCollaborator(collaborator.address)
        .send({ from: accounts[0] });
    } catch (error) {
      console.error(error);
      setError(error);
    }

    setLoading(false);
    return addCollaboratorResult;
  };

  return { addCollaborator, loading, error };
};

export default useAddCollaborator;
