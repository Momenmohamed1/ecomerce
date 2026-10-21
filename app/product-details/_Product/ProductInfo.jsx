'use client'
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import CartApis from '../../_utils/CartApis'
import { CartContext } from '@/app/_components/_context/CartContext';

const ProductInfo = ({ product }) => {
    const { user } = useUser();
    const router = useRouter();
    const { cart, setcart } = useContext(CartContext)
    const [loading, setLoading] = useState(false)

    const handleAddToCart = () => {
        if (!user) {
            router.push('/sign-in');
            return;
        }

        const email = user.primaryEmailAddress?.emailAddress;
        const productDocumentId = product?.documentId;
        if (!email || !productDocumentId) return;

        setLoading(true);

        CartApis.getUserCartItems(email)
            .then(res => {
                // Is this product already in the user's cart?
                const existing = (res?.data?.data ?? []).find(
                    item => item?.projects?.[0]?.documentId === productDocumentId
                );

                if (existing) {
                    // Yes -> increase the quantity instead of creating a duplicate row
                    const quantity = (existing.quantity ?? 1) + 1;
                    return CartApis.updateCartItem(existing.documentId, { data: { quantity } })
                        .then(() => {
                            setcart(prev => prev.map(item =>
                                item.id === existing.documentId ? { ...item, quantity } : item
                            ));
                        });
                }

                // No -> create a new cart row with quantity 1
                return CartApis.addToCart({
                    data: {
                        username: user.fullName,
                        email,
                        projects: [productDocumentId],
                        quantity: 1,
                    }
                }).then(created => {
                    setcart(prev => [
                        ...prev,
                        { id: created?.data?.data?.documentId, product, quantity: 1 },
                    ]);
                });
            })
            .catch(err => console.error("Strapi:", err.response?.data ?? err))
            .finally(() => setLoading(false));
    };

return (
    <div className="flow-root mt-2">
        <dl className="-my-3 divide-y divide-gray-200 text-sm *:even:bg-gray-50">
            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Title</dt>
                <dd className=" font-semibold text-gray-700 sm:col-span-2">{product.title}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Category</dt>
                <dd className="text-gray-700 sm:col-span-2">{product.category}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Price</dt>
                <dd className="text-gray-700 sm:col-span-2">{product.price} $</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Discount</dt>
                <dd className="text-gray-700 sm:col-span-2 line-through">
                    {product?.Discount} $
                </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Stock</dt>
                <dd className="text-gray-700 sm:col-span-2">{product?.Stock} </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Descraption</dt>
                <dd className="text-gray-700 sm:col-span-2">
                    {product?.descraption?.[0]?.children?.[0]?.text}
                </dd>
            </div>
            <button
                type="button"
                onClick={handleAddToCart}
                disabled={loading}
                className="m-5 inline-flex items-center gap-2 rounded-full border border-teal-600 bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 focus-visible:ring-4 focus-visible:ring-indigo-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            >
                    <span>{loading ? 'Adding...' : 'Add To Cart'}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 24 24"
                    >
                        <title>cart</title>
                        <path
                            fill="currentColor"
                            d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
                        />
                    </svg>
            </button>
        </dl>
    </div>

)
}

export default ProductInfo
