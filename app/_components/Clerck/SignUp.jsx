import { SignUpButton } from '@clerk/nextjs'
import React from 'react'

const SignUp = () => {
    return (
        <SignUpButton>
            <button className="bg-teal-700  text-white rounded-xl font-medium text-sm sm:text-base h-10  px-4 sm:px-5 cursor-pointer ml-2">
                Sign up for free
            </button>
        </SignUpButton>
    )
}

export default SignUp