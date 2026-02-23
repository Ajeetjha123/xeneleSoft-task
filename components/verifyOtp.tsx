'use client'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import axios from "axios"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.theswornapp.com'

export function VerifyOtp() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState("")
   const [email, setEmail] = useState("")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
        setLoading(true)
        const sendData = {
            otp, email
        }
      const res = await axios.post(
        `${apiUrl}/api/v1/user/verify-otp`,
         sendData 
      )

      console.log(res.data.message)

     
      if (res.status === 200) {
          alert(res.data.message)
          router.push('login')
      }else {
        alert(res.data.message)
      }
    } catch (error: any) {
      console.log(error.response?.data || error.message)
    }finally{
        setLoading(true)
    }
  }

  return (
    <div className=" flex justify-center items-center flex-col gap-3"> 
<h1 className="text-xl font-semibold">Enter Your OTP And CLick Verify OTP</h1>
    <form onSubmit={handleSubmit}>
                <Input onChange={(e) => setEmail(e.target.value)} value={email} name='email' placeholder='Email' type='email' className='placeholder:font-semibold my-3' />

      <InputOTP
        maxLength={4}
        value={otp}
        onChange={(value) => setOtp(value)}
       
        >
        <InputOTPGroup className="gap-4">
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>

      <Button disabled={loading} type="submit" className=' bg-purple-700 rounded-4xl py-1  mt-4 cursor-pointer w-full  '>
        {loading ? "Please Wait" : 'Verify OTP'}
      </Button>
    </form>
          </div>
  )
}