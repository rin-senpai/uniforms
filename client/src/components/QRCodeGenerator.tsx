// QRCodeGenerator.tsx
import { createSignal } from 'solid-js'
import { Button } from '~/components/ui/button'
import { generateQRCode } from '~/lib/utils'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '~/components/ui/alert-dialog'

const QRCodeGenerator = () => {
	const [qrCodeUrl, setQrCodeUrl] = createSignal('')
	const [isModalOpen, setIsModalOpen] = createSignal(false)
	const [includeLink, setIncludedLink] = createSignal(false)
	const predefinedValue = 'https://example.com'

	const handleGenerateQRCode = async () => {
		try {
			const url = await generateQRCode(predefinedValue)
			setQrCodeUrl(url)
			setIsModalOpen(true)
		} catch (error) {
			console.error('Error generating QR code:', error)
		}
	}

	const handleOpenQRCodeInNewTab = () => {
		const newTab = window.open('', '_blank')
		if (newTab) {
			newTab.document.write(`
        <html>
          <head>
            <title>QR Code</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
              img { margin-bottom: 20px; }
              a { display: block; color: blue; font-size: 18px; text-decoration: underline; margin-top: 10px; }
			  button { margin-top: 20px; }
            </style>
          </head>
          <body>
            <h1>Generated QR Code</h1>
            <img src="${qrCodeUrl()}" alt="QR Code" />
            <a href="${predefinedValue}" target="_blank">${predefinedValue}</a>
          </body>
        </html>
      `)
			newTab.document.close()
		}
	}

	return (
		<div class='text-center'>
			<Button variant='destructive' onClick={handleGenerateQRCode}>
				View QR Code
			</Button>

			<AlertDialog open={isModalOpen()} onOpenChange={setIsModalOpen}>
				<AlertDialogTrigger></AlertDialogTrigger>

				<AlertDialogContent>
					<AlertDialogTitle class='justify-between text-center'>Generated QR Code:</AlertDialogTitle>
					<div class='flex flex-col items-center'>
						<img src={qrCodeUrl()} alt='QR Code' class='mx-auto mt-2' />
						<div class='flex flex-row gap-6'>
							<Button class='flex text-center mt-4' variant='default' onClick={handleOpenQRCodeInNewTab}>
								Open QR Code in New Tab
							</Button>

							<Button
								class='mt-4'
								variant='default'
								onClick={() => {
									navigator.clipboard
										.writeText(predefinedValue)
										.then(() => {
											alert('Link copied to clipboard!')
										})
										.catch((error) => {
											console.error('Error copying link:', error)
										})
								}}
							>
								Copy Link
							</Button>
						</div>
					</div>
					<AlertDialogDescription>
						<div class='mt-4 flex justify-between'>
							{/* Checkbox for including link - currently commented out 
							<div class='mt-4 items-top flex justify-center space-x-2'>
								<Checkbox id='include-link' checked={includeLink()} onChange={setIncludedLink} />
								<div class='grid gap-1.5 leading-none'>
									<Label for='include-link'>Include form's link</Label>
								</div>
							</div> */}
						</div>
					</AlertDialogDescription>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}

export default QRCodeGenerator
