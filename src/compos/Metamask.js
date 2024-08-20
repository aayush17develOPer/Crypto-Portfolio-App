import React, {useState} from 'react'
import {ethers} from 'ethers';
import { Button } from 'flowbite-react';
const Metamask = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setdefaultAccount] = useState(null);
    const [userBalance, setuserBalance] = useState(null);

    const connectWallet = () => {
        if(window.ethereum){
            window.ethereum.request({method: 'eth_requestAccounts'}).
        then(result => {
            accountChanged([result[0]])
        })
        }
        else {
            setErrorMessage('Please install Metamask');
        }
    };

    const accountChanged = (accountName) => {
        setdefaultAccount(accountName);
        getUserBalance(accountName)
    };

    const getUserBalance = (accountAddress) => {
        window.ethereum.request({method: 'eth_getBalance', params: [String(accountAddress), "latest"]})
        .then(balance=> {
            setuserBalance(ethers.formatEther(balance));
        })
    };

    async function sendTransaction (e) {
        let params = [{
            from : "0xce8f01ee517bcddbd317bbccf4fd7d2e1dd15b3d",
            to: e.target.to_address.value,
            gas: Number(21000).toString(16),
            value: Number(1000000000000000).toString(16)
        }]

        let result = await window.ethereum.request({method: "eth_sendTransaction", params})
        .catch((err) => {
            console.log(err);
        })
    }
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
      <Button onClick={connectWallet} style={{color:'black', width: 300}} className='class="focus:outline-none text-white bg-yellow-300 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Yellow'>Connect Wallet</Button>
      <h3>Address: {defaultAccount}</h3>
      <h3>Balance: {userBalance}</h3>
      <form onSubmit={sendTransaction}>
        <h3>Enter transaction address:</h3>
        <input type="text" name='to_address' placeholder='Address: '/>
        <input type="submit" value="Submit"/>
      </form>
      {errorMessage}
    </div>
  )
}

export default Metamask

