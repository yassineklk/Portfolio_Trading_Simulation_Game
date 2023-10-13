import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from fastapi.responses import JSONResponse
import nest_asyncio
from pyngrok import ngrok
import numpy as np
from typing import List
from datetime import date
import yfinance as yf
import pandas as pd
import statsmodels
from statsmodels.tsa.stattools import coint
import matplotlib.pyplot as plt


def find_cointegrated_pairs(data):
    n = data.shape[1]
    score_matrix = np.zeros((n, n))
    pvalue_matrix = np.ones((n, n))
    keys = data.keys()
    pairs = []
    for i in range(n):
        for j in range(i+1, n):
            S1 = data[keys[i]]
            S2 = data[keys[j]]
            result = coint(S1, S2)
            score = result[0]
            pvalue = result[1]
            score_matrix[i, j] = score
            pvalue_matrix[i, j] = pvalue
            if pvalue < 0.05:
                pairs.append((keys[i], keys[j]))
    return score_matrix, pvalue_matrix, pairs


def load_data(start, end):
    start_date = start
    end_date = end
    tickers = ['GOLD', 'DX-Y.NYB', 'AAPL', 'OIL', 'SI=F', 'PLG']
    data = pd.DataFrame(columns=tickers)

    for ticker in tickers:
        ticker_data = yf.download(ticker, start=start_date, end=end_date)
        data[ticker] = ticker_data['Adj Close']

    data = data.dropna()
    return data


def trade(S1, S2, window1, window2):
    # If window length is 0, algorithm doesn't make sense, so exit
    if (window1 == 0) or (window2 == 0):
        return 0
    # Compute rolling mean and rolling standard deviation
    ratios = S1/S2
    ma1 = ratios.rolling(window=window1, center=False).mean()
    ma2 = ratios.rolling(window=window2, center=False).mean()
    std = ratios.rolling(window=window2, center=False).std()
    zscore = (ma1 - ma2)/std
    # Simulate trading
    # Start with no money and no positions
    money = 0
    countS1 = 0
    countS2 = 0
    for i in range(len(ratios)):
        # Sell short if the z-score is > 1
        if zscore[i] > 1:
            money += S1[i] - S2[i] * ratios[i]
            countS1 -= 1
            countS2 += ratios[i]
        # Buy long if the z-score is < -1
        elif zscore[i] < -1:
            money -= S1[i] - S2[i] * ratios[i]
            countS1 += 1
            countS2 -= ratios[i]
        # Clear positions if the z-score between -.5 and .5
        elif abs(zscore[i]) < 0.5:
            money += countS1*S1[i] + S2[i] * countS2
            countS1 = 0
            countS2 = 0
#         print('Z-score: '+ str(zscore[i]), countS1, countS2, S1[i] , S2[i])
    return money


def optimized_trading(S1, S2):
    # Define the range of values to test for window1 and window2
    window1_values = [10, 20, 30, 40, 50]
    window2_values = [10, 20, 30, 40, 50]

    # Initialize variables to keep track of the best parameter values and performance
    best_window1 = None
    best_window2 = None
    best_return = float('-inf')

    # Loop over all combinations of window1 and window2 values
    for window1 in window1_values:
        for window2 in window2_values:
            # Call the trade function with the current parameter values
            current_return = trade(S1, S2, window1, window2)

            # Evaluate the performance of the algorithm for the current parameter values
            if current_return > best_return:
                best_return = current_return
                best_window1 = window1
                best_window2 = window2

    # Print the best parameter values and performance
    print(f"Best window1: {best_window1}")
    print(f"Best window2: {best_window2}")
    print(f"Best trading return: {best_return}")
    return best_return


class InputData(BaseModel):
    startDate: date
    endDate: date

    def to_numpy(self) -> np.ndarray:
        return np.array([self.startDate, self.endDate])


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/predict")
async def predict(data: InputData):
    input_data = data.json()
    input_dict = json.loads(input_data)

    data = load_data(input_dict['startDate'], input_dict['endDate'])
    scores, pvalues, pairs = find_cointegrated_pairs(data)
    min_pvalue_index = np.unravel_inde
        np.argmin(pvalues, axis=None), pvalues.shape)
    s1 = tickers[min_pvalue_index[0]]
    s2 = tickers[min_pvalue_index[1]]
    print(s1)
    print(s2)
    S1 = data[s1]
    S2 = data[s2]
    outcome = optimized_trading(S1, S2)

    return JSONResponse({"outcome": str(outcome)})

ngrok_tunnel = ngrok.connect(8000)
print('Public URL:', ngrok_tunnel.public_url)
nest_asyncio.apply()
uvicorn.run(app, port=8000)