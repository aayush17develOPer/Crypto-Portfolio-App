import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import {
  CircularProgress
} from "@material-ui/core";
import { chartDays } from "../config/data";
import React from 'react'
import SelectButton from "./SelectButton";
import { Button } from "flowbite-react";

const HistoryChart = ({ coin }) => {
    const [historicData, setHistoricData] = useState(null);
    const [days, setDays] = useState(1);
    const [flag, setFlag] = useState(false);
    const currency = 'inr;'
  
    const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setHistoricData(data);
      setFlag(true);
    };
  
    useEffect(() => {
      fetchHistoricData();
    }, [days]);
  
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
        {!historicData || !flag ? (
          <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
        ) : (
          <>
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
                    label: `Price ( Past ${days} Days ) in ${currency}`,
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
          </>
        )}
      </div>
    );
  };
  
  export default HistoryChart;
  