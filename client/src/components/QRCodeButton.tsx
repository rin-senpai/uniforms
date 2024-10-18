import { Component, createSignal } from 'solid-js'
import { Button } from '~/components/ui/button'
import { generateQRCode } from '~/lib/utils'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { toast } from 'solid-sonner'
import QrCode from 'lucide-solid/icons/qr-code'

const QRCodeButton: Component<{ link: string }> = (props) => {
	const [qrCodeUrl, setQrCodeUrl] = createSignal('')
	const link = () => props.link

	const handleOpenQRCodeInNewTab = () => {
		const newTab = window.open('', '_blank')
		if (newTab) {
			{
				/* Note that this will be replaced with an actual page so  */
			}
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
            <a href="${link()}" target="_blank">${link()}</a>
          </body>
        </html>
      `)
			newTab.document.close()
		}
	}

	return (
		<Dialog>
			<DialogTrigger as={Button<'button'>} onClick={async () => setQrCodeUrl(await generateQRCode(link()))}>
				<QrCode />
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>QR Code</DialogTitle>
				</DialogHeader>
				<img src={qrCodeUrl()} alt='QR Code' class='mx-auto' />
				<DialogFooter>
					<Button
						class='mt-4'
						variant='secondary'
						onClick={() => {
							navigator.clipboard
								.writeText(link())
								.then(() => {
									toast('Link copied to clipboard!')
								})
								.catch(() => {
									toast('There was an error in copying link!')
								})
						}}
					>
						Copy Link
					</Button>
					<div class='flex flex-row gap-6'>
						<Button class='flex text-center mt-4' variant='default' onClick={handleOpenQRCodeInNewTab}>
							Open in New Tab
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default QRCodeButton
