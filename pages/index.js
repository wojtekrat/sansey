import React from 'react'

import { client } from '../lib/client'
import { Product, FooterBanner, HeroBanner } from '../components'

const Home = ({ products }) => {
  return (
    <div>
      <HeroBanner products={products.length && products}/>
      <div className='products-heading'>
        <h2>Bestsellers</h2>
      </div>
      <div className='products-container'>
        {products?.filter((item, index) => index < 4).map((product) => <Product key={product._id} product={product}/> )}
      </div>
      <div className='sale-header'>
        <div>NEW ON SALE</div>
        <div className='sale-underline'></div>
      </div>
      <FooterBanner products={products.length && products}/>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  return {
    props: {products}
  }
}


export default Home