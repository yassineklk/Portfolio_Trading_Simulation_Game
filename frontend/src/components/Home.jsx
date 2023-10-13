import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='bg-trading-bg bg-cover' >
            <div className="flex flex-col justify-center items-center h-screen text-white">
                <div className="text-center flex flex-col items-center">
                    <h1 className="text-4xl font-bold mb-8 text-white">
                        Welcome to <span className="text-[#beb070]">StockAI</span><br />
                        The game to develop your trading skills!
                    </h1>
                    <Link
                        className="bg-[#beb070] hover:bg-[#c7ba77] text-white rounded-lg py-3 px-6 text-lg font-medium w-40 mb-8 flex items-center justify-center"
                        to="/about">
                        <span className="text-white text-2xl mr-2">Play</span>
                        <svg className='mt-1 fill-white' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M286 917V235l537 341-537 341Z" /></svg>
                    </Link>
                </div>
            </div>

        </div >
    )
}

export default Home;