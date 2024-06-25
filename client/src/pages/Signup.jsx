import React, { useState } from 'react'
import { NavLink, json } from 'react-router-dom'
import axios from 'axios'


export default function Signup() {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  // console.log(formData)

  const handleSubmit = async (e) => {

    e.preventDefault();
   try {
    setLoading(true)
    setError(false)
    const res= await fetch('/api/auth/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),

    });
    const data= await res.json()
    setLoading(false)
    if(data.success===false){ 
      setError(true)
      return;
    }
   
   } catch (error) {
      setLoading(false)
     
   }
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const response = await axios.post('/api/auth/signup', formData, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     console.log(response.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div>
      <h1 className='text-3xl text-center font-semibold my-7'>Signup</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-3 max-w-lg mx-auto'>
        <input type="text" name="username" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />

        <input type="text" name="email" id='email' placeholder='Email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />

        <input type="text" name="password" id='password' placeholder='Password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />


        <button disabled={loading} className='  bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled: opacity-80'>
          {loading? 'Loading...': 'Signup'}
        </button>
      </form>
      <div className='flex gap-2 mt-5 justify-center'>
        <p>Have an account?</p>
        <NavLink to='/sign-in'>
          <span className='text-blue-700'>Sign in</span>
        </NavLink>
      </div>
      <p className='text-red-700 mt-5 flex gap-2 justify-center'>{error&&"something went wrong!!"}</p>

    </div>
  )
}
