// QRCodeGenerator.tsx
import { createSignal } from 'solid-js';
import { Button } from '~/components/ui/button';
import { generateQRCode } from '~/lib/utils'; 
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";

const QRCodeGenerator = () => {
  const [qrCodeUrl, setQrCodeUrl] = createSignal('');
  const [isModalOpen, setIsModalOpen] = createSignal(false);
  const [includeLink, setIncludedLink] = createSignal(false);
  const predefinedValue = 'https://example.com';

  const handleGenerateQRCode = async () => {
    try {
      const url = await generateQRCode(predefinedValue); 
      setQrCodeUrl(url);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handleOpenQRCodeInNewTab = () => {
    const newTab = window.open('', '_blank');
    if (newTab) {
      newTab.document.write(`
        <html>
          <head>
            <title>QR Code</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
              img { margin-bottom: 20px; }
              a { display: block; color: blue; font-size: 18px; text-decoration: underline; margin-top: 10px; }
            </style>
          </head>
          <body>
            <h1>Generated QR Code</h1>
            <img src="${qrCodeUrl()}" alt="QR Code" />
            ${includeLink() ? `<a href="${predefinedValue}" target="_blank">${predefinedValue}</a>` : ''}
          </body>
        </html>
      `);
      newTab.document.close();
    }
  };

  return (
    <div class="text-center">
      <Button variant="destructive" onClick={handleGenerateQRCode}>
        View QR Code
      </Button>

      {isModalOpen() && qrCodeUrl() && (
        <div class="fixed inset-0 flex items-center justify-center z-50 bg-opacity-75">
          <div class="bg-white p-6 rounded-lg shadow-lg relative">
            <Button
              class="absolute top-2 right-2 focus:outline-none"
              style={{ outline: 'none'}}
              onClick={() => setIsModalOpen(false)}
            >
              &#10005;
            </Button>

            <h3 class="font-bold">Generated QR Code:</h3>
            <img src={qrCodeUrl()} alt="QR Code" class="mx-auto mt-2" />
            <div class="mt-4 flex justify-between">
              <Button variant="default" onClick={handleOpenQRCodeInNewTab}>
                Open QR Code in New Tab
              </Button>

              <div class="mt-4 items-top flex justify-center space-x-2">
                <Checkbox
                  id="include-link"
                  checked={includeLink()}
                  onChange={(setIncludedLink)}
                />
                <div class="grid gap-1.5 leading-none">
                  <Label for="include-link">Include form's link</Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
