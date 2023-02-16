import React, { useState } from 'react'
import { client, urlFor } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext'
import Image from 'next/image';

const ProductDetails = ({ product, products }) => {
    const { image, name, details, price, colors, size, available, material, category, quantity } = product;
    const [index, setIndex] = useState(0)
    const { decQty, incQty, qty, onAdd } = useStateContext();
    let x = Math.floor(price * (0.2) + price)
    let color = colors.split(" ")

  return (
    <div>
        <div className='product-detail-container'>
            <div className='product-detail-images'>
                <div className='small-images-container'>
                    {image?.map((item, i)=> (
                        <img
                            alt='item-small-image'
                            key={i}
                            src={urlFor(item)}
                            className={i === index ? 'small-image selected-image' : 'small-image'}
                            onMouseEnter={() => setIndex(i)}            
                        />
                    ))}
                </div>
                <div className='image-container'>
                    <img 
                        alt='item-image'
                        src={urlFor(image && image[index])}
                        className='product-detail-image'
                    />
                </div>
                
            </div>
            <div className='product-detail-desc'>
                <p className='product-detail-sale-info'>NEW ON SALE</p>
                <h1>{name}</h1>
                <p className='product-detail-price'>${price} <span className='product-detail-old-price'>${x}</span></p>
                <div className='product-detail-colors'>Colors - {color.map(c => <div className='color-box' style={{backgroundColor:c}} key={c}></div> )}</div>
                <p className='product-detail-size'>Size - {size} ({available ? <span className='available'>product is available</span> : <span className='unavailable'>product is unavailable</span>})</p>
                <p className='product-detail-details'>{details}</p>
                <p className='product-detail-material'>Materials - {material}</p>
                
                <div className='quantity'>
                        <h3>Quantity:</h3>
                        <p className='quantity-desc'>
                            <span className='minus' onClick={decQty}>
                                <AiOutlineMinus />
                            </span>
                            <span className='num'>
                                {qty}
                            </span>
                            <span className='plus' onClick={incQty}>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className='buttons'>
                        <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>
                        ADD TO CART - ${price * qty}</button>
                    </div>

                    <div className='product-detail-infos'>
                        <p>Free return in store</p>
                        <p>Free worldwide shipping</p>
                    </div>
            </div>
        </div>
        <div className='maylike-products-wrapper'>
            <h2>You may also like</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>
                    {products.filter((i) => i.category == category).map((item) => (
                        <Product key={item._id} product={item}/>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`

    const products = await client.fetch(query)
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`
    const productsQuery = '*[_type == "product"]'
    const product = await client.fetch(query)
    const products = await client.fetch(productsQuery)
  
    return {
      props: {products, product}
    }
  }

export default ProductDetails