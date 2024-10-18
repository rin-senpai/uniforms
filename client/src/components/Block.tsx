import { Component, Index } from 'solid-js'
import { Button } from '~/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/ui/card'
import { TextField, TextFieldInput, TextFieldTextArea } from '~/components/ui/text-field'
import { RadioGroup, RadioGroupItem, RadioGroupItemLabel } from '~/components/ui/radio-group'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Slider, SliderTrack, SliderFill, SliderThumb, SliderLabel, SliderValueLabel } from '~/components/ui/slider'

export type BlockVariant = 'short' | 'long' | 'radio' | 'checkbox' | 'dropdown' | 'slider' | 'radioGrid' | 'checkboxGrid'

export const Block: Component<{ name: string; value: any; onBlur: any; onInput: any; onChange: any; type: BlockVariant; header: string; description?: string; options?: any }> = (props) => {
	return (
		<Card class='w-[95%] lg:w-[512px]'>
			<CardHeader>
				<CardTitle class='text-left'>{props.header}</CardTitle>
				{props.description && <CardDescription class='text-left'>{props.description}</CardDescription>}
			</CardHeader>
			<CardContent>
				{props.type === 'short' && (
					<TextField name={props.name} value={props.value} onBlur={props.onBlur} onInput={props.onInput}>
						<TextFieldInput type='text' />
					</TextField>
				)}
				{props.type === 'long' && (
					<TextField name={props.name} value={props.value} onBlur={props.onBlur} onInput={props.onInput}>
						<TextFieldTextArea />
					</TextField>
				)}
				{props.type === 'radio' && (
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
					props.type === 'checkbox' && (
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
				{props.type === 'dropdown' && (
					<Select
						name={props.name}
						onBlur={props.onBlur}
						onChange={props.onChange}
						options={props.options}
						optionValue='value'
						optionTextValue='label'
						placeholder='Select an option...'
						itemComponent={(props) => <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>}
					>
						<SelectTrigger>
							<SelectValue>{props.value !== undefined && props.value?.label}</SelectValue>
						</SelectTrigger>
						<SelectContent />
					</Select>
				)}
				{props.type === 'slider' && (
					<Slider
						name={props.name}
						id={props.name}
						value={props.value}
						onBlur={props.onBlur}
						onChange={props.onChange}
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
				{props.type === 'radioGrid' && <Button>Radio Grid</Button>}
				{props.type === 'checkboxGrid' && <Button>Checkbox Grid</Button>}
			</CardContent>
		</Card>
	)
}
