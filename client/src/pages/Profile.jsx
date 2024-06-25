import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const { currentUser } = useSelector(state => state.user)

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className=' flex flex-col gap-4' >
        <img className='h-24 w-24 rounded-full object-cover self-center cursor-pointer mt-2' src={currentUser.profilePicture} alt="profilePicture" />
        <input defaultValue={currentUser.username} type="text" name="username" id="username" placeholder='Username' className='bg-slate-100 rounded-lg p-3' />
        
        <input defaultValue={currentUser.email} type="text" name="email" id="email" placeholder='email' className='bg-slate-100 rounded-lg p-3' />

        <input type="text" name="password" id="passwprd" placeholder='password' className='bg-slate-100 rounded-lg p-3' />

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 '>Update</button>
      </form>
      <div className='flex justify-between mt-5'> 
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
      </div>
    </div>
  )
}
