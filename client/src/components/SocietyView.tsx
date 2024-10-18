import { For, splitProps } from 'solid-js'
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from './ui/card'
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
					<Card class='flex-1 m-2'>
						<a href={`/orgs/${item.id}`}>
							<CardContent class='grid grid-cols-2 p-2'>
								<div class='flex flex-row'>
									<div class='flex items-center'>
										<img class='h-48 rounded-lg relative inset-y-0 left-0' src={item.avatarURI} />
									</div>
									<div class='flex-1'>
										<div class='justify-self-center'>
											<CardHeader>{item.name}</CardHeader>
											<CardDescription class='justify-center mx-6 gap-4'>{item.description}</CardDescription>
										</div>
									</div>
								</div>
								<div class='text-center'>
									<EventsView events={eventsListDefault} numberOfEvents={3} displayDescription={false} class='h-5/6' compact={true} />
								</div>
							</CardContent>
						</a>
					</Card>
				)}
			</For>
		</div>
	)
}
