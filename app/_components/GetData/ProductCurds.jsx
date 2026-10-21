import Image from 'next/image'
import React from 'react'

const ProductCurds = ({ Product }) => {
    return (
        <div className='hover:shadow-xl duration-200 hover:scale-105 hover:cursor-pointer'>
            <Image src={Product.images.url} alt='Product_Card' width={350} height={10} className='p-1 rounded-t-lg  h-42.5 object-contain bg-teal-50 ' />
            <div className='lg:flex justify-between items-center p-3 rounded-b-lg bg-gray-100 h-28 lg:h-20'>
                <div className=''><h2 className='sm:text-l font-bold text-sm lg:w-40 '>{Product.title}</h2>
                    <h2 className='text-sm text-teal-400'> {Product.category} </h2>
                </div>
                <p className='font-bold'>{Product.price} $</p>
            </div>
        </div>

    )
}

export default ProductCurds