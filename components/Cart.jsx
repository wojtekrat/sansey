'use client';

import React, {useRef} from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'

import {TiDeleteOutline} from 'react-icons/ti'
import toast from 'react-hot-toast'

import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'
import getStripe from '../lib/getStripe'
import { motion } from 'framer-motion'
import Image from 'next/image'

const Cart = () => {
  const cartRef = useRef()
  const { totalPrice, totalQuantity, cartItems, setShowCart, toggleCartItemQuantity, onRemove, showCart, userData, getFromStorage } = useStateContext()
  
  const handleCheckout = async () => {
    if(userData != undefined) {
    const stripe = await getStripe()
    let obj = {
      cart: cartItems,
      user: userData
    }

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj),
    })
    console.log(obj)
    if(response.statusCode === 500) return

    const data = await response.json()

    toast.loading('Redirecting...')

    stripe.redirectToCheckout({ sessionId: data.id });
  }
  else {
    toast.error('Please log in to purchase items')
  }
  }

  const navVariants = {
    hidden: {
      opacity: 0,
      x: 400,
      transition: {
        type: 'ease-out',
      },
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'ease-out',
      },
    },
  };

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <motion.div className='cart-container' initial='hidden' whileInView='show' animate={showCart ? "show" : "hidden"} variants={navVariants}>
        <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Your cart</span>
          <span className='cart-num-items'>({totalQuantity} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150}/>
            <h3>Your shopping bag is empty</h3>
            
              <button type='button' onClick={()=> setShowCart(false)} className='btn'>
                Continue shopping
              </button>
            
          </div>

        )}
        <div className='product-container'> 
          {cartItems.length >= 1 && cartItems.map((item)=> 
          (
            <div className='product' key={item?.image[0]} >
              <Image width={250} height={250} alt="product-image" src={urlFor(item?.image[0]).url()} className='cart-product-image'/>
              <div className='items-desc'>
                <div className='flex top'>
                  <h5>{item?.name}</h5>
                  <h4>${item?.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                      <span className='minus' onClick={() => toggleCartItemQuantity(item?._id, 'dec')}>
                        <AiOutlineMinus />
                      </span>
                      <span className='num'>
                        {item?.quantity}
                      </span>
                      <span className='plus' onClick={() => toggleCartItemQuantity(item?._id, "inc")}>
                        <AiOutlinePlus />
                      </span>
                    </p>          
                  </div>
                  <button 
                    type='button'
                    className='remove-item'
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>   
                </div>       
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button type='button' className='btn' onClick={handleCheckout} >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </motion.div>

    </div>
  )
}

export default Cart