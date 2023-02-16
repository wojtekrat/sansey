import React, { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import { client } from '../../lib/client'
import { toast } from 'react-hot-toast'
import { GrStatusGood } from 'react-icons/gr'
import { VscError } from 'react-icons/vsc'
import { useStateContext } from '@/context/StateContext'
import Image from 'next/image'


const Profile = ({user}) => {
  const { data: session } = useSession()
  const { userData, setUserData } = useStateContext()
  const [ addShippingAddress, setShippingAddress ] = useState(false)
  const [ street, setStreet ] = useState('')
  const [ city, setCity ] = useState('')
  const [ country, setCountry ] = useState('')
  const [ postcode, setPostcode ] = useState('')

  useEffect(()=>{
    setUserData(user)
  }, [user])

  const saveData = () => {
    if(street && city && country && postcode) {
      client.patch(user?._id).set({street: street}).commit()
      client.patch(user?._id).set({city: city}).commit()
      client.patch(user?._id).set({country: country}).commit()
      client.patch(user?._id).set({postcode: postcode}).commit()
      setStreet('')
      setCity('')
      setCountry('')
      setPostcode('')
      toast.success('Your data has been successfully saved!')
    } else {
      toast.error('Please fill all address inputs')
    }
  }

  return (
    <div className='profile-container'>
      {session && 
      <div className='profile-inner-container'>
        <div className='profile-info'>
          <div className='profile-image'>
            <Image width={50} height={50} src={session?.user.image} alt='profile image'/>
          </div>
          <div className='profile-data'>
            <p><span>Your name:</span> {user?.name}</p>
            <p><span>Your email:</span> {user?.email}</p>
          </div>  
        </div>
        
        <button type='button' className='btn-sign' onClick={() => signOut({callbackUrl: '/'})}>Sign Out</button>
        <button type='button' className='btn-shipping' onClick={() => setShippingAddress(!addShippingAddress) }>{addShippingAddress ? <AiOutlineArrowUp/> : <AiOutlineArrowDown/>}Add your shipping address {addShippingAddress ? <AiOutlineArrowUp/> : <AiOutlineArrowDown/>}</button>
        {addShippingAddress &&
          <div className='shipping-container'>
            <div className='shipping-card'>
              <input
                  className="shipping-option"
                  type="text"
                  placeholder={user.street == undefined ? "Street" : user.street}
                  value={street}
                  onChange={(e)=> setStreet(e.target.value)}
                >
              </input>
              <div className='ship-icon'>{user.street == undefined ? <VscError color='red'/> : <GrStatusGood/>}</div>
            </div>
            <div className='shipping-card'>
                <input
                  className="shipping-option"
                  type="text"
                  placeholder={user.city == undefined ? "City" : user.city}
                  value={city}
                  onChange={(e)=> setCity(e.target.value)}
                  >
                </input>
                <div className='ship-icon'>{user.city == undefined ? <VscError color='red'/> : <GrStatusGood/>}</div>
              </div>
              <div className='shipping-card'>
                <input
                  className="shipping-option"
                  type="text"
                  placeholder={user.country == undefined ? "Country" : user.country}
                  value={country}
                  onChange={(e)=> setCountry(e.target.value)}
                  >
                </input>
                <div className='ship-icon'>{user.country == undefined ? <VscError color='red'/> : <GrStatusGood/>}</div>
              </div>
              <div className='shipping-card'> 
                <input
                  className="shipping-option"
                  type="text"
                  placeholder={user.postcode == undefined ? "Postcode" : user.postcode}
                  value={postcode}
                  onChange={(e)=> setPostcode(e.target.value)}
                  >
                </input>
                <div className='ship-icon'>{user.postcode == undefined ? <VscError color='red'/> : <GrStatusGood/>}</div>
              </div>  
                <button type='button' className='btn-save' onClick={()=>saveData()}>Save data</button>
            </div>
        }
      </div>}
    </div>

  )
}
export const getServerSideProps = async ({params: profile}) => {
  const query = `*[_type == "user" && _id == '${profile.profile}'][0]`
  const user = await client.fetch(query)

  return {
    props: {user}
  }
}



export default Profile