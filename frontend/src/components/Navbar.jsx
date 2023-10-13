import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";

export default function Navbar() {

    const [timer, setTimer] = useState(120);
    const navigate = useNavigate();
    const { currentBalance } = useContext(DataContext);
    const { estimatedGain } = useContext(DataContext);

    useEffect(() => {
        let countDown = 120;
        const interval = setInterval(() => {
            if (countDown <= 0) {
                clearInterval(interval);
                navigate("/results");
                return;
            }
            countDown -= 1
            setTimer(countDown);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <nav className="bg-gray-800 h-16 flex items-center justify-center">
            <h2 className="font-semibold text-white font-timer text-xl inline-block ml-4">Balance: {currentBalance?.toFixed(2)} €</h2>
            <div className="mx-auto px-8 text-white font-timer text-2xl">
                {`${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${timer % 60}`}
            </div>
            <h2 className="font-semibold text-white font-timer text-xl inline-block mr-4">Estimated Gain: {estimatedGain?.toFixed(2)} €</h2>
        </nav>
    );
}
