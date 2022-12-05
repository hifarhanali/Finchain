import { LabelSwitch } from "../../../common";

const AddTransactionModal = ({
  newTransaction,
  dispatchNewTransaction,
  showModal = false,
  onClose,
  onSave,
}) => {
  const changeHandler = (e) => {
    dispatchNewTransaction({
      type: e.target.name,
      payload: e.target.value,
    });
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">New Transaction</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="bg-transparent text-black h-6 w-6 opacity-30 text-2xl block outline-none focus:outline-none hover:opacity-80 hover:text-amber-500">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div>
                    <input
                      type="text"
                      name="title"
                      className="mb-2 bg-gray-200 border border-gray-300 text-black-900 text-sm rounded-lg block w-full p-2.5 outline-none focus:outline-none focus:border-gray-400"
                      placeholder="Title"
                      onChange={changeHandler}
                      value={newTransaction.title}
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      type="text"
                      name="description"
                      className="mb-2 bg-gray-200 border border-gray-300 text-black-900 text-sm rounded-lg block w-full p-2.5 outline-none focus:outline-none focus:border-gray-400 resize-none"
                      placeholder="Description"
                      rows={3}
                      cols={10}
                      onChange={changeHandler}
                      value={newTransaction.description}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="amount"
                      className="mb-2 bg-gray-200 border border-gray-300 text-black-900 text-sm rounded-lg block w-full p-2.5 outline-none focus:outline-none focus:border-gray-400"
                      placeholder="Amount e.g 10000"
                      onChange={changeHandler}
                      value={newTransaction.amount}
                      required
                    />
                  </div>
                  <div className="flex justify-center">
                    <LabelSwitch
                      isChecked={newTransaction.isExpense}
                      label={"Cash Out"}
                      onChange={() =>
                        dispatchNewTransaction({
                          type: "isExpense",
                          payload: !newTransaction.isExpense,
                        })
                      }
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-amber-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-amber-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onSave}
                  >
                    Save Transaction
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default AddTransactionModal;
