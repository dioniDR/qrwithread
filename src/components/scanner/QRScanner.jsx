import { useState, useRef } from 'react';
import { QrReader } from 'react-qr-reader';

const QRScanner = ({ onScan }) => {
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(true);
  
  const handleScan = (result) => {
    if (result) {
      setScanning(false);
      onScan(result?.text);
    }
  };

  const handleError = (error) => {
    console.error(error);
    setError('Error accessing camera. Please make sure you have given permission.');
  };

  const startScanAgain = () => {
    setScanning(true);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        {scanning ? (
          <QrReader
            constraints={{ facingMode: 'environment' }}
            onResult={handleScan}
            className="w-full"
            scanDelay={300}
            videoId="qr-video"
            onError={handleError}
          />
        ) : (
          <div className="bg-gray-100 p-4 text-center">
            <p className="mb-4 text-xl">QR scanned successfully!</p>
            <button
              onClick={startScanAgain}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Scan Again
            </button>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default QRScanner;
