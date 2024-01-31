import { Button } from '@userbase/ui/primitives/button'
import Image from 'next/image'
import React from 'react'
import { PostSection } from './post-section'

export default function Feed() {
  return (
    <div className='h-screen'>
      <div className='h-28 border-b'>
        <div className='mx-auto w-[60%] h-full pt-3 flex flex-col justify-between'>
          <div className='flex justify-between items-center'>
            <div className="flex items-center gap-2">
              <Image alt="Userbase Logo" src="/logo.svg" width={40} height={40} />
              <span className="text-xl text-primary">Userbase</span>
            </div>
            <Button variant="default" size={"sm"}>Sign Up</Button>
          </div>

          {/* TODO: Do better, this is shit */}
          {/* MVP: Just make it work */}
          <div className='-ml-4 space-x-4'>
            <Button variant="ghost" className='hover:bg-transparent hover:border-b hover:border-primary rounded-none'>Feedback</Button>
            <Button variant="ghost" className='hover:bg-transparent hover:border-b hover:border-primary rounded-none'>Roadmap</Button>
            <Button variant="ghost" className='hover:bg-transparent hover:border-b hover:border-primary rounded-none'>Changelog</Button>
          </div>
        </div>
      </div>
      <div className='py-6'>
        <div className='mx-auto w-[60%] grid grid-cols-12 gap-8'>
          <div className='col-span-8 space-y-8'>
            {/* Filter Buttons */}
            <div className='flex items-center justify-between'>
              <div className='space-x-4'>
                <Button>New</Button>
                <Button>Trending</Button>
                <Button>Top</Button>
              </div>
              <div className='space-x-4'>
                <Button>Search</Button>
                <Button>Filter</Button>
              </div>
            </div>

            <div className='space-y-3'>
              <PostSection />
              <PostSection />
              <PostSection />
              <PostSection />
              <PostSection />
              <PostSection />
            </div>

          </div>
          <div className='col-span-4 bg-yellow-200'>2</div>
        </div>
      </div>
    </div>
  )

}
