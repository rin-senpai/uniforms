import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import Nav from '~/components/Nav'
import { Toaster } from '~/components/ui/sonner'
import './app.css'
import { Separator } from './components/ui/separator'
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'

export default function App() {
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<Router
				root={(props) => (
					<div class='flex flex-row'>
						<Nav />
						<Separator orientation='vertical' class='my-4' />
						<Suspense>{props.children}</Suspense>
						<Toaster />
					</div>
				)}
			>
				<FileRoutes />
			</Router>
		</QueryClientProvider>
	)
}
