'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { CartContext } from '../_context/CartContext'

// How many items stay visible before the "Show More" button kicks in
const PREVIEW_COUNT = 3

const CartDropdown = () => {
    const { cart = [] } = useContext(CartContext) ?? {}
    const [open, setOpen] = useState(false)
    const boxRef = useRef(null)

    // Close on outside click / Escape
    useEffect(() => {
        if (!open) return

        const handleClick = (e) => {
            if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false)
        }
        const handleKey = (e) => {
            if (e.key === 'Escape') setOpen(false)
        }

        document.addEventListener('mousedown', handleClick)
        document.addEventListener('keydown', handleKey)
        return () => {
            document.removeEventListener('mousedown', handleClick)
            document.removeEventListener('keydown', handleKey)
        }
    }, [open])

    const totalItems = cart.reduce((sum, item) => sum + (item?.quantity ?? 1), 0)
    const hasMore = cart.length > PREVIEW_COUNT

    return (
        <div ref={boxRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen(prev => !prev)}
                aria-expanded={open}
                aria-haspopup="true"
                aria-label="Open cart"
                className="relative scale-75 cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-8 w-8 text-gray-600"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                </svg>
                <span className="absolute -top-2 left-4 rounded-full bg-teal-500 p-0.5 px-2 text-sm text-red-50">
                    {totalItems}
                </span>
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-3 w-80 rounded-xl border border-gray-100 bg-white p-3 shadow-2xl">
                    <p className="pb-2 text-sm font-bold text-gray-900">
                        Your Cart ({totalItems})
                    </p>

                    {!cart.length ? (
                        <p className="py-6 text-center text-sm text-gray-500">
                            Your cart is empty.
                        </p>
                    ) : (
                        <>
                            <ul className="max-h-75 space-y-1 overflow-y-auto pr-1">
                                {cart.map(item => (
                                    <li key={item.id} className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-gray-50">
                                        <Link
                                            href={`/product-details/${item?.product?.documentId}`}
                                            onClick={() => setOpen(false)}
                                            className="shrink-0"
                                        >
                                            {item?.product?.images?.url ? (
                                                <Image
                                                    src={item.product.images.url}
                                                    alt={item?.product?.title ?? 'Product'}
                                                    width={56}
                                                    height={56}
                                                    className="h-14 w-14 rounded-lg bg-teal-50 object-contain"
                                                />
                                            ) : (
                                                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100 text-[10px] text-gray-400">
                                                    No image
                                                </div>
                                            )}
                                        </Link>

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold text-gray-900">
                                                {item?.product?.title}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Category:{' '}
                                                <span className="font-medium text-teal-500">
                                                    {item?.product?.category}
                                                </span>
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Price:{' '}
                                                <span className="font-semibold text-gray-900">
                                                    {item?.product?.price} $
                                                </span>
                                            </p>
                                        </div>

                                        {(item?.quantity ?? 1) > 1 && (
                                            <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
                                                x{item.quantity}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/cart"
                                onClick={() => setOpen(false)}
                                className="mt-3 block rounded-lg bg-teal-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-teal-700"
                            >
                                {hasMore ? 'Show More' : 'View Cart'}
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default CartDropdown
