import { useState, useEffect } from 'react';

const ScanResult = ({ result, onScanAgain }) => {
  const [resultType, setResultType] = useState('text');
  
  useEffect(() => {
    // Intentar determinar el tipo de resultado
    if (result) {
      if (result.startsWith('http://') || result.startsWith('https://')) {
        setResultType('url');
      } else if (result.includes('@') && result.includes('.')) {
        setResultType('email');
      } else if (/^\+?[\d\s()-]{8,}$/.test(result)) {
        setResultType('phone');
      } else {
        setResultType('text');
      }
    }
  }, [result]);

  const renderContent = () => {
    switch (resultType) {
      case 'url':
        return (
          <div>
            <p className="mb-2 font-medium">Website URL:</p>
            <a 
              href={result}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline break-all"
            >
              {result}
            </a>
          </div>
        );
        
      case 'email':
        return (
          <div>
            <p className="mb-2 font-medium">Email Address:</p>
            <a 
              href={`mailto:${result}`}
              className="text-primary-600 hover:underline break-all"
            >
              {result}
            </a>
          </div>
        );
        
      case 'phone':
        return (
          <div>
            <p className="mb-2 font-medium">Phone Number:</p>
            <a 
              href={`tel:${result}`}
              className="text-primary-600 hover:underline break-all"
            >
              {result}
            </a>
          </div>
        );
        
      default:
        return (
          <div>
            <p className="mb-2 font-medium">Text:</p>
            <p className="break-all">{result}</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Scan Result</h2>
      
      <div className="mb-6">
        {renderContent()}
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={onScanAgain}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Scan Again
        </button>
        
        <button
          onClick={() => {
            navigator.clipboard.writeText(result);
            alert('Copied to clipboard!');
          }}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default ScanResult;
