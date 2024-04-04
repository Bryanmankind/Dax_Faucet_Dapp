import {ethers} from "ethers";
import {useState, useEffect} from "react"
import {faucetContract} from "./Ethereum/faucet"

import './App.css';

function App() {
  
  const [walletaddress, setWalletAddress] = useState('');

  useEffect (() => {
    currentAcct();
    accListener ();
  })

  const walletConnect = async () => {
    if ( typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {

        const provider = new ethers.providers.Web3Provider(window.ethereum);

      const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
      setWalletAddress(accounts[0])
      console.log(accounts[0])

      }catch (e){
        console.log(e)
      }
    }else{
      console.log("Install metamask extention")
    }
  }
  
  const currentAcct = async () => {
    if ( typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
      const accounts = await window.ethereum.request({method: "eth_accounts"})

      if (accounts.length > 0) {
        setWalletAddress(accounts[0])
        console.log(accounts[0])
      }else{
        console.log("connect with connect button")
      }
      
      }catch (e){
        console.log(e)
      }
    }else{
      console.log("Install metamask extention")
    }
  }

  const accListener = async () => {
    if ( typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0])
        console.log(accounts[0])
      })
    }else{
      console.log("Install metamask extention")
    }
  }
  
  return (
    <>
    <div className="walletConnect">
      <header className="App-header">
        <div className="donateBut">
        <p>Donate some OCT token</p> 
        <button> Donate </button>
        </div>
        <button className="connectBut"  onClick={walletConnect}>{walletaddress && walletaddress.length > 0 ? `connected ${walletaddress.substring(0,4)}....${walletaddress.substring(38) }` : "Connect Wallet"} </button>
      </header>
    </div>
    <div className="faucetBody">
      <div className="faucetApp">
        <h1>BriTech Faucet Dapp</h1>

        <h2> {} Token Available</h2>


        <p>Get 5 OCT/day</p>

        <div className="getFaucet"> 

        <input placeholder="Enter your wallet address: " type="text"/>
        <button>GET TOKENS</button>
        </div>
        
        <div className="Txndata">
        <h2>TRANSACTION DATA</h2>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
