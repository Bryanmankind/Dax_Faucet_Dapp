import {useState, useEffect} from "react"

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
    <div className="App">
      <header className="App-header">
       <h1>BriTech</h1>
        <p>Connect Your Wallet</p>
        <button onClick={walletConnect}>{walletaddress && walletaddress.length > 0 ? `connected ${walletaddress.substring(0,4)}....${walletaddress.substring(38) }` : "Connect Wallet"} </button>
      </header>
    </div>
  );
}

export default App;
