import { useState, useEffect } from 'react';
import { getHistory, deleteFromHistory, clearHistory } from '../services/historyService';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
  
  useEffect(() => {
    const scanHistory = getHistory();
    setHistory(scanHistory);
  }, []);
  
  const handleDelete = (id) => {
    if (deleteFromHistory(id)) {
      setHistory(history.filter(item => item.id !== id));
    }
  };
  
  const handleClearHistory = () => {
    if (clearHistory()) {
      setHistory([]);
      setIsConfirmingClear(false);
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  const renderIcon = (type) => {
    switch (type) {
      case 'url':
        return '🔗';
      case 'email':
        return '✉️';
      case 'phone':
        return '📞';
      default:
        return '📝';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Scan History</h1>
        
        {history.length > 0 && !isConfirmingClear ? (
          <button
            onClick={() => setIsConfirmingClear(true)}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
          >
            Clear History
          </button>
        ) : isConfirmingClear ? (
          <div className="flex space-x-2">
            <button
              onClick={handleClearHistory}
              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
            >
              Confirm
            </button>
            <button
              onClick={() => setIsConfirmingClear(false)}
              className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
          </div>
        ) : null}
      </div>
      
      {history.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No scan history yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{renderIcon(item.type)}</div>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-medium truncate">{item.content}</p>
                    <p className="text-sm text-gray-500">{formatDate(item.timestamp)}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
