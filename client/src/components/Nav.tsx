import { useLocation } from '@solidjs/router'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIcon,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
	NavigationMenuLabel,
	NavigationMenuDescription
  } from "~/components/ui/navigation-menu"

import { Button } from "~/components/ui/button"

import { Resizable, ResizableHandle, ResizablePanel } from "~/components/ui/resizable"
import { buttonVariants } from './ui/button'


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
		
		<nav class='w-64 top-0 bottom-0 bg-red-800 h-screen sticky flex flex-row'>
			<Button as='a' href='/' variant={`${activeButton('/')}`}>
				Home
			</Button>
			
			<Button as='a' href='/about' variant={`${activeButton('/about')}`}>
				About
			</Button>
		</nav> 
		
	)
}
