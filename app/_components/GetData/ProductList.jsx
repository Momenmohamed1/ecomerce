import React from 'react'
import ProductCurds from './ProductCurds'
import Link from 'next/link'

const ProductList = ({ data }) => {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {data.map((getData) => {
                return <Link href={`/product-details/${getData.documentId}`} key={getData.id}>
                     <div className=' '>
                        <ProductCurds Product={getData} />
                    </div>
                </Link>
            })}
        </div>
    )
}

export default ProductList