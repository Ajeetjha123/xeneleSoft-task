'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.theswornapp.com'

const Login = () => {
    const[error, setError] = useState(null)
        const [loading, setLoading] = useState(false)
    const router = useRouter()
     const [formData, setFormData] = useState({
            email: "",
            password: ""
        })
          const handelChange = (e: any) => {
      const {name, value} = e.target;
      setFormData({
        ...formData,
        [name]: value
      })
    }
    const handelSubmit = async(e: any) => {
          e.preventDefault();
             if(!formData.email ||  !formData.email.includes('@')){
            alert("Email is Required")
            return
          }
           if(!formData.password.length){
            alert("Password is required")
            return
          }
        
         try {
            setError(null)
            setLoading(true)
             const res = await axios.post(`${apiUrl}/api/v1/user/login`, formData)
             if(res.status){
                alert(res.data.message)
              
             }else {
                 setError(res.data.message)
             }
         } catch (error: any) {
            setError(error.data.message)
            console.log(error)
         }finally{
            setLoading(false)
         }

    }
  return (
    <div>
{error&& <div className='text-sm font-semibold text-red-600'>{error}</div>}
     <form  className='mt-5 w-72 flex flex-col gap-3'>
        <Input onChange={handelChange} value={formData.email} name='email' placeholder='Email Address' type='email' className='placeholder:font-semibold' />
        <Input onChange={handelChange} value={formData.password} name='password' placeholder='Password' type='password' className='placeholder:font-semibold' />
        <Button disabled={loading} type='submit' onClick={handelSubmit} className='bg-purple-700 rounded-4xl py-1 cursor-pointer'>{loading ? 'Please wait' : 'Start Learning'}</Button>
        
    </form>
        <p className='text-center mt-20'>Don't have an account? <span className='text-blue-600 underline cursor-pointer'  onClick={() => router.push('signup')}>Signup</span></p>

    </div>
  )
}

export default Login