import { createSignal } from 'solid-js'
import { Button } from '~/components/ui/button'
import QRCode from 'qrcode'

const QRCodeGenerator = () => {
	const [qrCodeUrl, setQrCodeUrl] = createSignal('')

	const generateQRCode = async () => {
		const valueHolder = 'some-link or sth idk'
		try {
			const url = await QRCode.toDataURL(valueHolder)
			setQrCodeUrl(url)
		} catch (error) {
			console.error('Error generating QR code:', error)
		}
	}

	return (
		<div>
			<Button variant='destructive' onClick={generateQRCode}>
				View QR Code
			</Button>
			{qrCodeUrl() && (
				<div>
					<h3 class='font-bold'>Generated QR Code:</h3>
					<img class='mx-auto' src={qrCodeUrl()} alt='QR Code' />
				</div>
			)}
		</div>
	)
}

export default QRCodeGenerator
