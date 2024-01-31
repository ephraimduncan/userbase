import { Button } from '@userbase/ui/primitives/button'
import Image from 'next/image'
import React from 'react'

export default function Feed() {
  return (
    <div className='h-screen'>
      <div className='h-28'>
        <div className='mx-auto w-[80%] h-full pt-3 flex flex-col justify-between'>
          <div className='flex justify-between items-center'>
            <div className="flex items-center gap-2">
              <Image alt="Userbase Logo" src="/logo.svg" width={40} height={40} />
              <span className="text-xl text-primary">Userbase</span>
            </div>
            <Button variant="default" size={"sm"}>Sign In/Sign Up</Button>
          </div>

          {/* TODO: Do better, this is s */}
          {/* MVP: Just make it work */}
          <div className='-ml-2 space-x-4'>
            <Button variant="ghost" className='hover:bg-transparent border-b hover:border-primary rounded-none'>Feedback</Button>
            <Button variant="ghost">Roadmap</Button>
            <Button variant="ghost">Changelog</Button>
          </div>

        </div>
      </div>
      <div className='bg-blue-200 min-h-full'>
        <div className='mx-auto w-[80%] bg-blue-300'>
          Posts
        </div>
      </div>
    </div>
  )
}
