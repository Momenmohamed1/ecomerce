'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { CartContext } from '@/app/_components/_context/CartContext'
import CartApis from '@/app/_utils/CartApis'

const CartPage = () => {
    const { user } = useUser()
    const { cart = [], setcart } = useContext(CartContext) ?? {}
    const [busyId, setBusyId] = useState(null)
    const [error, setError] = useState('')

    const quantityOf = (item) => item?.quantity ?? 1

    const totalItems = cart.reduce((sum, item) => sum + quantityOf(item), 0)
    const total = cart.reduce(
        (sum, item) => sum + Number(item?.product?.price ?? 0) * quantityOf(item),
        0
    )

    const handleDelete = (id) => {
        setError('')
        setBusyId(id)
        CartApis.deleteCartItem(id)
            .then(() => setcart(prev => prev.filter(item => item.id !== id)))
            .catch(err => {
                console.error('Strapi:', err.response?.data ?? err)
                setError('Could not remove this item. Please try again.')
            })
            .finally(() => setBusyId(null))
    }

    const changeQuantity = (item, delta) => {
        const quantity = quantityOf(item) + delta
        if (quantity < 1) return

        setError('')
        setBusyId(item.id)
        CartApis.updateCartItem(item.id, { data: { quantity } })
            .then(() => {
                setcart(prev => prev.map(it =>
                    it.id === item.id ? { ...it, quantity } : it
                ))
            })
            .catch(err => {
                console.error('Strapi:', err.response?.data ?? err)
                setError('Could not update the quantity. Please try again.')
            })
            .finally(() => setBusyId(null))
    }

    return (
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">
                Shopping Cart{totalItems > 0 && <span className="text-gray-400"> ({totalItems})</span>}
            </h1>

            {!user ? (
                <div className="rounded-xl bg-gray-100 p-8 text-center">
                    <p className="mb-4 text-gray-600">Please sign in to view your cart.</p>
                    <Link
                        href="/sign-in"
                        className="inline-block rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
                    >
                        Sign In
                    </Link>
                </div>
            ) : !cart.length ? (
                <div className="rounded-xl bg-gray-100 p-8 text-center">
                    <p className="mb-4 text-gray-600">Your cart is empty.</p>
                    <Link
                        href="/"
                        className="inline-block rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <>
                    {error && (
                        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>
                    )}

                    <ul className="divide-y divide-gray-200">
                        {cart.map(item => {
                            const busy = busyId === item.id
                            const quantity = quantityOf(item)
                            const unitPrice = Number(item?.product?.price ?? 0)

                            return (
                                <li key={item.id} className="flex flex-wrap items-center gap-4 py-4">
                                    <Link href={`/product-details/${item?.product?.documentId}`} className="shrink-0">
                                        {item?.product?.images?.url ? (
                                            <Image
                                                src={item.product.images.url}
                                                alt={item?.product?.title ?? 'Product'}
                                                width={96}
                                                height={96}
                                                className="h-24 w-24 rounded-lg bg-teal-50 object-contain"
                                            />
                                        ) : (
                                            <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                                                No image
                                            </div>
                                        )}
                                    </Link>

                                    <div className="min-w-0 flex-1">
                                        <h2 className="truncate font-semibold text-gray-900">
                                            {item?.product?.title}
                                        </h2>
                                        <p className="text-sm text-teal-500">{item?.product?.category}</p>
                                        <p className="mt-1 text-sm text-gray-500">{unitPrice} $ each</p>
                                    </div>

                                    <div className="flex items-center gap-1 rounded-lg border border-gray-200">
                                        <button
                                            type="button"
                                            onClick={() => changeQuantity(item, -1)}
                                            disabled={busy || quantity <= 1}
                                            aria-label="Decrease quantity"
                                            className="h-9 w-9 rounded-l-lg text-lg font-semibold text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                                        >
                                            &minus;
                                        </button>
                                        <span className="w-10 text-center font-semibold text-gray-900">
                                            {quantity}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => changeQuantity(item, 1)}
                                            disabled={busy}
                                            aria-label="Increase quantity"
                                            className="h-9 w-9 rounded-r-lg text-lg font-semibold text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="w-24 text-right font-bold text-gray-900">
                                        {(unitPrice * quantity).toFixed(2)} $
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleDelete(item.id)}
                                        disabled={busy}
                                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {busy ? '...' : 'Remove'}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>

                    <div className="mt-6 flex items-center justify-between rounded-xl bg-gray-100 p-5">
                        <span className="text-lg font-semibold text-gray-900">
                            Total ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                        </span>
                        <span className="text-lg font-bold text-teal-600">{total.toFixed(2)} $</span>
                    </div>

                    <div className="mt-6 text-center">
                        <Link
                            href="/"
                            className="inline-block rounded-xl border border-teal-600 px-5 py-2.5 text-sm font-semibold text-teal-600 transition hover:bg-teal-600 hover:text-white"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default CartPage
