import React, { useEffect } from 'react'
import { useSession, signIn } from "next-auth/react"
import { client } from '../lib/client'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import {useStateContext} from '@/context/StateContext'
import Image from 'next/image'


const LoginBtn = () => {
  const { data: session } = useSession()
  const { data: profile } = useSession()
  const { setUserData } = useStateContext()

  useEffect(()=>{
    if(session){
      const doc = {
        _id: profile?.token.sub,
        _type: "user",
        name: session?.user.name,
        image: session?.user.image,
        email: session?.user.email,  
        };
      setUserData(doc)
      client.createIfNotExists(doc)
    }
  },[session])

  if (session) {
    return (
      <>
        <Link href={`/profiles/${profile.token.sub}`}>
          <img className='loginBtn-picture' src={session?.user.image} alt="profile" referrerPolicy="no-referrer"/>
        </Link>
      </>
    )
  }
  return (
    <>
      <div onClick={() => {
        signIn('google')
        }} className="button-unsigned">
        <FcGoogle className='google-icon' />
        <p>Sign in</p>
      </div>
    </>
  )
}

export default LoginBtn