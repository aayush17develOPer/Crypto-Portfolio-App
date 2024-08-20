import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api';
import { Typography } from '@mui/material';
import HistoryChart from './HistoryChart';
const OneCoin = () => {
    const {id} = useParams();
    const [coin, setCoin] = useState();

    const getCoin = async () => {
      const data = await axios.get(SingleCoin(id));
      // console.log(data)
      setCoin(data);
      // console.log(coin.data.id)
    };

    useEffect(() => {
      getCoin();
    },[]);

    // Function to convert HTML to plain text
  const htmlToText = (html) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

  // descriptionText = coin?.data.description.en ? htmlToText(coin.data.description.en).split(". ")[0] : '';

  return (
    <div style={{display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <div style={{width: "30%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey"}}>
        <img
          src={coin?.data.image.large}
          alt={coin?.data.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant='h3' style={{fontWeight:'bolder',textAlign:'center'}}>{coin?.data.name}</Typography>
        <Typography variant='subtitle1' style={{width:'80%' ,textAlign:'center'}}>{htmlToText(coin?.data.description.en).split(". ")[0]}</Typography>
        <div style={{alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",}}>
       <span style={{ display: "flex", alignItems:"center"}}>
            <Typography variant="h5" style={{marginLeft:'44%', fontWeight:'bolder'}}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
                textAlign:'center'
              }}
            >
              {(coin?.data.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{marginLeft:'37%', fontWeight:'bolder', textAlign:'center'}}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {}{"₹ "}
              {(
                coin?.data.market_data.current_price.inr
              )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{marginLeft:'37%', fontWeight:'bolder'}}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {}{"₹ "}
              {(
                coin?.data.market_data.market_cap.inr
                  .toString()
                  .slice(0, -9)
              )}
              B
            </Typography>
          </span>
        </div>
      </div>
      <HistoryChart coin={coin} />
    </div>
  )
}

export default OneCoin
