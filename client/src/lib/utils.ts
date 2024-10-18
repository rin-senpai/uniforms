import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import QRCode from 'qrcode'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export async function generateQRCode(valueHolder: string): Promise<string> {
	try {
		const url = await QRCode.toDataURL(valueHolder, { width: 512 })
		return url
	} catch (error) {
		console.error('Error generating QR Code:', error)
		throw error
	}
}
