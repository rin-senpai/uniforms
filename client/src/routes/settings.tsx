import { createSignal, For } from 'solid-js'
import { Button } from '../components/ui/button'
import { TextField, TextFieldInput } from '../components/ui/text-field'
import { Label } from '../components/ui/label'

const Settings = () => {
	const [field, setField] = createSignal('')
	return (
		<div class='flex flex-row w-full'>
			<div class='flex flex-col'>
				<div class='flex-col w-full'>
					<For each={['Account', 'Form AutoFill', 'Notification Triggers']}>
						{(elem) => (
							<div class='m-4'>
								<Button class='w-full' onclick={(e: Event) => setField(`${elem}`)}>
									{elem}
								</Button>
							</div>
						)}
					</For>
				</div>
				<div class='m-4'>
					<Button class='w-full' onclick={(e: Event) => setField('DeleteAcc')}>
						Delete Account
					</Button>
				</div>
				<div class='m-4'>
					<Button class='w-full'>Log out</Button>
				</div>
			</div>
			{field() == 'Account' ?
				<div class='flex flex-row flex-grow'>
					<div class='flex flex-col w-64 flex-grow p-3'>
						<p class='text-left p-4 bg-gray-100 m-4'>Email</p>
						<p class='text-left p-4 bg-gray-100 m-4'>Username</p>
						<p class='text-left p-4 bg-gray-100 m-4'>Password</p>
					</div>
				</div>
			: field() == 'Notification Triggers' ?
				<div class='flex flex-row flex-grow'>
					<div class='flex flex-col w-64 flex-grow p-3'>
						<Label class='text-left'>Add Trigger</Label>
						<TextField>
							<TextFieldInput type='text' />
						</TextField>
						<Label class='text-left my-3'>Active Triggers</Label>
						<For each={['Apple', 'Orange', 'Watermelon']}>{(elem) => <p class='my-2 w-full p-3 bg-gray-300 text-left rounded-xl'>{elem}</p>}</For>
					</div>
				</div>
			:	null}
		</div>
	)
}

export default Settings
