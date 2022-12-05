import { useEffect } from "react";
import { useCollaboratorLedger } from "../../../../hooks";
import Ledger from "../../transaction/Ledger/Ledger";

const Collaborator = ({ collaborator }) => {
  const { transactions, loading } = useCollaboratorLedger({
    collaboratorAddress: collaborator.address,
  });

  return (
    <div className="collaborator">
      <div className="collaborator-address font-bold">
        Address: <span className="text-gray-500">{collaborator.address}</span>
      </div>
      <div className="collaborator-transactions">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Ledger transactions={transactions} />
          </>
        )}
      </div>
    </div>
  );
};

export default Collaborator;
