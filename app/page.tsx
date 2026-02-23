
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
  <div className="flex justify-end items-center gap-10">
          <Link href="/auth/login" className='bg-purple-700 rounded-4xl py-1 px-5 cursor-pointer text-white'>Login</Link>
          <Link href="/auth/signup" className='bg-purple-700 rounded-4xl py-1 cursor-pointer px-5 text-white'>SignUp</Link>

  </div>
  );
}
