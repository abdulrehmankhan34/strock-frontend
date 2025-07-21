import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

function App() {
  const [ticker, setTicker] = useState('AAPL');
  const [stockData, setStockData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStockData(ticker);
  }, [ticker]);

  const fetchStockData = async (ticker) => {
    try {
      setError('');
      const res = await axios.get(`http://localhost:5000/api/stock/${ticker}`);
      setStockData(res.data);
    } catch (err) {
      setError('❌ Data load nahi hua');
      setStockData([]);
    }
  };

  const options = {
    title: {
      text: `${ticker} Stock Chart`
    },
    series: [
      {
        type: 'candlestick',
        name: ticker,
        data: stockData.map(item => [
          item.x,
          item.open,
          item.high,
          item.low,
          item.close
        ]),
        color: 'red',        // ↓ candle colors
        upColor: 'green'
      }
    ],
    rangeSelector: {
      selected: 1
    }
  };
  console.log('dev-rehman') // this change is dev-rehman
  console.log("test git changes"); // this was for testing
  return (
    <div style={{ maxWidth: '100vw', margin: 'auto' }}>
      <h2>📈 {ticker} Candlestick Chart</h2>

      <select style={{padding:'20px',border:"10px"}} value={ticker} onChange={(e) => setTicker(e.target.value)}>
        <option value="AAPL">AAPL</option>
        <option value="MATA">MATA</option>
        <option value="TSLA">TSLA</option>
        <option value="NVDA">TSLA</option>
        <option value="AMZN">TSLA</option>
      </select>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {stockData.length > 0 ? (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={options}
        />
      ) : (
        !error && <p>🔄 Loading data...</p>
      )}
    </div>
  );
}

export default App;
