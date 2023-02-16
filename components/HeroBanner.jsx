import React, { useState } from 'react'
import { urlFor } from '../lib/client'
import { useStateContext } from '../context/StateContext'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const HeroBanner = ({ products }) => {
    const {qty, onAdd, setShowCart} = useStateContext();
    const [num, setNum] = useState(0)
    const [direction, setDirection] = useState(0)

    const sliderVariant = {
        initial: direction => {
            return {
                x: direction > 0 ? 50 : -50,
                opacity: 0,
            }
        },
        animate: {
          x: 0,
          opacity: 1,
          transition: 'ease-in',
        },
        exit: direction => {
            return {
                x: direction > 0 ? -50 : 50,
                opacity: 0,
            }
        }
      }

    const setRandomItem = () => {
        return Math.floor(Math.random() * (5 - 1 + 1) + 1)
    }

    const handleBuyNow = () => {
        onAdd(products[num], qty)
        setShowCart(true)
    }

    const incNum = () => {
        setDirection(1)
        if (num <= 4 && num >= 0) {
            setNum(num + 1)
        } else {
            setNum(setRandomItem())
        }
    }

    const decNum = () => {
        setDirection(-1)
        if (num > 0) {
            setNum(num - 1)
        } else {
            setNum(setRandomItem())
        } 
    }

  return (
    <div className='hero-banner'>
        <div className='slider'>
            <div className='slider-button l' onClick={decNum}>
                <div>
                <AiOutlineArrowLeft className='arrow'/>
                </div>
            </div>
        </div>
    <AnimatePresence initial={false} mode='wait' custom={direction}>
        <motion.div className='hero-banner-container' variants={sliderVariant}
                animate='animate'
                initial='initial'
                exit='exit'
                key={num}
                custom={direction}> 
            <div className='hero-banner-inner'>
                <div>
                    <p className='hero-title'>WINTER SALE</p>
                    <h3>
                        20% OFF
                    </h3>
                    <p className='product-category'>#{products[num].category}</p>
                    <p className='product-title'>
                        {products[num].name}
                    </p>
                    <h1>
                        ${products[num].price}
                    </h1>
                    <div className='desc'>
                        <p>{products[num].details}</p>
                    </div>
                    <div className='hero-banner-button-container'>
                        <button type="button" onClick={handleBuyNow}>
                            BUY NOW
                        </button>
                    </div>
                </div>
                <img
                    src={urlFor(products[num].image[0])}
                    alt="item-image"
                    className='hero-banner-image'
                    width={250}
                    height={250}
                />
            </div>
        </motion.div>
    </AnimatePresence>
    <div className='slider'>
        <div className='slider-button r' onClick={incNum}>
            <AiOutlineArrowRight className='arrow'/>
        </div>
    </div>
    
    </div>
  )
}

export default HeroBanner

