import * as React from "react";
import { cn } from "@userbase/ui/lib/utils";
import { Button } from "@userbase/ui/primitives/button";
import Image from "next/image";
import { GalleryVerticalEnd, History, KanbanSquare } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@userbase/ui/primitives/accordion";
import { UserNav } from "./user-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/5 px-6 py-8 border-r border-input flex flex-col justify-between">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <Image alt="Userbase Logo" src="/logo.svg" width={40} height={40} />
            <span className="text-xl font-semibold">Userbase</span>
          </div>

          <Button
            variant="outline"
            className={cn(
              "relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12",
            )}
          >
            <span className="hidden lg:inline-flex">Search...</span>
            <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          <div className="space-y-1">
            <Accordion type="single" collapsible defaultValue="post">
              <AccordionItem className="border-none p-0 m-0" value="post">
                <AccordionTrigger className="border-none p-0 rounded-xl hover:bg-muted cursor-pointer hover:no-underline px-2">
                  <div className="flex items-center gap-2 py-2">
                    <GalleryVerticalEnd size={24} />
                    Post
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-0 m-0">
                  <div className="ml-5 pl-3 border-l border-l-muted-foreground/25 space-y-4 my-4">
                    <div className="cursor-pointer hover:underline">
                      Backlog
                    </div>
                    <div className="cursor-pointer hover:underline">
                      Todo
                    </div>
                    <div className="cursor-pointer hover:underline">In Progress</div>
                    <div className="cursor-pointer hover:underline">Done</div>
                    <div className="cursor-pointer hover:underline">Canceled</div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex gap-2 py-2 pl-2 rounded-xl hover:bg-muted cursor-pointer">
              <KanbanSquare size={24} />
              Roadmap
            </div>

            <div className="flex gap-2 py-2 pl-2 rounded-xl hover:bg-muted cursor-pointer">
              <History size={24} />
              Changelog
            </div>
          </div>
        </div>
        <UserNav />

      </div>
      <div className="w-full px-6 py-8">{children}</div>
    </div>
  );
}
