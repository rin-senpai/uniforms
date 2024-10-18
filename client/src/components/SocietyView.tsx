import { For, splitProps } from 'solid-js'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'

import EventsView from './EventsView'
import { eventsListDefault } from './eventsTest'
import { NavigationMenu } from './ui/navigation-menu'
import { NavigationMenuItem } from '@kobalte/core/src/navigation-menu/navigation-menu-item.jsx'
import { NavigationMenuTrigger } from '@kobalte/core/src/navigation-menu/navigation-menu-trigger.jsx'
import { cn } from '~/lib/utils'

interface SocietyViewProps {}

export default function SocietyView(props: any) {
	const [local, others] = splitProps(props, ['class'])

	const numberOfOrgs = () => ('numberOfOrgs' in props ? props.numberOfOrgs : -1)

	let orgsList
	if (numberOfOrgs() != -1) {
		orgsList = () => ('orgs' in props ? props.orgs.slice(0, numberOfOrgs()) : [])
	} else {
		orgsList = () => ('orgs' in props ? props.orgs : [])
	}
	return (
		<div class={cn('flex flex-col p-4', local.class)} {...others}>
			<For each={orgsList()}>
				{(item) => (
					<Card class='m-2 h-64'>
						<CardContent class='grid grid-cols-2 pl-0'>
							<div class='flex flex-row'>
								<a href='/'>
									<img class='h-64 rounded-lg relative inset-y-0 left-0' src={item.imageUrl} />
								</a>
								<CardTitle class='justify-self-center'>{item.name}</CardTitle>
							</div>

							<EventsView events={eventsListDefault} numberOfEvents={2} displayDescription={false} class='h-5/6' compact={true} />
						</CardContent>
					</Card>
				)}
			</For>
		</div>
	)
}
