import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
    return (
        <main className=" flex flex-col items-center justify-center py-4 px-4 md:px-8">
            <div className="grid items-center gap-x-8 gap-y-12 max-w-lg w-full bg-white p-4 border border-slate-300 shadow-md rounded-lg lg:grid-cols-2 md:max-w-2xl lg:max-w-6xl">
                <div className="max-w-md mx-auto w-full p-2 md:p-4 ">

                    <SignIn
                        appearance={{
                            elements: {
                                card :"bg-white ",
                                footerItem  :"hidden",
                                headerTitle :"text-gray-500",
                                socialButtonsBlockButtonText:"text-black",
                                formFieldLabel:"text-gray-500",
                                formFieldInput :"bg-white border-2 placeholder:text-gray-500 border-gray-600 text-black",
                                formFieldInfoText:"text-gray-800",
                                footerActionText  :"text-gray-600",
                                footerActionLink :"text-gray-900",
                                formFieldInputShowPasswordButton :"text-black"
                            },
                            variables:{
                                colorMuted:"0"
                            }
                        }}
                    />

                </div>
                <div className="w-full h-full flex items-center bg-[#000842] rounded-xl p-8">
                    <img
                        src="https://readymadeui.com/signin-image.webp"
                        className="w-full aspect-12/12 object-contain"
                        alt="login-image"
                    />
                </div>
            </div>
        </main>
    )
}

export default page