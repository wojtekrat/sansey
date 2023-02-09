import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './'
import { useStateContext } from '../context/StateContext'
import LoginBtn from './login-btn'
  
const Navbar = () => {
  
  const {showCart, setShowCart, totalQuantity, categories} = useStateContext()

  return (
    <div className='navbar-container'>
      <div className='navbar-left'>
        <LoginBtn/>
      </div>
      <div className='navbar-center'>
        <div className='navbar-center-title'>
          <Link href='/'>
            SANSEY
          </Link>
        </div>
        <div className='navbar-center-options'>
        {categories.map((category) => (
          <div key={category.name} className='navbar-center-option'>
            <Link href={`/category/${category.name}`}>{category.name}</Link>
          </div>
        ))}
        </div>
      </div>
      <button type='button' className='cart-icon' onClick={() => setShowCart(true) }>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantity}</span>
      </button>
      {showCart && <Cart />}
      
    </div>
  )
}

export default Navbar