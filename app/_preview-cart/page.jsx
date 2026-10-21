'use client'
import React from 'react'
import { CartContext } from '@/app/_components/_context/CartContext'
import CartDropdown from '@/app/_components/Heder/CartDropdown'

const IMG1 = 'https://res.cloudinary.com/hrelxxjf/image/upload/v1790703461/thumbnail_ffb43ce86d.webp'
const IMG2 = 'https://res.cloudinary.com/hrelxxjf/image/upload/v1790703686/thumbnail_9c63733517.webp'

const mockProduct = (id, title, category, price, url) => ({
    documentId: id,
    title,
    category,
    price,
    images: { url },
})

const mockCart = [
    { id: 'c1', quantity: 1, product: mockProduct('p1', 'Eyeshadow Palette with Mirror', 'beaty', 19.99, IMG1) },
    { id: 'c2', quantity: 2, product: mockProduct('p2', 'Red Lipstick', 'beauty', 12.99, IMG2) },
    { id: 'c3', quantity: 1, product: mockProduct('p3', 'Dior J’adore Eau de Parfum', 'fragrances', 89.99, IMG1) },
    { id: 'c4', quantity: 1, product: mockProduct('p4', 'Wooden Bathroom Sink With Mirror', 'furniture', 799.99, IMG2) },
]

export default function PreviewCartPage() {
    return (
        <CartContext.Provider value={{ cart: mockCart, setcart: () => { } }}>
            <div className="p-10">
                <CartDropdown />
            </div>
        </CartContext.Provider>
    )
}
