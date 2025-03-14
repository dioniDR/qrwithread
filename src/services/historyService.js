// Clave para almacenar el historial en localStorage
const HISTORY_KEY = 'qr_scan_history';

// Obtener el historial completo
export const getHistory = () => {
  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting scan history:', error);
    return [];
  }
};

// Añadir un nuevo elemento al historial
export const addToHistory = (scan) => {
  try {
    const history = getHistory();
    
    const newScan = {
      id: Date.now(),
      content: scan,
      timestamp: new Date().toISOString(),
      type: detectType(scan)
    };
    
    const updatedHistory = [newScan, ...history];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    
    return newScan;
  } catch (error) {
    console.error('Error adding scan to history:', error);
    return null;
  }
};

// Eliminar un elemento del historial
export const deleteFromHistory = (id) => {
  try {
    const history = getHistory();
    const updatedHistory = history.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    return true;
  } catch (error) {
    console.error('Error deleting scan from history:', error);
    return false;
  }
};

// Limpiar todo el historial
export const clearHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing scan history:', error);
    return false;
  }
};

// Detectar el tipo de contenido escaneado
const detectType = (content) => {
  if (content.startsWith('http://') || content.startsWith('https://')) {
    return 'url';
  } else if (content.includes('@') && content.includes('.')) {
    return 'email';
  } else if (/^\+?[\d\s()-]{8,}$/.test(content)) {
    return 'phone';
  } else {
    return 'text';
  }
};
