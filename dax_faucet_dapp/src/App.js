import {useState, useEffect} from "react"
import faucetContract from "./Ethereum/faucet"
import {ethers} from "ethers";

import './App.css';

function App() {
  
  const [walletaddress, setWalletAddress] = useState('');
  const [signer, setSigner] = useState();
  const [fcContract, setFcContract] = useState();
  const [withDrawError, setWithDrawError] = useState("");
  const [withDrawSuccess, setWithDrawSuccess] = useState("");
  const [txnData, setTxnData] = useState("");


  useEffect (() => {
    currentAcct();
    accListener ();
  })

  const walletConnect = async () => {
    if ( typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const accounts = await provider.send("eth_requestAccounts", []);

        setSigner(provider.getSigner());

        setFcContract(faucetContract(provider));
        
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

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const accounts = await provider.send("eth_accounts", []);

      if (accounts.length > 0) {
        setSigner(provider.getSigner());

        setFcContract(faucetContract(provider));
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

  const getOctToken = async () => {
    setWithDrawSuccess("");
    setWithDrawError("");

    try {
          const fcContractWithSinger = fcContract.connect(signer);
          const resp = await fcContractWithSinger.withDrawFaucet(); 
          console.log(resp);
          setWithDrawSuccess("Token sent to your address");
          setTxnData(resp.transactionHash)
    }catch (err){
        console.error(err.massage)
        setWithDrawError(err.message);
    }
  }

  const donateToken = async () => {
    setWithDrawSuccess("");
    setWithDrawError("");
    try {
        const providerUrl = 'https://sepolia-rpc.scroll.io/';
        const provider = new ethers.providers.JsonRpcProvider(providerUrl);

        // Assuming `contractAddress` is the address of your smart contract
        const contractAddress = '0xF1ee102E6f724F908a214c62c7A4F6D0dA0c4346'; // Replace with your contract address
        
        // Send Ether to the contract's address
        const signer = provider.getSigner();
        const tx = await signer.sendTransaction({
            to: contractAddress,
            value: ethers.utils.parseEther("10") // Send 1 Ether as an example
        });
        
        await tx.wait(); // Wait for transaction to be mined
        
        setWithDrawSuccess("Thank you for donating");
        setTxnData(tx.hash); // Set transaction hash for reference
    } catch (err) {
        setWithDrawError(err.message);
    }
}

  
  return (
    <>
    <div className="walletConnect">
      <header className="App-header">
        <div className="donateBut">
        <p>Donate some OCT token</p> 
        <button onClick={donateToken}> Donate </button>
        </div>
        <button className="connectBut"  onClick={walletConnect}>{walletaddress && walletaddress.length > 0 ? `connected ${walletaddress.substring(0,4)}....${walletaddress.substring(38) }` : "Connect Wallet"} </button>
      </header>
    </div>
    <div className="faucetBody">
      <div className="faucetApp">
        <h1>BriTech Faucet Dapp</h1>

        <h2> {} Token Available</h2>


        <p>Get 5 OCT/day</p>
        <div className="mt-5">
          {withDrawError && (<div className="withdraw-error">{withDrawError} </div>)}
          {withDrawSuccess && (<div className="withdraw-success">{withDrawSuccess} </div>)}
        </div>
        <div className="getFaucet"> 

        <input placeholder="Enter your wallet address: " type="text" defaultValue={walletaddress}/>
        <button onClick={getOctToken}>GET TOKENS</button>
        </div>

        <div className="Txndata">
        <p>{txnData ?`Transaction Data: ${txnData} `: "--"}</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
