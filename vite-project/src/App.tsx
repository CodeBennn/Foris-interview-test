import { useState } from 'react'
import CoinList from './components/coinlist'
import './App.css'

function App() {
  const [total, setTotal] = useState(0)

  function getTotal(value: number) {
    setTotal(value);
  }

  return (
    <>
      <div className="logo-warpper">crypt.com | DEFI WALLET</div>
      <div className="total-balance-wrapper">{total} {'USD'}</div>
      <div className="transfer-wrapper"></div>
      <div className="coin-list-wrapper">
        <CoinList getTotal={getTotal} />
      </div>
    </>
  )
}

export default App
