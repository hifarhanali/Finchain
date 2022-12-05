import TimeAgo from "timeago-react";

function Transaction({ transaction }) {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="ml-3">
          <p className="text-gray-900 whitespace-no-wrap">
            {transaction.title}
          </p>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {transaction.description}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          <TimeAgo datetime={transaction.date.toString()} />
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white">
        <p className="whitespace-no-wrap">
          Rs.{" "}
          <span
            className={`font-bold ${
              transaction.isExpense ? "text-red-500" : "text-green-500"
            }`}
          >
            {transaction.amount}
          </span>
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden
            className={`absolute inset-0 ${
              transaction.isExpense ? "bg-red-200" : "bg-green-200"
            } opacity-50 rounded-full`}
          ></span>
          <span className="relative">
            {transaction.isExpense ? "Cash Out" : "Cash In"}
          </span>
        </span>
      </td>
    </tr>
  );
}

export default Transaction;
