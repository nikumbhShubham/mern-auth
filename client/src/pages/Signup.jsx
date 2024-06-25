import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Signup() {
  return (
    <div>
      <h1 className='text-3xl text-center font-semibold my-7'>Signup</h1>
      <form className='flex flex-col gap-4 p-3 max-w-lg mx-auto'>
        <input type="text" name="username" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' />

        <input type="text" name="email" placeholder='Email' className='bg-slate-100 p-3 rounded-lg' />

        <input type="text" name="password" placeholder='Password' className='bg-slate-100 p-3 rounded-lg' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled: opacity-80'>Sign Up</button>
        </form>
      <div className='flex gap-2 mt-5 justify-center'>
        <p>Have an account?</p> 
        <NavLink to='/sign-in'>
        <span className='text-blue-700'>Sign in</span>
        </NavLink>
      </div>

    </div>
  )
}
