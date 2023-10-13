import Navbar from "./components/Navbar";
import Wallet from "./components/Transactions";
import StockList from "./components/StockList";
import CandlestickChart from "./components/CandlestickChart";
import BuySell from "./components/BuySell";

import { useEffect } from "react";

export default function Dashboard({ shouldBlockNavigation, setShouldBlockNavigation }) {
    const handleUnload = (event) => {
        setShouldBlockNavigation(true);
    };

    useEffect(() => {
        window.addEventListener('unload', handleUnload);

        return () => window.removeEventListener('unload', handleUnload);
    }, []);

    const handleConfirmNavigationClick = () => {
        setShouldBlockNavigation(false);
        window.history.back();
    };

    return (
        <div>
            <div className="w-screen h-screen">
                <Navbar />
                <div className="grid grid-cols-4 grid-rows-2 gap-4 p-6">
                    <StockList />
                    <Wallet />
                    <CandlestickChart />
                    <BuySell />
                </div>
                {shouldBlockNavigation && (
                    <div className="fixed top-0 left-0 w-screen h-screen bg-white bg-opacity-80 flex items-center justify-center">
                        <div className="bg-white p-4 rounded shadow-lg">
                            <p>Are you sure you want to leave?</p>
                            <div className="flex justify-end mt-4">
                                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4" onClick={handleConfirmNavigationClick}>
                                    Leave
                                </button>
                                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => setShouldBlockNavigation(false)}>
                                    Stay
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}