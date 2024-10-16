import { For } from 'solid-js'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'
import { boulderingURI, skullimgURI } from './URItest'
import EventsView from './EventsView'
import { eventsListDefault } from './eventsTest'
import { NavigationMenu } from './ui/navigation-menu'
import { NavigationMenuItem } from '@kobalte/core/src/navigation-menu/navigation-menu-item.jsx'
import { NavigationMenuTrigger } from '@kobalte/core/src/navigation-menu/navigation-menu-trigger.jsx'

interface SocietyViewProps {}

interface Society {
	name: string
	imageUrl: string
}

const societies: Society[] = [
	{
		name: 'AnimeUNSW',
		imageUrl: boulderingURI
	},
	{
		name: 'CSESoc',
		imageUrl: skullimgURI
	},
	{
		name: 'DevSoc',
		imageUrl: skullimgURI
	}
]

export default function SocietyView(props: object) {
	return (
		<div class='flex flex-col p-4'>
			<For each={societies}>
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
