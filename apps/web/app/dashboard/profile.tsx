import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@userbase/ui/primitives/avatar";
import { Button } from "@userbase/ui/primitives/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@userbase/ui/primitives/dropdown-menu";

export function UserNav() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex w-full cursor-pointer flex-row items-center gap-3">
					<Avatar className="h-10 w-10">
						<AvatarImage src="/avatars/01.png" alt="@EphraimDuncan_" />
						<AvatarFallback>ED</AvatarFallback>
					</Avatar>
					<div className="flex flex-col space-y-1 text-left">
						<p className="text-sm font-medium leading-none">Ephraim Duncan</p>
						<p className="text-xs leading-none text-muted-foreground">
							ephraim@duncan.com
						</p>
					</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Billing
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Settings
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>New Team</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
