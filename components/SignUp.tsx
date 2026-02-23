'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.theswornapp.com'

import { VerifyOtp } from './verifyOtp'
import { useRouter } from 'next/navigation'
const SignUp = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        type: "MANUAL",
        password: ""
    })
    const [isOtp, setIsOtp] = useState(false)
    const handelChange = (e: any) => {
      const {name, value} = e.target;
      setFormData({
        ...formData,
        [name]: value
      })
    }
    const handelSubmit = async(e: any) => {
          e.preventDefault();
         
          if(formData.name.trim().length < 2){
            alert("Name should be atleast 2 character")
            return
          }
          if(!formData.email ||  !formData.email.includes('@')){
            alert("Email is incorrect")
            return
          }
           if(formData.password.length < 6){
            alert("Password should be altaest 6 character")
            return
          }
        
         try {
             setLoading(true)
             const res = await axios.post(`${apiUrl}/api/v1/user/signup`, formData)
             if(res.status){
                alert(res.data.message)
               setIsOtp(true)
             }
         } catch (error) {
            console.log(error)
         }finally{
            setLoading(false)
         }

    }
    if(isOtp) return <VerifyOtp />
  return (
    <div>

    <form  className='mt-5 w-72 flex flex-col gap-3'>
        <Input onChange={handelChange} value={formData.name} name='name' placeholder='Full Name' className='placeholder:font-semibold' />
        <Input onChange={handelChange} value={formData.email} name='email' placeholder='Email' type='email' className='placeholder:font-semibold' />
        <Input onChange={handelChange} value={formData.password} name='password' placeholder='Create Password' type='password' className='placeholder:font-semibold' />
        <Button disabled={loading} type='submit' onClick={handelSubmit} className='bg-purple-700 rounded-4xl py-1 cursor-pointer'>{loading ? 'Please wait' : 'Start Learning'}</Button>

    </form>
    <p className='text-center mt-20'>Already have an account? <span className='text-blue-600 underline cursor-pointer' onClick={() => router.push('login')}>Login</span></p>
    </div>
  )
}

export default SignUp