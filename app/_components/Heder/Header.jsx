"use client";
import { Show, SignInButton, SignOutButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image'
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import SignUp from '../Clerck/SignUp';
import { CartContext } from '../_context/CartContext';
import CartApis from '@/app/_utils/CartApis';
import CartDropdown from './CartDropdown';
const Header = () => {
    const { user } = useUser();
    const { cart, setcart } = useContext(CartContext)

    useEffect(() => {
        user && GetCartItem()
    }, [user])
    const GetCartItem = () => {
        const email = user?.primaryEmailAddress?.emailAddress;
        if (!email) return;

        CartApis.getUserCartItems(email)
            .then(res => {
                const items = (res?.data?.data ?? []).map(cartItem => ({
                    id: cartItem?.documentId,
                    product: cartItem?.projects?.[0],
                    quantity: cartItem?.quantity ?? 1,
                }));
                setcart(items);
            })
            .catch(err => console.error("Strapi:", err.response?.data ?? err));
    }
    const navs = [
        { name: "Home", href: "/" },
        { name: "Explore", href: "#Explore" },
        { name: "Projects", href: "#Projects" },
        { name: "AboutUs", href: "#AboutUs" },
        { name: "Contact AS", href: "#ContactAS" },
    ]

    const [Togell, setTogell] = useState(false)
    return (<header className="bg-white w-full">
        <div className="flex h-16 w-full items-center gap-8 shadow-md px-4 sm:px-6 lg:px-8">
            <Image src='/logo.svg' alt='logo' width={40} height={50} />
            <div className="flex flex-1 items-center justify-end md:justify-between">
                <nav aria-label="Global" className="hidden md:block">
                    <ul className="flex items-center gap-6 text-sm">
                        {navs.map((nav) => {
                            return <li key={nav.name}>
                                <Link
                                    className="text-gray-500 transition hover:text-teal-600 font-bold "
                                    href={nav.href}
                                >
                                    {" "}
                                    {nav.name}{" "}
                                </Link>
                            </li>
                        })}
                    </ul>
                </nav>
                <div className="flex items-center gap-4 ">
                    <div className="flex items-center justify-center bg-white">

                        <CartDropdown />
                    </div>

                    <div className="sm:flex hidden items-center gap-4 justify-between">
                        <Show when="signed-out">
                            <div className="flex items-center gap-4 justify-between ">
                                <Link href="/sign-in">Sign In</Link>
                                {/* <SignInUser /> */}
                                <SignUp />
                            </div>
                        </Show>
                        <Show when="signed-in">
                            <div className="flex items-center gap-4 justify-between font-bold text-gray-600">
                                {user?.username}
                                <UserButton
                                    userProfileMode="navigation"
                                    userProfileUrl="/user-profile"
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-10 h-10 rounded-full",
                                            userButtonPopoverActionButton: " text-black/500 hover:bg-gray-100 duration-200 ",
                                            userButtonPopoverFooter: "hidden",
                                        },
                                        variables: {
                                            colorPrimary: "black",
                                            colorBackground: "#ffffff",
                                            colorForeground: "#111827",
                                            borderRadius: "12px",
                                            fontSize: "14px",
                                        },
                                    }}
                                />

                            </div>

                        </Show>

                    </div>
                    <button onClick={() => { setTogell(!Togell) }} className="block  rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                        <span className="sr-only">Toggle menu</span>
                        <svg
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        {Togell && (
            <ul className="block items-center text-sm ml-2 h-47 bg-gray-100 shadow-sm md:hidden">
                {navs.map((nav) => {
                    return <li className='mb-2 ' key={nav.name}>
                        <a
                            className="text-teal-500 transition my-2 hover:text-teal-600 font-bold "
                            href={nav.href}
                        >
                            {" "}
                            {nav.name}{" "}
                        </a>
                    </li>
                })}
                <div className="block ">
                    <Show when="signed-out">
                        <div className="flex items-center gap-4 justify-between">
                            <SignInButton>
                                <button className=" text-teal-600 bg-gray-300 hover:text-white hover:bg-teal-600 duration-200 rounded-xl font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer ml-2">
                                    Login
                                </button>
                            </SignInButton>
                            <SignUpButton>
                                <button className="bg-teal-700 hover:text-teal-600 hover:bg-gray-300 duration-200 text-white rounded-xl font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer ml-2">
                                    Sign up for free
                                </button>
                            </SignUpButton>
                        </div>
                    </Show>
                    <Show when="signed-in">
                        <div className="flex  items-center gap-4 justify-between">
                            <UserButton
                                appearance={{
                                    elements: {
                                        // تعديل حجم وحواف صورة البروفايل
                                        avatarBox: "w-11 h-11 border-2 border-teal-600 hover:scale-110 transition-transform",
                                        // تعديل شكل القائمة المنسدلة (Popover)
                                        userButtonPopoverCard: "shadow-2xl rounded-xl border border-gray-100",
                                        // تعديل شكل النص أو اسم المستخدم إذا كان معروضاً
                                        userButtonOuterIdentifier: "text-teal-600 font-bold",
                                    },
                                }}
                            />
                            <SignOutButton>
                                <button className="mr-3 bg-teal-700 hover:text-teal-600 hover:bg-gray-300 duration-200 text-white rounded-xl font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer ml-2">
                                    Sign Out
                                </button>
                            </SignOutButton>
                        </div>

                    </Show>

                </div>
            </ul>
        )}
    </header>
    )
}

export default Header