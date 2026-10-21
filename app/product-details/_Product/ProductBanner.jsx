import Image from 'next/image'
import React from 'react'

const ProductBanner = ({product}) => {
    return (
        <div className='m-1'>
        {product?.images?.url?
            <Image src={product.images.url} width={500} height={500} className='md:m-3 rounded-xl bg-teal-50' alt='Product-banner' />
        :<div>notfound</div>
        }
        </div>
    )
}

export default ProductBanner