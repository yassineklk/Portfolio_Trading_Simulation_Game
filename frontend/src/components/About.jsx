import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-gray-900 h-screen text-white">
            <div className="container">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold mb-8 text-[#beb070]">About the game</h1>
                    <p className="text-lg text-center mb-8 text-white font-sans mx-12">StockAI is a virtual stock market simulation game where you can learn and test your trading skills. You are given virtual cash to trade stocks in a realistic stock market environment. The game tracks your portfolio and allows you to compete against other players in real-time. Ready to take the challenge and show off your trading skills?</p>
                </div>
            </div>
            <Link
                className="bg-[#beb070] hover:bg-[#c7ba77] text-white rounded-lg py-3 px-6 text-lg font-medium w-40 mb-8 flex items-center justify-center"
                to="/dashboard">
                <span className="text-white text-2xl mr-2">Play</span>
                <svg className='mt-1 fill-white' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M677 879V273h126v606H677Zm-520 0V273l455 303-455 303Z" /></svg>
            </Link>
        </div>
    );
};

export default About;