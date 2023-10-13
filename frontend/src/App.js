import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Navbar from "./components/Navbar";
import Transactions from "./components/Transactions";
import StockList from "./components/StockList";
import CandlestickChart from "./components/CandlestickChart";
import BuySell from "./components/BuySell";
import Home from "./components/Home";
import About from "./components/About";
import { DataProvider } from "./context/DataContext";
import Results from "./components/Results";

function App() {
  const [showStocks, setShowStocks] = useState(true);

  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/dashboard"
            element={
              <div className="flex flex-col h-screen">
                <Navbar />
                <div className="flex flex-row justify-between p-6 h-2/5">
                  {showStocks && <StockList />}
                  {!showStocks && <Transactions type="User" />}
                  <div className="flex flex-col items-center justify-center border rounded-xl p-6 shadow-md ml-4 w-1/4">
                    <button onClick={() => { setShowStocks(true) }} className={`rounded ${showStocks ? "text-[#2b3139] bg-[#FCD535] hover:bg-[#FCD949]" : "text-white bg-[#2b3139] hover:bg-[#1e2329]"} w-full h-8 font-primary font-bold text-center mb-2`}>
                      Show stocks
                    </button>
                    <button
                      onClick={() => {
                        setShowStocks(false);
                      }}
                      className={`rounded ${showStocks
                        ? "text-white bg-[#2b3139] hover:bg-[#1e2329]"
                        : "text-[#2b3139] bg-[#FCD535] hover:bg-[#FCD949]"
                        } w-full h-8 font-primary font-bold text-center mt-2`}
                    >
                      Show transactions
                    </button>
                  </div>
                </div>
                <div className="flex flex-row justify-between px-6 mb-4 h-3/4">
                  <CandlestickChart />
                  <BuySell />
                </div>
              </div>
            }
          />
          <Route path="/results" element={<Results />} />
        </Routes >
      </DataProvider >
    </Router >
  );
}

export default App;
