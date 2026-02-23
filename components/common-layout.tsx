import Image from 'next/image'
import React from 'react'
import Common from './common'

const CommonLayout = ({children}: any) => {
  return (
     <div className="grid grid-cols-2">
    <Image width={1000} height={1000} src="/image.png" alt="authpagephoto" />
    <div>
      <div className="flex flex-col gap-6 justify-center items-center h-full">
        <Common />
{children}
      </div>
    </div>
   </div>
  )
}

export default CommonLayout