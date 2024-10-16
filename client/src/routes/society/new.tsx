import { Button } from "~/components/ui/button";
import { TextField, TextFieldErrorMessage, TextFieldInput, TextFieldLabel, TextFieldTextArea } from "~/components/ui/text-field"
import { createSignal, Show, } from "solid-js";
import { Organisation } from '../../../../server/src/interface'
import { createForm } from "@tanstack/solid-form";
import { useNavigate } from "@solidjs/router";

const url = 'localhost'
const dev_port = 60000
const SERVER_URL = `${url}:${dev_port}`

export default function New() {
	const navigate = useNavigate();

	const form = createForm(() => ({
		defaultValues: {
			name: '',
			description: '',
			avatar: '',
			banner: '',
		},

		onSubmit: async ({value}) => {
			const response = await fetch(`http://${SERVER_URL}/admin/orgs`, {
				method: "POST",
				body: JSON.stringify({ 
					token: 'a', 
					name: value.name, 
					description: value.description, 
					avatarURI: value.avatar,
					bannerURI: value.banner
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const body = JSON.parse(await response.json())

			navigate(`/society/${body.orgId}/edit`, { replace: true })
		}
	}));

	const onAvatarUpload = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				form.setFieldValue("avatar", reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	}

	const onBannerUpload = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file) {
		const reader = new FileReader();
			reader.onloadend = () => {
				form.setFieldValue("banner", reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	}

	return (<>
		<form onSubmit={(e) => {
			e.preventDefault()
			e.stopPropagation()
		}}>
			<form.Field 
				name='name'
				validators={{
					onChangeAsync: async ({value}) => value === "" ? "Please enter a name!" : undefined
				}} 
				children={(field) => (
					<TextField 
					name={field().name} 
					onInput={(e) => field().handleChange(e.target.value)}
					validationState={field().state.value == "" ? "invalid" : "valid"}>
						<TextFieldLabel>Name</TextFieldLabel>
						<TextFieldInput type='text' name={field().name}/>
						<Show when={field().state.meta.errors}>
							<TextFieldErrorMessage> {field().state.meta.errors}</TextFieldErrorMessage>
						</Show>
						
					</TextField>
				)}
			/>
			
			<form.Field
				name='description'
				validators={{
					onChangeAsync: async ({value}) => value === "" ? "Please enter a description!" : undefined
				}} 
				children={(field) => (
					<TextField 
					name={field().name}
					onInput={(e) => field().handleChange(e.target.value)}
					validationState={field().state.value == "" ? "invalid" : "valid"}>
						<TextFieldLabel>Description</TextFieldLabel>
						<TextFieldTextArea name={field().name} autoResize/>
						<Show when={field().state.meta.errors}>
							<TextFieldErrorMessage> {field().state.meta.errors}</TextFieldErrorMessage>
						</Show>
					</TextField>
				)}
			/>
			

			<form.Field 
				name='avatar'
				validators={{
					onChangeAsync: async ({value}) => value === "" ? "Please upload a society avatar!" : undefined
				}} 
				children={(field) => (<>
					<TextField 
					name={field().name} 
					validationState={field().state.value == "" ? "invalid" : "valid"}
					class='gap-4'>
						<TextFieldLabel>Avatar</TextFieldLabel>
						<input name={field().name} type="file" accept="image/*" onChange={onAvatarUpload}/>
						<Show when={field().state.meta.errors}>
							<TextFieldErrorMessage> {field().state.meta.errors}</TextFieldErrorMessage>
						</Show>
					</TextField>
					<img src={field().state.value} class='rounded-lg h-60'/>
					</>
				)}
			/>
			
			<form.Field 
				name='banner'
				validators={{
					onChangeAsync: async ({value}) => value === "" ? "Please upload a society banner!" : undefined
				}} 
				children={(field) => (<>
					<TextField 
					name={field().name} 
					validationState={field().state.value == "" ? "invalid" : "valid"}
					class='gap-4'>
						<TextFieldLabel>Banner</TextFieldLabel>
						<input name={field().name} type="file" accept="image/*" onChange={onBannerUpload}/>
						<Show when={field().state.meta.errors}>
							<TextFieldErrorMessage> {field().state.meta.errors}</TextFieldErrorMessage>
						</Show>
					</TextField>
					<img src={field().state.value} class='rounded-lg h-60'/>
					</>
				)}
			/>
			

			{/* <TextField class='gap-4'>
				<TextFieldLabel>Banner</TextFieldLabel>

				<input type="file" accept="image/*" onChange={onBannerUpload}/>
			</TextField>

			<img src={banner()} class='rounded-lg h-60'/> */}

		</form>
			<div>
				<Button type="reset">Reset</Button>
				<Button onClick={form.handleSubmit}>Submit</Button>
			</div>
	</>)
}
