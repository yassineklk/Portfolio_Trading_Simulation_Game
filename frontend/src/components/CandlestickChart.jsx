import React, { useEffect, useState, useRef, useContext } from 'react';
import { createChart } from 'lightweight-charts';

import DataContext from '../context/DataContext';

export default function CandlestickChart() {
  const chartContainerRef = useRef();
  const [candlestickSeries, setCandlestickSeries] = useState(null);
  const [volumeSeries, setVolumeSeries] = useState(null);

  const { currentIndex } = useContext(DataContext);
  const { stocksData } = useContext(DataContext);
  const { currentStock } = useContext(DataContext);
  const { userResults } = useContext(DataContext);

  const stockData = stocksData[currentStock];

  useEffect(() => {
    if (!stockData) return;

    const initialData = stockData.slice(0, currentIndex);

    const chart = createChart(chartContainerRef.current, { layout: { textColor: 'black', background: { type: 'solid', color: 'white' } }, });

    const volume = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '', // set as an overlay by setting a blank priceScaleId
      // set the positioning of the volume series
      scaleMargins: {
        top: 0.9, // highest point of the series will be 90% away from the top
        bottom: 0,
      },
    });
    volume.priceScale().applyOptions({
      scaleMargins: {
        top: 0.9, // highest point of the series will be 90% away from the top
        bottom: 0,
      },
    });
    volume.setData(initialData.map((d, index) => (index > 0 ? { time: d.time, value: d.volume, color: d.close > initialData[index - 1].close ? '#26a69a' : '#ef5350' } : ({ time: d.time, value: d.volume, color: '#26a69a' }))));
    setVolumeSeries(volume);

    const candles = chart.addCandlestickSeries({
      upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
      wickUpColor: '#26a69a', wickDownColor: '#ef5350',
    });
    candles.setData(initialData);
    setCandlestickSeries(candles);

    let minimumPrice = initialData[0].close;
    let maximumPrice = minimumPrice;
    for (let i = 1; i < initialData.length; i++) {
      maximumPrice = Math.max(maximumPrice, initialData[i].high);
      minimumPrice = Math.min(minimumPrice, initialData[i].low);
    }
    const avgPrice = (maximumPrice + minimumPrice) / 2;

    const lineWidth = 2;
    const minPriceLine = {
      price: minimumPrice,
      color: '#ef5350',
      lineWidth: lineWidth,
      lineStyle: 2, // LineStyle.Dashed
      axisLabelVisible: true,
      title: 'min price',
    };
    const avgPriceLine = {
      price: avgPrice,
      color: 'black',
      lineWidth: lineWidth,
      lineStyle: 1, // LineStyle.Dotted
      axisLabelVisible: true,
      title: 'ave price',
    };
    const maxPriceLine = {
      price: maximumPrice,
      color: '#26a69a',
      lineWidth: lineWidth,
      lineStyle: 2, // LineStyle.Dashed
      axisLabelVisible: true,
      title: 'max price',
    };

    candles.createPriceLine(minPriceLine);
    candles.createPriceLine(avgPriceLine);
    candles.createPriceLine(maxPriceLine);

    candles.setMarkers([]);

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    }

  }, [currentStock, stockData]);

  useEffect(() => {
    if (candlestickSeries === null || volumeSeries === null) return;
    if (!stockData || currentIndex >= stockData.length) {
      return;
    }
    candlestickSeries.update(stockData[currentIndex]);
    
//     let minPrice = Math.min(candlestickSeries._internal__series?._private__customPriceLines[0]._private__options.price, stockData[currentIndex].low);
//     let maxPrice = Math.max(candlestickSeries._internal__series?._private__customPriceLines[2]._private__options.price, stockData[currentIndex].high);
//     let avgPrice = (minPrice + maxPrice) / 2;
//     candlestickSeries._internal__series._private__customPriceLines[0]._private__options.price = minPrice;
//     candlestickSeries._internal__series._private__customPriceLines[1]._private__options.price = avgPrice;
//     candlestickSeries._internal__series._private__customPriceLines[2]._private__options.price = maxPrice;

    volumeSeries.update({ time: stockData[currentIndex].time, value: stockData[currentIndex].volume, color: stockData[currentIndex].close > stockData[currentIndex - 1].close ? '#26a69a' : '#ef5350' });
  }, [currentIndex]);

  useEffect(() => {
    let markers = [];
    for(let i = 0; i < userResults.length; i++) {
      const [year, month, day] = userResults[i].time.split('-');
      const dateObject = {
        year: parseInt(year, 10),
        month: parseInt(month, 10),
        day: parseInt(day, 10)
      };
      if(userResults[i].type === "Buy") {
        markers.push(
        {
          time: dateObject,
          position: 'belowBar',
          color: '#4caf50',
          shape: 'arrowUp',
          text: 'Buy',
        });
      } else {
        markers.push(
        {
          time: dateObject,
          position: 'aboveBar',
          color: '#e91e63',
          shape: 'arrowDown',
          text: 'Sell',
        });
      }
    }
    
    if(markers.length>0){ 
      candlestickSeries.setMarkers(markers.reverse());
    }
  }, [userResults]);

  return (
    <div ref={chartContainerRef} className="w-3/4"></div>
  );
}
