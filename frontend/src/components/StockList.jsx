import { useContext } from "react";

import DataContext from "../context/DataContext";

export default function StockList() {
  const { currentIndex } = useContext(DataContext);
  const { stocksData } = useContext(DataContext);
  const { currentStock, setCurrentStock } = useContext(DataContext);
  const { stockBalance } = useContext(DataContext)

  if (!stocksData || Object.keys(stocksData).length === 0) {
    return <div className="border rounded-lg overflow-auto shadow-md text-center flex-grow">No data available</div>;
  }

  return (
    <div className="border rounded-lg overflow-auto shadow-md flex-grow">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
          <tr>
            <th scope="col" className="px-6 py-3">
              Stock
            </th>
            <th scope="col" className="px-6 py-3">
              Open
            </th>
            <th scope="col" className="px-6 py-3">
              High
            </th>
            <th scope="col" className="px-6 py-3">
              Low
            </th>
            <th scope="col" className="px-6 py-3">
              Close
            </th>
            <th scope="col" className="px-6 py-3">
              Volume
            </th>
            <th scope="col" className="px-6 py-3">
              Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stocksData).map(([stockName, stockData]) => {
            if (currentIndex >= stockData.length) {
              return null;
            }
            return (
              <tr className={`bg-white border-b cursor-pointer ${currentStock === stockName ? "text-blue-500 border-blue-500" : ""}`} key={stockName} onClick={() => (setCurrentStock(stockName))}>
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {stockName}
                </th>
                <td className="px-6 py-4">
                  {stockData[currentIndex]["open"]}
                </td>
                <td className="px-6 py-4">
                  {stockData[currentIndex]["high"]}
                </td>
                <td className="px-6 py-4">
                  {stockData[currentIndex]["low"]}
                </td>
                <td className="px-6 py-4">
                  {stockData[currentIndex]["close"]}
                </td>
                <td className="px-6 py-4">
                  {stockData[currentIndex]["volume"]}
                </td>
                <td className="px-6 py-4 font-bold">
                  {stockBalance[stockName]?.toFixed(2)}
                </td>
              </tr>
            )
          }
          )}
        </tbody>
      </table>
    </div>
  );
}