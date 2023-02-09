import React, { useState } from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'
import { useStateContext } from '../context/StateContext'
import Category from './Category'
import SaleProduct from './SaleProduct'

const FooterBanner = ({ products } ) => {
  const {qty, onAdd, setShowCart, categories} = useStateContext();
  const [active, setActive] = useState('WOMEN')

  const handleBuyNow = () => {
    onAdd(products, qty)
    setShowCart(true)
  }

  return (
    <div className='footer-banner-container'>
      <div className='sale-categories'>
        {categories.map((category) => (
          <Category 
            key={category.name}
            name={category.name}
            active={active}
            handleClick={setActive}
            products={products}>
          </Category>
        ))}
      </div>
      <div className='sale-products'>
      {products?.filter((product, index) => (product.category === active && index > 4)).map((product) => <SaleProduct product={product} key={product._id} /> )}
      </div>
    </div>
  )
}

export default FooterBanner