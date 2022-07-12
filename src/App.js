import { useState } from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Web3 from "web3";
import Chat from "./components/Chat/Textbox/Chat";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  let publicKey;
  let keyB64;

  const onLogin = async (provider) => {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask!");
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]);
      const accBalanceEth = web3.utils.fromWei(
        await web3.eth.getBalance(accounts[0]),
        "ether"
      );

      setBalance(Number(accBalanceEth).toFixed(6));

      // Get public key of the address
      keyB64 = await window.ethereum.request({
        method: 'eth_getEncryptionPublicKey',
        params: [accounts[0]],
      });
      console.log('sdfkjhsdf', keyB64);
      publicKey = Buffer.from(keyB64, 'base64');
      console.log(publicKey);

      setIsConnected(true);

    }
  };

  const onLogout = () => {
    setIsConnected(false);
  };

  return (
    <div>
      <header className="main-header">
        <h1>React &amp; Web3</h1>
        <nav className="nav">
          <ul>
            <li>
              <a href="/">{currentAccount}</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {!isConnected && <Login onLogin={onLogin} onLogout={onLogout} />}
        {isConnected && (
          // <Home currentAccount={currentAccount} balance={balance} />,
          <Chat key={keyB64}></Chat>
          // <h1>Your public key is {keyB64}</h1>
        )}
      </main>
      <h1>Your public key is {typeof keyB64}</h1>
    </div>
  );
}

export default App;
