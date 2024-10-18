import SocietyView from '~/components/SocietyView'
import { boulderingURI, skullimgURI } from '~/components/URItest'
import { createQuery, QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'
import { Show, Suspense } from 'solid-js'
import { useNavigate, useParams } from '@solidjs/router'

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
    	refetchOnMount: true, // Refetch when the component mounts
	}))
	return (
		<Suspense fallback={'Loading...'}>
			<div class='w-full m-5'>
				<div class='*:rounded-lg relative'>
					<img class='object-contain' src={query.data?.bannerURI} />
					<div class='absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30'></div>
					<h2 class='absolute inset-x-0 bottom-5 text-white text-sm lg:text-lg'>{query.data?.name}</h2>
				</div>
			</div>
		</Suspense>
	)
}
