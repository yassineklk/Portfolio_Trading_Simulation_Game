import React from 'react';
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from "react";
import DataContext from "../context/DataContext";
import ConfettiExplosion from 'react-confetti'
import Transactions from './Transactions';

const largeProps = {
    force: 0.8,
    duration: 3000,
    particleCount: 300,
    width: 1200,
    height: window.innerHeight,
    colors: ['#041E43', '#1471BF', '#5BB4DC', '#FC027B', '#66D805'],
};

const Results = () => {
    const { currentBalance } = useContext(DataContext);
    const { estimatedGain } = useContext(DataContext);
    const { userResults } = useContext(DataContext);
    const { algoResults } = useContext(DataContext);
    const { aiResults } = useContext(DataContext);

    const [isLargeExploding, setIsLargeExploding] = useState(true);
    const [winnerMessage, setWinnerMessage] = useState("");

    useEffect(() => {
        if (algoResults === null) return;

        setWinnerMessage(estimatedGain >= algoResults.outcome && estimatedGain >= aiResults.outcome ? "Congrats, you won !" : "You didn't win this time, try again !")
        setIsLargeExploding(estimatedGain >= algoResults.outcome && estimatedGain >= aiResults.outcome); // Activation des confettis si le joueur a gagné
    }, [algoResults])

    return (
        <div className="flex flex-col bg-gray-900 h-screen items-center text-white w-full">
            <h1 className="text-4xl font-bold my-8 text-center text-[#beb070] mx-auto flex flex-col">
                <span>Final Result</span>
                <span className="text-white">{winnerMessage}</span>
            </h1>
            <Link
                className="bg-[#beb070] hover:bg-[#c7ba77] text-white rounded-lg py-3 px-6 h-12 text-lg font-medium w- mb-8 flex items-center justify-center"
                to="/">
                <span className="text-white text-l">Play Again</span>
                <svg className='fill-white' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M440 934q-121-15-200.5-105.5T160 616q0-66 26-126.5T260 384l57 57q-38 34-57.5 79T240 616q0 88 56 155.5T440 854v80Zm80 0v-80q87-16 143.5-83T720 616q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520 934Z" /></svg>
            </Link>
            <div className="flex flex-1 w-full justify-center flex-grow ">
                <div className="flex-1 ">
                    <div className="flex-1 bg-gray-900 w-full">
                        <div className="container mx-auto p-8 border-b-2 border-gray-200">
                            <h2 className="text-2xl font-bold mb-4 text-[#beb070] underline italic">Your results</h2>
                            <p className="text-gray-400">Final Balance : {currentBalance?.toFixed(2)} €</p>
                            <hr className="my-4 border-gray-600" />
                            <p className="text-gray-400">Total Gain: {estimatedGain?.toFixed(2)} €</p>
                            <hr className="my-4 border-gray-600" />
                            <p className="text-gray-400 mb-8">Number of transactions : {userResults.length}</p>
                            <div className='flex flex-grow h-80' >
                                <Transactions type="User" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-gray-900 ml-auto">
                        <div className="container mx-auto px-8 py-12 border-b-2 border-gray-200">
                            <h2 className="text-2xl font-bold mb-4 text-[#beb070] underline italic">Algorithm results </h2>
                            <p className="text-gray-400">Final Balance : {parseFloat(algoResults?.balance)?.toFixed(2)}$</p>
                            <hr className="my-4 border-gray-600" />
                            <p className="text-gray-400">Total gain : {parseFloat(algoResults?.outcome)?.toFixed(2)}$</p>
                            <hr className="my-4 border-gray-600" />
                            <p className="text-gray-400 mb-8">Number of transactions : {parseFloat(algoResults?.number_transactions)} </p>
                            <div className='flex flex-grow h-80' >
                                <Transactions type="Algo" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-gray-900 ml-auto">
                        <div className="container mx-auto px-8 py-12">
                            <h2 className="text-2xl font-bold mb-4 text-[#beb070] underline italic"> AI results </h2>
                            <p className="text-gray-400">Final Balance : {parseFloat(aiResults?.balance)?.toFixed(2)}$</p>
                            <hr className="my-4 border-gray-600" />
                            <p className="text-gray-400">Total gain : {parseFloat(aiResults?.outcome)?.toFixed(2)}$</p>
                            <hr className="my-4 border-gray-600" />
                            <p className="text-gray-400 mb-8">Number of transactions : {parseFloat(aiResults?.number_transactions)} </p>
                            <div className='flex flex-grow h-80' >
                                <Transactions type="AI" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {isLargeExploding && <ConfettiExplosion {...largeProps} />}
        </div >
    )
};

export default Results;