import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CircularProgress, Typography } from "@material-ui/core";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HistoryChart = ({ coin }) => {
  const [historicData, setHistoricData] = useState(null);
  const [days, setDays] = useState(1);
  const [error, setError] = useState(null);
  const currency = 'inr';

  const fetchHistoricData = async (retries = 3, delay = 1000) => {
    const url = `https://api.coingecko.com/api/v3/coins/${coin?.data.id}/market_chart?vs_currency=${currency}&days=${days}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 429 && retries > 0) {
          // Retry on 429 Too Many Requests
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchHistoricData(retries - 1, delay * 2);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setHistoricData(data.prices); // Set only the prices array
      setError(null); // Reset error state
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please try again later.');
    }
  };

  useEffect(() => {
    if (coin?.data.id) {
      fetchHistoricData();
    }
  }, [days, coin]);

  return (
    <div style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
    }}>
      {error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : !historicData ? (
        <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
      ) : (
        <Line
          data={{
            labels: historicData.map((coin) => {
              let date = new Date(coin[0]);
              let time = date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: historicData.map((coin) => coin[1]),
                label: `Price (Past ${days} Days) in ${currency}`,
                borderColor: "#EEBC1D",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default HistoryChart;
