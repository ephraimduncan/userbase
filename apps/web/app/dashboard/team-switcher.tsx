"use client"

import * as React from "react"
import { CaretSortIcon } from "@radix-ui/react-icons"

import { cn } from "@userbase/ui/lib/utils"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@userbase/ui/primitives/avatar"
import { Button } from "@userbase/ui/primitives/button"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@userbase/ui/primitives/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@userbase/ui/primitives/popover"
import { Cog, CreditCard, LogOut, UserRound } from "lucide-react"

const menuItems = [
    {
        label: "Account",
        group: [
            {
                label: "Profile",
                route: "/profile",
                icon: <UserRound size={16} className="mr-2" /> as React.ReactNode,
            },
            {
                label: "Billing",
                route: "/billing",
                icon: <CreditCard size={16} className="mr-2" /> as React.ReactNode,
            },
            {
                label: "Settings",
                route: "/settings",
                icon: <Cog size={16} className="mr-2" /> as React.ReactNode,
            },
        ],
    },
    {
        group: [
            {
                label: "Logout",
                route: "/logout",
                icon: <LogOut size={16} className="mr-2" /> as React.ReactNode,
            },
        ],
    },
]


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps extends PopoverTriggerProps { }

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
    const [open, setOpen] = React.useState(false)
    return (
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    aria-expanded={open}
                    aria-label="Select a team"
                    className={cn("w-full self-center justify-between h-12", className)}
                >
                    <Avatar className="mr-2 h-6 w-6">
                        <AvatarImage
                            src={`https://avatar.vercel.sh/personal.png`}
                            alt="Ephraim Duncan"
                            className="grayscale"
                        />
                        <AvatarFallback>ED</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 text-left">
                        <p className="text-sm font-medium leading-none">Ephraim Duncan</p>
                    </div>

                    <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandList>
                        {menuItems.map((items) => (
                            <CommandGroup key={items.label} heading={items.label}>
                                {items.group.map((item) => (
                                    <CommandItem
                                        key={item.route}
                                        onSelect={() => {
                                            // router.push(`/dashboard/${team.value}`)
                                            setOpen(false)
                                        }}
                                        className="text-sm"
                                    >
                                        {item.icon}
                                        {item.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover >
    )
}