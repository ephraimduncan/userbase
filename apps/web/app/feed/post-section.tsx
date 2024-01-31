import { Badge } from "@userbase/ui/primitives/badge";
import { ChevronUp } from "lucide-react";
import Image from "next/image";

export function PostSection() {
  return <div className='border rounded-md  flex w-full items-stretch'>
    <div className='border-r px-4 py-3 flex-1 space-y-3'>
      <div>
        <h1 className='font-medium'>Feedback Title</h1>
        <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, voluptatem.</p>
      </div>

      <div className='flex justify-between'>
        <div className='flex gap-1 items-center'>
          <Image alt="Profile logo Logo" src="/logo.svg" width={24} height={24} />
          <span className='text-sm text-foreground/70'>John Doe</span>
        </div>
        <div>
          <Badge
            variant="outline"
            className="rounded-sm px-1 font-normal"
          >
            Feature Request
          </Badge>
        </div>
      </div>
    </div>

    <div className='px-4 py-3 flex flex-col items-center justify-center w-[10%]'>
      <ChevronUp className="h-6 w-6 mr-1" />
      <span className=''>
        30
      </span>
    </div>

  </div>
}