import SocietyView from '~/components/SocietyView'
import { boulderingURI, skullimgURI } from '~/components/URItest'
import { createQuery, QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'
import { createSignal, onMount, Show, Suspense } from 'solid-js'
import { useNavigate, useParams } from '@solidjs/router'
import { Button } from '~/components/ui/button'
import { showToast, Toaster } from '~/components/ui/toast'
import EventsView from '~/components/EventsView'
import { eventsListDefault } from '~/components/eventsTest'
import { Separator } from '~/components/ui/separator'

const url = 'localhost'
const dev_port = 60000
const SERVER_URL = `${url}:${dev_port}`

const queryClient = new QueryClient()

export default function IndividualOrgs() {
	return (
		<QueryClientProvider client={queryClient}>
			<IndividualOrgsQuery />
			<SolidQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

function IndividualOrgsQuery() {
	const navigate = useNavigate()
	const params = useParams()

	const [isEdited, setIsEdited] = createSignal(false)

	// Check local storage on mount to set the initial state
	onMount(() => {
		const savedVisibility = localStorage.getItem('organisationEdited')
		if (savedVisibility === 'true') {
			showToast({ title: 'Wahoo!', description: 'Successfully edited the society', variant: 'success' })
			setIsEdited(false)
			localStorage.setItem('organisationEdited', JSON.stringify(isEdited()))
		}
	})

	const query = createQuery(() => ({
		queryKey: ['data'],
		queryFn: async () => {
			const response = await fetch(`http://${SERVER_URL}/orgs/${params.id}`, {
				method: 'GET'
			})

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`)
			}

			const body = await response.json()

			return {
				name: body.organisation.name,
				description: body.organisation.description,
				avatarURI: body.organisation.avatarURI,
				bannerURI: body.organisation.bannerURI
			}
		},
		refetchOnWindowFocus: true, // Refetch when window gains focus
		refetchOnMount: true // Refetch when the component mounts
	}))
	return (
		<Suspense fallback={'Loading...'}>
			<div class='w-full m-5 flex flex-col gap-4'>
				<div class='*:rounded-xl relative'>
					<img class='object-contain w-full h-auto' src={query.data?.bannerURI} />
					<div class='object-contain absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30'></div>
					<h2 class='absolute inset-x-5 bottom-5 text-white text-sm lg:text-6xl font-bold'>{query.data?.name}</h2>
				</div>

				<div class='w-full flex flex-row gap-4'>
					<p class='w-3/4'>{query.data?.description}</p>
					<div class='flex flex-col gap-4 w-1/4'>
						<Button class='w-full' as='a' href='/events/new'>
							Create a new event
						</Button>
						<Button class='w-full' as='a' href={`/orgs/${params.id}/edit`}>
							Edit this society
						</Button>
					</div>
				</div>

				<Separator/>
				<div class='flex flex-col w-full'>
					<h2 class='text-lg font-bold'>All events</h2>
					<EventsView events={eventsListDefault}/>
				</div>
				
			</div>
			<Toaster />
		</Suspense>
	)
}
