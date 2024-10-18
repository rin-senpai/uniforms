import { useLocation } from '@solidjs/router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'

import { Button } from '~/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

import { Resizable, ResizableHandle, ResizablePanel } from '~/components/ui/resizable'
import { buttonVariants } from './ui/button'
import { NavigationMenu, NavigationMenuContent, NavigationMenuDescription, NavigationMenuIcon, NavigationMenuItem, NavigationMenuLabel, NavigationMenuLink, NavigationMenuTrigger } from '~/components/ui/navigation-menu'

//flex flex-col items-center w-16 h-full overflow-hidden text-gray-400 bg-gray-900 rounded
// sidebar flex flex-shrink-0 transition-all bg-sky-800

export default function Nav(props: object) {
	const location = useLocation()
	const active = (path: string) => (path == location.pathname ? 'border-sky-600' : 'border-transparent hover:border-sky-600')
	const activeButton = (path: string) => (path === location.pathname ? 'default' : 'ghost')
	return (
		/*
		<NavigationMenu orientation={'vertical'} class='top-0 bottom-0 bg-red-800 h-screen sticky flex flex-col'>
			<NavigationMenuTrigger as="a" href="/" class={buttonVariants({variant: 'default'})}>
			Home
			</NavigationMenuTrigger>
			<NavigationMenuTrigger as="a" href="/about" class={buttonVariants({variant: 'ghost'})}>
			About
			</NavigationMenuTrigger>
		</NavigationMenu>
		*/

		/*
		<Button as='a' href='/' variant={`${activeButton('/')}`}>
				Home
			</Button>

			<Button as='a' href='/about' variant={`${activeButton('/about')}`}>
				About
			</Button>
		*/

		<NavigationMenu orientation='vertical' class='flex flex-col items-stretch space-y-2 w-64 p-4 top-0 bottom-0 h-screen sticky border-r-2 align-center'>
			<NavigationMenuItem>
				<NavigationMenuTrigger as='a' href='/' class={`${buttonVariants({ variant: activeButton('/') })}`}>
					Home
				</NavigationMenuTrigger>
			</NavigationMenuItem>

			<NavigationMenuItem>
				<NavigationMenuTrigger as='a' href='/about' class={buttonVariants({ variant: activeButton('/about') })}>
					About
				</NavigationMenuTrigger>
			</NavigationMenuItem>

			<NavigationMenuItem>
				<NavigationMenuTrigger as='a' href='/events' class={buttonVariants({ variant: activeButton('/events') })}>
					Events
				</NavigationMenuTrigger>
			</NavigationMenuItem>

			<NavigationMenuItem>
				<NavigationMenuTrigger as='a' href='/orgs' class={buttonVariants({ variant: activeButton('/orgs') })}>
					Organisations
				</NavigationMenuTrigger>
			</NavigationMenuItem>

			<NavigationMenuItem>
				<NavigationMenuTrigger as='a' href='/settings' class='absolute inset-x-0 bottom-6 border-0'>
					<Card class='justify-start border-0'>
						<CardHeader class='flex flex-row space-x-3 self-start'>
							<Avatar>
								<AvatarImage src='https://avatars.githubusercontent.com/u/31785428?v=4' />
								<AvatarFallback>RN</AvatarFallback>
							</Avatar>
							<div>
								<CardTitle>Username</CardTitle>
								<CardDescription>placeholder@raoli.moe</CardDescription>
							</div>
						</CardHeader>
					</Card>
				</NavigationMenuTrigger>
			</NavigationMenuItem>
		</NavigationMenu>
	)
}
