import { Avatar, AvatarFallback, AvatarImage } from "@userbase/ui/primitives/avatar";
import { Badge } from "@userbase/ui/primitives/badge";
import { ChevronUp } from "lucide-react";

type PostSectionProps = {
  title: string,
  description?: string,
  author: string,
  authorImage: string,
  content?: string,
  upvotes: number,
  label: string,
}

export function PostSection({ author, description, content, title, upvotes, label, authorImage }: PostSectionProps) {
  return (

    <div className='border rounded-md h-[110px] flex w-full items-stretch cursor-pointer pointer-events-auto'>
      <div className='border-r px-4 py-3 flex-1 space-y-3 flex flex-col justify-between'>
        <div>
          <h1 className='font-medium'>{title}</h1>
          {/* TODO: Fix this to avoid showing both at the same time */}
          {description && <p className='text-sm text-gray-500'>{description}</p>}
          {content && <p className='text-sm text-gray-500'>{content.split(" ").slice(0, 5).join(" ")}</p>}
        </div>

        <div className='flex justify-between'>
          <div className='flex gap-1 items-center'>
            <Avatar className="h-7 w-7">
              <AvatarImage src={authorImage} alt={author} />
              <AvatarFallback className="text-xs">{author.split(" ").filter(n => !["Dr.", "Mr.", "Mrs."].includes(n)).map(n => n.charAt(0)).join("")}</AvatarFallback>
            </Avatar>

            <span className='text-sm font-medium text-foreground/70'>{author}</span>
          </div>
          {label && (
            <div>
              <Badge
                variant="outline"
                className="rounded-sm px-1 font-normal"
              >
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </Badge>
            </div>
          )}
        </div>
      </div>

      <div className='px-4 py-3 flex flex-col items-center justify-center w-[10%]'>
        <ChevronUp className="h-6 w-6" />
        <span className='text-sm'>
          {upvotes}
        </span>
      </div>
    </div >)
}