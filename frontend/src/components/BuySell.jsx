import { React, useState, useContext, useEffect } from "react";
import DataContext from "../context/DataContext";

const BuySell = () => {
    const [buy, setBuy] = useState(true);
    const [price, setPrice] = useState(0);
    const [closePrice, setClosePrice] = useState(1);
    const [amount, setAmount] = useState(0);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [newStockAmount, setNewStockAmount] = useState(0);
    const [lastUpdatedField, setLastUpdatedField] = useState('');
    const [isBuyButtonDisabled, setIsBuyButtonDisabled] = useState(false);

    const { currentIndex } = useContext(DataContext);
    const { stocksData } = useContext(DataContext);
    const { currentStock } = useContext(DataContext);
    const { setUserResults } = useContext(DataContext);
    const { stockBalance, setStockBalance } = useContext(DataContext);
    const { currentBalance, setCurrentBalance } = useContext(DataContext);
    const { setEstimatedGain } = useContext(DataContext);

    const handleAmountChange = (event) => {
        const newAmount = event.target.value;
        setAmount(newAmount);
        setLastUpdatedField('amount');
    };

    const handlePriceChange = (event) => {
        const newPrice = event.target.value;
        setPrice(newPrice);
        setLastUpdatedField('price');
    };

    const handleBuy = () => {
        setIsBuyButtonDisabled(true);

        setTimeout(() => {
            setIsBuyButtonDisabled(false);
        }, 2000);
    };

    useEffect(() => {
        setPrice(0);
        setAmount(0);
    }, [buy, currentStock]);

    useEffect(() => {
        if ((buy && !(price > 0 && price <= currentBalance))
            || (!buy && !(price > 0 && currentAmount >= amount))) {
            setIsBuyButtonDisabled(true);
        } else {
            setIsBuyButtonDisabled(false);
        }
    }, [price]);

    useEffect(() => {
        if (!stocksData) return;

        const stockData = stocksData[currentStock];
        if (!stockData || currentIndex >= stockData.length) {
            return;
        }
        setClosePrice(stockData[currentIndex].close);
    }, [currentIndex, currentStock]);

    useEffect(() => {
        if (lastUpdatedField === 'amount') {
            setPrice(amount * closePrice);
        } else if (lastUpdatedField === 'price') {
            setAmount(price / closePrice);
        }
    }, [closePrice, price, amount]);

    useEffect(() => {
        if (!stockBalance) return;

        setCurrentAmount(() => stockBalance[currentStock]);
    }, [stockBalance, currentStock]);

    useEffect(() => {
        if (!stockBalance) return;

        setNewStockAmount(() => buy ? parseFloat(stockBalance[currentStock]) + parseFloat(amount) : parseFloat(stockBalance[currentStock]) - parseFloat(amount));
    }, [amount, price]);

    useEffect(() => {
        if (!stocksData) return;

        let newEstimatedGain = currentBalance - 10000;
        const stockData = stocksData[currentStock];
        if (!stockData || currentIndex >= stockData.length) {
            return;
        }
        for (let stock in stockBalance) {
            newEstimatedGain += stockBalance[stock] * stockData[currentIndex].close;
        }
        setEstimatedGain(newEstimatedGain);
    }, [currentIndex, stockBalance]);

    return (
        <div className="flex flex-col px-6 py-3 items-center justify-center border rounded-xl shadow-sm">
            <div className="flex w-full">
                <button onClick={() => { setBuy(true) }} className={`rounded ${buy ? "text-[#2b3139] bg-[#FCD535] hover:bg-[#FCD949]" : "text-white bg-[#2b3139] hover:bg-[#1e2329]"} w-full mr-2 h-8 font-primary font-bold text-center`}>
                    Open
                </button>
                <button onClick={() => { setBuy(false) }} className={`rounded ${buy ? "text-white bg-[#2b3139] hover:bg-[#1e2329]" : "text-[#2b3139] bg-[#FCD535] hover:bg-[#FCD949]"} w-full ml-2 h-8 font-primary font-bold text-center`}>
                    Close
                </button>
            </div>
            <div className="my-auto w-full">
                <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">Price</span>
                    </div>
                    <input
                        type="number"
                        name="price"
                        value={price}
                        onChange={handlePriceChange}
                        className="block w-full rounded-md border-0 py-1.5 pl-20 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#2b3139] sm:text-sm sm:leading-6"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center text-gray-500 sm:text-sm pr-2 bg-transparent">EUR</span>
                </div>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">Amount</span>
                    </div>
                    <input
                        type="number"
                        name="amount"
                        className="block w-full rounded-md border-0 py-1.5 pl-20 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#2b3139] sm:text-sm sm:leading-6"
                        value={amount}
                        onChange={handleAmountChange}
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center text-gray-500 sm:text-sm pr-2 bg-transparent">{currentStock}</span>
                </div>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">Current Amount</span>
                    </div>
                    <input
                        type="number"
                        name="current-amount"
                        className="block w-full rounded-md border-0 py-1.5 pl-32 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#2b3139] sm:text-sm sm:leading-6"
                        value={parseFloat(currentAmount)?.toFixed(2)}
                        disabled
                    />
                </div>
                <div className="relative my-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">New Amount</span>
                    </div>
                    <input
                        type="number"
                        name="new-amount"
                        className="block w-full rounded-md border-0 py-1.5 pl-32 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#2b3139] sm:text-sm sm:leading-6"
                        value={newStockAmount ? parseFloat(newStockAmount)?.toFixed(2) : 0}
                        disabled
                    />
                </div>
            </div>
            {buy &&
                <button
                    onClick={() => {
                        const dateString = `${stocksData[currentStock][currentIndex].time.year}-${String(stocksData[currentStock][currentIndex].time.month).padStart(2, '0')}-${String(stocksData[currentStock][currentIndex].time.day).padStart(2, '0')}`
                        setUserResults(prevTransactions => [{ stockName: currentStock, amount: parseFloat(amount), price: parseFloat(price), type: "Buy", time: dateString }, ...prevTransactions])
                        setStockBalance(prevStockBalance => ({ ...prevStockBalance, [currentStock]: parseFloat(newStockAmount) }))
                        setCurrentBalance(prevCurrentBalance => (parseFloat(prevCurrentBalance) - parseFloat(price)))
                        handleBuy()
                    }}
                    className={`rounded bg-[#33d587] w-full h-12 font-primary font-bold text-white text-center hover:bg-white hover:text-[#33d587] border border-[#33d587] py-[11px] transition-all ${isBuyButtonDisabled ? "cursor-not-allowed" : ""}`}
                    disabled={isBuyButtonDisabled}>
                    Buy
                </button>}
            {!buy &&
                <button
                    onClick={() => {
                        const dateString = `${stocksData[currentStock][currentIndex].time.year}-${String(stocksData[currentStock][currentIndex].time.month).padStart(2, '0')}-${String(stocksData[currentStock][currentIndex].time.day).padStart(2, '0')}`
                        setUserResults(prevTransactions => [{ stockName: currentStock, amount: parseFloat(amount), price: parseFloat(price), type: "Sell", time: dateString }, ...prevTransactions])
                        setStockBalance(prevStockBalance => ({ ...prevStockBalance, [currentStock]: parseFloat(newStockAmount) }))
                        setCurrentBalance(prevCurrentBalance => (parseFloat(prevCurrentBalance) + parseFloat(price)))
                        handleBuy()
                    }}
                    className={`rounded bg-[#f23645] w-full h-12 font-primary font-bold text-white text-center hover:bg-white hover:text-[#f23645] border border-[#f23645] py-[11px] transition-all ${isBuyButtonDisabled ? "cursor-not-allowed" : ""}`}
                    disabled={isBuyButtonDisabled}>
                    Sell
                </button>}
        </div>
    );
}

export default BuySell;