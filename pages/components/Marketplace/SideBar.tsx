
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { ethers } from 'ethers';
import artifacts from "../../../utils/Ecommarce.json";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function SideBar() {

  const deployedAddress: string = "0x5d73f49F7E6574d3F8232987bF3F263F2DFD1773"
  const ABI: any = artifacts.abi

  const [walletAddress, getWalletAddress] = useState('')
  const [walletBalance, getWalletBalance] = useState('')
  const [USD, setUSD] = useState('0')

  const getAddress = async () => {
    try {
      if(typeof window != 'undefined') {
        const provider: any = new ethers.providers.Web3Provider(window.ethereum)
        const signer: any = await provider.getSigner()
        const Address: string = await signer.getAddress()
        const contract: any = await new ethers.Contract(Address, ABI, signer)
        // let usd = await contract.getLatestPrice()
        const Balance = await provider.getBalance(Address)
        const balance = await ethers.utils.formatEther(Balance)
        const addr = Address.slice(0, 5)+ "..." + Address.slice(38, 42)
        const bal = balance.slice(0, 8)
        // console.log(Number(bal))
        let usd = (Number(bal) * 0.92).toString()
        usd = usd.slice(0, 7)
        setUSD(usd)
        getWalletAddress(addr)
        getWalletBalance(bal)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAddress()
  }, [])

  const styles = {
    sidebar: `h-screen flex flex-col justify-start items-center gap-10`,
    top: ``,
    topBox: `w-full h-60 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 flex flex-col justify-around items-center shadow-2xl border-white-900/75 cursor-pointer`,
    wallet: `flex flex-col bg-slate-200/[.2] shadow-2xl border-white-900/75 rounded-2xl p-2`,
    bottom: `w-full h-1/2 flex flex-col justify-around items-center`,
    accountInfo:`flex text-lg font-semibold`,
    sideWallet: `flex flex-col justify-center items-center`,
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.topBox}>
          <Link href="/">
            <img src="/images/Metamask.png" />
          </Link>
          <div className={styles.wallet}>
            <span className={styles.accountInfo}>{walletAddress}</span>
            <span className={styles.accountInfo}>
              {walletBalance}
              <img src="/images/polygon.png" className='w-7 ml-1' />
            </span>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.sideWallet}>
          <img src="/images/Metamask.png" className='w-20' />
          <span>{walletAddress}</span>
        </div>
        <div className={styles.sideWallet}>
          <img src="/images/polygon.png" className='w-8' />
          <span>{walletBalance}</span>
        </div>
        <div className={styles.sideWallet}>
          <AttachMoneyIcon fontSize='large' className='text-blue-600' />
          <span className='text-white font-bold'>${USD} USD</span>
        </div>
        <div className={styles.sideWallet}>
          <img src='/images/ecommerce-logo.png' className='w-16 shadow-2xl border-white-900/75 rounded-full' />
        </div>
      </div>
    </div>
  )
}

export default SideBar

