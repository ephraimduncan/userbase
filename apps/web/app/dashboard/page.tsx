import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"

import { columns } from "./posts/components/columns"
import { DataTable } from "./posts/components/data-table"
import { postSchema } from "./posts/data/schema"

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "./app/dashboard/posts/data/posts.json")
  )

  const tasks = JSON.parse(data.toString())

  return z.array(postSchema).parse(tasks)
}

export default async function TaskPage() {
  const tasks = await getTasks()

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-4 p-8 md:flex">
        <h2 className="text-2xl font-bold tracking-tight">Posts</h2>

        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
