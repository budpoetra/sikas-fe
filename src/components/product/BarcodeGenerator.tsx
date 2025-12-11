import { useRef, useState } from 'react';
import Barcode from 'react-barcode';
import Button from "../../components/ui/button/Button";
import html2canvas from 'html2canvas'; // Install: npm install html2canvas

interface BarcodeGeneratorProps {
  barcodeValue: string | undefined;
  // productName?: string;
  productCode?: string;
  buttonText?: string;
}

export default function BarcodeGenerator({ 
  barcodeValue, 
  // productName = '', 
  productCode = '', 
  buttonText = 'Generate Barcode'
}: BarcodeGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const barcodeRef = useRef<HTMLDivElement>(null);

  const generateAndDownloadBarcode = async () => {
    if (!barcodeValue) {
      alert("No barcode value provided");
      return;
    }

    setIsGenerating(true);

    try {
      // Gunakan html2canvas untuk capture elemen yang sudah dirender
      if (barcodeRef.current) {
        const canvas = await html2canvas(barcodeRef.current, {
          scale: 2, // untuk kualitas lebih tinggi
          backgroundColor: null,
          useCORS: true
        });
        
        // Konversi canvas ke data URL
        const dataUrl = canvas.toDataURL('image/png');
        
        // Buat nama file
        const fileName = `barcode-${productCode || 'product'}-${barcodeValue}.png`;
        
        // Buat link download
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = fileName;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error('Error generating barcode:', err);
      alert("Failed to generate barcode");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* Barcode container - selalu dirender tapi hidden */}
      <div 
        ref={barcodeRef} 
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          top: '-9999px',
          padding: '20px',
          background: 'white' // Background putih untuk barcode
        }}
      >
        {/* Informasi produk (opsional) */}
        {/* {productName && (
          <div style={{ textAlign: 'center', marginBottom: '10px', fontSize: '14px' }}>
            {productName}
          </div>
        )} */}
        
        {/* Barcode selalu dirender */}
        {barcodeValue && (
          <Barcode
            value={barcodeValue}
            width={2}
            height={100}
            displayValue={true}
            format="CODE128"
            fontSize={16}
            background="white"
            lineColor="#000000"
          />
        )}
        
        {/* Product code (opsional) */}
        {/* {productCode && (
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '12px' }}>
            Code: {productCode}
          </div>
        )} */}
      </div>

      <Button
        size="sm"
        variant="outline"
        onClick={generateAndDownloadBarcode}
        disabled={isGenerating || !barcodeValue}
        className="text-blue-600 hover:text-blue-700"
      >
        {isGenerating ? 'Generating...' : buttonText}
      </Button>
    </>
  );
}