import React, { useState } from 'react'
import { useStateContext } from '../context/StateContext'
import Category from './Category'
import SaleProduct from './SaleProduct'

const FooterBanner = ({ products } ) => {
  const {categories} = useStateContext();
  const [active, setActive] = useState('WOMEN')

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