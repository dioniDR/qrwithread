import { useState } from 'react';
import QRScanner from '../components/scanner/QRScanner';
import ScanResult from '../components/scanner/ScanResult';
import { addToHistory } from '../services/historyService';

const ScannerPage = () => {
  const [scanResult, setScanResult] = useState(null);
  
  const handleScan = (result) => {
    if (result) {
      setScanResult(result);
      // Guardar en historial
      addToHistory(result);
    }
  };
  
  const handleScanAgain = () => {
    setScanResult(null);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">QR Code Scanner</h1>
      
      {!scanResult ? (
        <>
          <p className="text-center mb-6 text-gray-600">
            Position the QR code within the frame to scan it
          </p>
          <QRScanner onScan={handleScan} />
        </>
      ) : (
        <ScanResult result={scanResult} onScanAgain={handleScanAgain} />
      )}
    </div>
  );
};

export default ScannerPage;
