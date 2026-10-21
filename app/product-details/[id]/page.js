"use client";
import React, { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import ProductAPIs from '@/app/_utils/ProductAPIs';
import Breadcrumbs from '@/app/_components/Breadcrumbs/Breadcrumbs';
import ProductBanner from '../_Product/ProductBanner';
import ProductInfo from '../_Product/ProductInfo';
import ProductList from '@/app/_components/GetData/ProductList';

const ProductDetails = () => {
    const path = usePathname();
    const params = useParams();
    
    const [Product, setProduct] = useState([]);
    const [ProductByCategory, setProductByCategory] = useState([]);
    const [state, setstate] = useState(false)

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await ProductAPIs.getProjectById(params.id);
                setstate(false);
                setProduct(res.data.data);
                getProductByCategory(res.data.data);
            } catch (err) {
                console.log(err.message);
            } finally {
                setstate(true);
            }
        }
        const getProductByCategory = (product) => {
            ProductAPIs.getProductByCategory(product?.category)
                .then((res) => {
                    setProductByCategory(res.data.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        fetchProduct();


    }, [params?.id]);

    return (
        <div className="p-10">
            <Breadcrumbs path={path} Product={Product} />
            {state ?
                <div className='md:flex md:m-5 md:p-3 justify-between items-center md:gap-10 '>
                    <ProductBanner product={Product} />
                    <ProductInfo product={Product} />
                </div>
                :
                <div
                    role="status"
                    className="  space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                >
                    <div className="flex items-center justify-center w-full h-48 bg-neutral-quaternary rounded-base sm:w-96">
                        <svg
                            className="w-11 h-11 text-fg-disabled"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                            />
                        </svg>
                    </div>
                    <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-2.5 bg-neutral-quaternary rounded-full w-48 mb-4" />
                        <div className="h-2 bg-neutral-quaternary rounded-full max-w-90 mb-2.5" />
                        <div className="h-2 bg-neutral-quaternary rounded-full mb-2.5" />
                        <div className="h-2 bg-neutral-quaternary rounded-full max-w-82.5 mb-2.5" />
                        <div className="h-2 bg-neutral-quaternary rounded-full max-w-75 mb-2.5" />
                        <div className="h-2 bg-neutral-quaternary rounded-full max-w-90" />
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
            <ProductList data={ProductByCategory} />
        </div>
    );
};

export default ProductDetails;