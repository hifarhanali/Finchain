import Collaborator from "./Collaborator";

const Collaborators = ({ collaborators }) => {
  return (
    <>
      {collaborators.map((collaborator) => (
        <Collaborator key={collaborator.address} collaborator={collaborator} />
      ))}
    </>
  );
};

export default Collaborators;
