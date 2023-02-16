import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import Image from 'next/image'

const SaleProduct = ({ product: { image, name, slug, price } }) => {
  let x = Math.floor(price * (0.2) + price)
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <img
            src={urlFor(image && image[0])}
            className="product-image"
            alt='product-image'
          />
          <p className='product-name'>{name}</p>
          <p className='sale-p-price'>${price} <span className='old-price'>${x}</span></p>
          <p className='sale-info'>NEW ON SALE</p>
        </div>
      </Link>
    </div>
  )
}

export default SaleProduct