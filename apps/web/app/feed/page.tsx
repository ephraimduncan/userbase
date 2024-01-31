import { Button } from '@userbase/ui/primitives/button'
import Image from 'next/image'
import React from 'react'
import { PostSection } from './post-section'
import { promises as fs } from "fs"
import path from "path"
import { postSchema } from "../dashboard/posts/data/schema"
import { z } from "zod"
import { CreatePost } from './create-post'

async function getPosts() {
  const data = await fs.readFile(
    path.join(process.cwd(), "./app/dashboard/posts/data/posts.json")
  )

  const tasks = JSON.parse(data.toString())

  return z.array(postSchema).parse(tasks)
}


export default async function Feed() {
  const posts = (await getPosts()).slice(0, 20)

  return (
    <div className='h-screen'>
      <div className='h-28 border-b'>
        <div className='mx-auto w-[70%] h-full pt-3 flex flex-col justify-between'>
          <div className='flex justify-between items-center'>
            <div className="flex items-center gap-2">
              <Image alt="Userbase Logo" src="/logo.svg" width={40} height={40} />
              <span className="text-xl text-primary">Userbase</span>
            </div>
            <Button variant="default" size={"sm"}>Sign Up</Button>
          </div>

          {/* TODO: Do better, this is shit */}
          {/* MVP: Just make it work */}
          <div className='space-x-6'>
            <Button variant="ghost" className='hover:bg-transparent hover:border-b hover:border-primary rounded-none px-0'>Feedback</Button>
            <Button variant="ghost" className='hover:bg-transparent hover:border-b hover:border-primary rounded-none px-0'>Roadmap</Button>
            <Button variant="ghost" className='hover:bg-transparent hover:border-b hover:border-primary rounded-none px-0'>Changelog</Button>
          </div>
        </div>
      </div>
      <div className='py-6'>
        <div className='mx-auto w-[70%] grid grid-cols-12 gap-8'>
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
              {
                posts.map(post => {
                  return <PostSection key={post.id}   {...post} />
                })
              }
            </div>

          </div>
          <div className='col-span-4'>
            <CreatePost />
          </div>
        </div>
      </div>
    </div>
  )

}
