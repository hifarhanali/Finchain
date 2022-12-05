import { useState, useReducer, useEffect } from "react";
import { useCollaborators, useAddCollaborator } from "../../../hooks";

import Collaborators from "./Collaborators/Collaborators";
import AddCollaboratorModal from "./AddCollaboratorModal/AddCollaboratorModal";

import { PlusIcon } from "../../icons";
import { IconButton } from "../../common";

const newCollaboratorInitialState = {
  address: "",
};

const newCollaboratorReducer = (state, action) => {
  switch (action.type) {
    case "address":
      return { ...state, address: action.payload };
    case "reset":
      return newCollaboratorInitialState;
    default:
      return state;
  }
};

const CollaboratorSection = () => {
  const [newCollaborator, dispatchNewCollaborator] = useReducer(
    newCollaboratorReducer,
    newCollaboratorInitialState
  );
  const [showAddCollaboratorModal, setShowAddCollaboratorModal] =
    useState(false);

  const { collaborators, loading: collaboratorsLoading } = useCollaborators();

  const closeAddCollaboratorModal = () => {
    setShowAddCollaboratorModal(false);
    dispatchNewCollaborator({ type: "reset" });
  };

  const openAddCollaboratorModal = () => {
    setShowAddCollaboratorModal(true);
  };

  const {
    addCollaborator,
    loading: addCollaboratorLoading,
    error: addCollaboratorError,
  } = useAddCollaborator();

  useEffect(() => {
    if (addCollaboratorError) {
      console.error(addCollaboratorError);
    }
  }, [addCollaboratorError]);

  const onSaveNewCollaboratorHandler = async () => {
    console.log("Saving new collaborator...");

    try {
      const addCollaboratorResult = await addCollaborator(newCollaborator);
      const { _collaborator } =
        addCollaboratorResult.events.CollaboratorAdded.returnValues;
    } catch (error) {
      console.error(error);
    }

    closeAddCollaboratorModal();
  };

  return (
    <>
      <div className="collaborators">
        <AddCollaboratorModal
          newCollaborator={newCollaborator}
          dispatchNewCollaborator={dispatchNewCollaborator}
          showModal={showAddCollaboratorModal}
          onClose={closeAddCollaboratorModal}
          onSave={onSaveNewCollaboratorHandler}
        />
        <div className="bg-white p-8 rounded-md w-full">
          <div className=" flex items-center justify-between pb-6">
            <div>
              <h2 className="text-gray-600 font-semibold">Collaborators</h2>
              <span className="text-xs">
                {collaborators.length} collaborators in total
              </span>
            </div>
            <IconButton
              text="Add Collaborator"
              title="Add New Collaborator"
              onClick={openAddCollaboratorModal}
              icon={<PlusIcon color="white" strokeWidth={3} />}
            />
          </div>

          {collaboratorsLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <Collaborators collaborators={collaborators} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CollaboratorSection;
