"use client"

import { Button } from "@userbase/ui/primitives/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@userbase/ui/primitives/card"
import { Input } from "@userbase/ui/primitives/input"
import { Label } from "@userbase/ui/primitives/label"
import { Textarea } from "@userbase/ui/primitives/textarea"

export function CreatePost() {
  return (
    <Card>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg">Create Post</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 p-4">
        <div className="grid gap-2">
          <Label htmlFor="subject">Title</Label>
          <Input id="subject" placeholder="Title of your post" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Content</Label>
          <Textarea
            id="description"
            placeholder="Type your message here"
          />
        </div>
      </CardContent>
      <CardFooter className="justify-end space-x-2 p-4 pt-0">
        <Button>Submit Post</Button>
      </CardFooter>
    </Card>
  )
}