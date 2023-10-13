import { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";

export default function Transactions(props) {

  const { userResults } = useContext(DataContext);
  const { algoResults } = useContext(DataContext);
  const { aiResults } = useContext(DataContext);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if(userResults === undefined || algoResults === undefined || aiResults === undefined) return;
    
    if (props.type === "User") {
      setTransactions(userResults)
    } else if (props.type === "Algo") {
      setTransactions(algoResults?.history)
    } else if (props.type === "AI") {
      setTransactions(aiResults?.history)
    }
  }, [userResults, algoResults, aiResults])

  return (
    <div className="border rounded-lg flex-grow overflow-auto shadow-md" >
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
          <tr>
            <th scope="col" className="px-6 py-3">
              Stock
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Price (€)
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction, index) => (
            <tr className="bg-white border-b" key={index}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {transaction.stockName}
              </th>
              <td className="px-6 py-4">
                {parseFloat(transaction.amount)?.toFixed(2)}
              </td>
              <td className="px-6 py-4">
                {(transaction.type === "Sell" ? `+${transaction.price}` : `-${transaction.price}`)}
              </td>
              <td className={`px-6 py-4 font-medium ${transaction.type === "Sell" ? "text-[#33d587]" : "text-[#f23645]"}`}>
                {transaction.type}
              </td>
              <td className={"px-6 py-4 font-medium"}>
                {transaction.time}
              </td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  );
}