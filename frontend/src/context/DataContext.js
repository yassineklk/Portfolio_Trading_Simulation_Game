import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(600);
  const [stocksData, setStocksData] = useState({});
  const [currentStock, setCurrentStock] = useState("GOLD");
  const [userResults, setUserResults] = useState([]);
  const [stockBalance, setStockBalance] = useState({});
  const [currentBalance, setCurrentBalance] = useState(10000);
  const [estimatedGain, setEstimatedGain] = useState(0);
  const [algoResults, setAlgoResults] = useState(null);
  const [aiResults, setAIResults] = useState(null);

  useEffect(() => {
    // window.onbeforeunload = (e) => {
    //   return "La page est en train d'être rafraîchie !";
    // };

    const interval = setInterval(() => {
      if (currentIndex >= 1300) {
        clearInterval(interval);
        return;
      }
      setCurrentIndex((prevCurrentIndex) => prevCurrentIndex + 1);
    }, 2000);

    return () => {
      // window.onbeforeunload = null;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let data = {};
    const stocks = ["GOLD", "OIL", "SI=F", "PLG", "AAPl"];

    stocks.forEach((stock) =>
      setStockBalance((prevStockBalance) => ({
        ...prevStockBalance,
        [stock]: 0,
      }))
    );

    async function fetchData(stock) {
      const response = await fetch(`https://trading-game-proxy.vercel.app/api/${stock}`);
      const json = await response.json();

      const stockData = [];
      const indicators = json.chart.result[0].indicators.quote[0];
      const timestamps = json.chart.result[0].timestamp;
      for (let i = 0; i < timestamps.length; i++) {
        stockData.push({
          time: new Date(timestamps[i] * 1000).toISOString().slice(0, 10),
          open: parseFloat(
            indicators.open[i]
              ? indicators.open[i].toFixed(2)
              : stockData[i - 1].open
          ),
          high: parseFloat(
            indicators.close[i]
              ? indicators.close[i].toFixed(2)
              : stockData[i - 1].close
          ),
          low: parseFloat(
            indicators.low[i]
              ? indicators.low[i].toFixed(2)
              : stockData[i - 1].low
          ),
          close: parseFloat(
            indicators.close[i]
              ? indicators.close[i].toFixed(2)
              : stockData[i - 1].close
          ),
          volume: parseFloat(indicators.volume[i]),
        });
      }

      data[stock] = stockData;
    }

    async function fetchAllData() {
      for (let stock of stocks) {
        await fetchData(stock);
      }
      setStocksData(data);
    }

    fetchAllData();

//     async function getAlgoResults() {
//       const response = await fetch(`https://trading-game-proxy.vercel.app/algo-results`);
//       const results = await response.json();

//       results.history = JSON.parse(results.history);
//       setAlgoResults(results);
//     }

//     getAlgoResults();

//     async function getAIResults() {
//       const response = await fetch(`https://trading-game-proxy.vercel.app/ai-results`);
//       const results = await response.json();

//       setAIResults(results);
//     }

//     getAIResults();

  }, []);

  return (
    <DataContext.Provider
      value={{
        currentIndex,
        stocksData,
        currentStock,
        setCurrentStock,
        userResults,
        setUserResults,
        algoResults,
        aiResults,
        stockBalance,
        setStockBalance,
        currentBalance,
        setCurrentBalance,
        estimatedGain,
        setEstimatedGain,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
