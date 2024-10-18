import { Component, Index, For } from 'solid-js'
import { Button } from '~/components/ui/button'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '~/components/ui/alert-dialog'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/ui/card'
import { TextField, TextFieldInput, TextFieldTextArea, TextFieldLabel } from '~/components/ui/text-field'
import { RadioGroup, RadioGroupItem, RadioGroupItemLabel } from '~/components/ui/radio-group'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Slider, SliderTrack, SliderFill, SliderThumb, SliderLabel, SliderValueLabel } from '~/components/ui/slider'

export type BlockVariant = 'short' | 'long' | 'radio' | 'checkbox' | 'dropdown' | 'slider' | 'radioGrid' | 'checkboxGrid'

export const EditBlock: Component<{ name: string; value: any; onBlur: any; onInput: any; variant: any; setVariant: any; header: string; description?: string; options?: any }> = (props) => {
	const blockVariants = [
		{ value: 'short', label: 'Short Answer' },
		{ value: 'long', label: 'Long Answer' },
		{ value: 'radio', label: 'Radio Select' },
		{ value: 'checkbox', label: 'Checkboxes' },
		{ value: 'dropdown', label: 'Dropdown Select' },
		{ value: 'slider', label: 'Slider' },
		{ value: 'radioGrid', label: 'Radio Select Grid' },
		{ value: 'checkboxGrid', label: 'Checkbox Grid' }
	]

	return (
		<Card class='w-[95%] lg:w-[512px]'>
			<CardHeader class='text-left'>
				<TextField name={props.name} value={props.value} onBlur={props.onBlur} onInput={props.onInput}>
					<TextFieldLabel>Question</TextFieldLabel>
					<TextFieldInput placeholder='Enter a question...' type='text' />
				</TextField>
				<TextField name={props.name} value={props.value} onBlur={props.onBlur} onInput={props.onInput}>
					<TextFieldLabel>Description</TextFieldLabel>
					<TextFieldTextArea placeholder='Enter a description...' />
				</TextField>
			</CardHeader>
			<CardContent>
				{props.variant() === 'radio' && (
					<RadioGroup name={props.name} onBlur={props.onBlur} onInput={props.onInput}>
						<Index each={props.options}>
							{(option, i) => (
								<RadioGroupItem value={option().value} id={`${props.name}-${i}`}>
									<RadioGroupItemLabel for={`${props.name}-${i}-input`}>{option().label}</RadioGroupItemLabel>
								</RadioGroupItem>
							)}
						</Index>
					</RadioGroup>
				)}
				{
					props.variant() === 'checkbox' && (
						<div class='flex flex-col gap-2'>
							<Index each={props.options}>
								{(option, i) => (
									<div class='items-top flex space-x-2'>
										<Checkbox name={props.name} value={props.value} id={`${props.name}-${i}`} />
										<Label for={`${props.name}-${i}-input`}>{option().label}</Label>
									</div>
								)}
							</Index>
						</div>
					) /* would need to make field mode array and wrap each checkbox in a field to fix */
				}
				{props.variant() === 'dropdown' && (
					<Select
						name={props.name}
						onBlur={props.onBlur}
						options={props.options}
						optionValue='value'
						optionTextValue='label'
						placeholder='Select an option...'
						itemComponent={(props) => <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>}
					>
						<SelectTrigger>
							<SelectValue>{props.value !== undefined && props.options.find((e: any) => e.value === props.value).label}</SelectValue>
						</SelectTrigger>
						<SelectContent />
					</Select>
				)}
				{props.variant() === 'slider' && (
					<Slider
						name={props.name}
						id={props.name}
						value={props.value}
						onBlur={props.onBlur}
						minValue={props.options.min.value}
						maxValue={props.options.max.value}
						defaultValue={[(props.options.min.value + props.options.max.value) / 2]}
						class='space-y-3'
					>
						<div class='flex w-full justify-between'>
							<SliderLabel for={`${props.name}-input`}>
								{props.options.min.value} - {props.options.max.value}
							</SliderLabel>
							<SliderValueLabel for={`${props.name}-input`} />
						</div>
						<SliderTrack>
							<SliderFill />
							<SliderThumb />
						</SliderTrack>
					</Slider>
				)}
				{props.variant() === 'radioGrid' && <Button>Radio Grid</Button>}
				{props.variant() === 'checkboxGrid' && <Button>Checkbox Grid</Button>}

				<Select
					value={props.variant()}
					onChange={(e) => props.setVariant(e.value)}
					options={blockVariants}
					optionValue='value'
					optionTextValue='label'
					class='w-[160px]'
					itemComponent={(props) => <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>}
				>
					<SelectTrigger>
						<SelectValue<string>>{blockVariants.find((e) => e.value === props.variant())!.label}</SelectValue>
					</SelectTrigger>
					<SelectContent />
				</Select>
			</CardContent>
		</Card>
	)
}
