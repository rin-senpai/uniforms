import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import Nav from '~/components/Nav'
import { Toaster } from '~/components/ui/sonner'
import './app.css'
import { Separator } from './components/ui/separator'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'

export default function App() {
	return (
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
	)
}
