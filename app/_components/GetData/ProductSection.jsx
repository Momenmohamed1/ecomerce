"use client";
import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import axios from 'axios'
import ProductAPIs from '@/app/_utils/ProductAPIs';

const ProductSection = () => {
    const [Products, setProducts] = useState([])
    const [SearchTerm, setSearchTerm] = useState('')
    const [priceRange, setpriceRange] = useState('')

    useEffect(() => {

        async function GetProduct() {
            try {
                const res = await ProductAPIs.getlatestproduct()
                setProducts(res.data.data)
            } catch (err) {
                console.log(err.message);
            }
        }
        GetProduct()
    }, [])
    const filteredProducts = Products.filter((product) =>
        product.title?.toLowerCase().includes(SearchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(SearchTerm.toLowerCase())
    );
return (
    <div className=' sm:p-10 p-2 md-20'>
        <div className='md:flex sm:flex justify-between items-center md:w-190'>
            <h2 className='font-bold m-2 text-xl'>Our Lastes Product</h2>
            <input
                className='my-2 border border-gray-300 rounded-md w-70 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500' type="text" placeholder="Search products..."
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                }} />
        </div>
        {Products ? <ProductList data={filteredProducts} /> : <p>No products found.</p>}
    </div>
)
}

export default ProductSection