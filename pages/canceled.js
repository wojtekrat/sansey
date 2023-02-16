import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'

import { useStateContext } from '../context/StateContext'

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantity} = useStateContext();
    useEffect(()=> {
        setCartItems([])
        setTotalPrice(0)
        setTotalQuantity(0)
    }, [])
  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill />
            </p>
            <h2>
                need more time? 
            </h2>
            <Link href='/'>
                <button type='button' width="300px" className="btn">
                Continue shopping
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Success