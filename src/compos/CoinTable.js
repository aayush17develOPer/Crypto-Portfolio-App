import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
// import { useStyles } from '@mui/styles';

import { Typography, TextField, Table, TableHead, TableBody, LinearProgress, TableRow, TableContainer, TableCell, makeStyles } from '@mui/material'
import { blue, yellow } from '@mui/material/colors';

const CoinTable = () => {
    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState(false);
    const [search, setSearch] = useState(0);
    const {currency} = CryptoState();
    const navigate = useNavigate();

    const getCoins = async() => {
        setLoading(true);
        const {data} = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    };
    console.log(coins);

    useEffect(() => {
        getCoins();
    },[currency]);


    const handleSearch = () => {
        // Make sure `search` is a string and use an empty string as a fallback
        const searchQuery = search ? search.toLowerCase() : '';
    
        return coins.filter((coin) => {
            return (
                coin.name.toLowerCase().includes(searchQuery) ||
                coin.symbol.toLowerCase().includes(searchQuery)
            );
        });
    };
    

  return (
    <div className='text-center mt-10'>
        <Typography variant='h3'>Latest Crypto Prices</Typography>
        <TextField 
        className='w-2/3' label='Search for crypto...'
        style={{margin:30}}
        onChange={(e) => setSearch(e.target.value)}
        >
        </TextField>

        <TableContainer>
            {loading ? (
                <LinearProgress style={{backgroundColor:"gold"}}/>
            ) : (
            <Table style={{width:"75%",marginLeft:"13%",marginRight:"20%"}}>
                <TableHead style={{backgroundColor:'lightgrey', color:"white"}}>
                    <TableRow>
                        {["Coin","Price","Change in 24hours","Market cap"].map((head) => (
                            <TableCell
                            style={{fontWeight:"700"}}
                            key = {head}
                            align={head === "Coin" ? "" : "right"}
                            >
                            {head}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                        {handleSearch().map((row)=>{
                            const profit = row.price_change_percentage_24h > 0;
                            return (
                                <TableRow onClick={()=> {
                                    console.log("Clicked");
                                    navigate(`/coins/${row.id}`)}

                                }
                                 key={row.name}>
                                    <TableCell component='th' scope='row' styles={{display:'flex', gap:15}}>
                                        <img src={row?.image} alt={row.name} height='20' width='50' style={{marginBottom: 5}}/>
                                        <div style={{display:'flex', flexDirection:'column'}}>
                                            <span style={{textTransform:'uppercase', fontSize: 20}}>
                                                {row.symbol}
                                            </span>
                                            <span>{row.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                    {"₹ "}{row.current_price.toFixed(2)}
                                    </TableCell>
                                    <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell align="right">
                          {"₹ "}
                          {
                            row.market_cap.toString().slice(0, -9)
                          }
                          B
                        </TableCell>
                                 </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
            )}
        </TableContainer>
    </div>
  )
}

export default CoinTable
