import Transaction from "./Transaction";
import NoticeNoTransaction from "../../Notices/NoticeNoTransaction";

const Ledger = ({ transactions }) => {
  const ledger = (
    <>
      <div className="ledger">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Created at
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Flow
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <Transaction key={transaction.id} transaction={transaction} />
                ))}
              </tbody>
            </table>
            {transactions.length === 0 && <NoticeNoTransaction />}
          </div>
        </div>
      </div>
    </>
  );

  return <>{ledger}</>;
};

export default Ledger;
