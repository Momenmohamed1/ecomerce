import { SignInButton } from '@clerk/nextjs'
import React from 'react'

const SignIn = () => {
    const {user} = useUser();

    console.log(user);
    
    return (
        <div></div>

    )
}

export default SignIn