import React, {useEffect} from 'react'
import { client } from '../../lib/client'

import { Product } from '../../components'

const Category = ({ products }) => {

  return (
    <div className='category-container'>
      {products?.map((product) => <Product product={product} key={product._id} /> )}

    </div>
  )
}

export const getServerSideProps = async ({params: category}) => {
  const query = `*[_type == "product" && category == '${category.category}']`
  const products = await client.fetch(query)

  return {
    props: {products}
  }
}
export default Category