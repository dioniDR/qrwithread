import { useState, useEffect } from 'react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    autoSave: true,
    beepOnScan: true,
    vibrateOnScan: true,
  });
  
  useEffect(() => {
    // Cargar configuraciones del localStorage
    const savedSettings = localStorage.getItem('qr_app_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);
  
  const handleToggle = (setting) => {
    const updatedSettings = {
      ...settings,
      [setting]: !settings[setting]
    };
    
    setSettings(updatedSettings);
    localStorage.setItem('qr_app_settings', JSON.stringify(updatedSettings));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Settings</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-lg">Dark Mode</h3>
              <p className="text-gray-500 text-sm">Switch between light and dark themes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.darkMode}
                onChange={() => handleToggle('darkMode')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-lg">Auto Save Scans</h3>
              <p className="text-gray-500 text-sm">Automatically save scans to history</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.autoSave}
                onChange={() => handleToggle('autoSave')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-lg">Beep on Scan</h3>
              <p className="text-gray-500 text-sm">Play a sound when a QR code is scanned</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.beepOnScan}
                onChange={() => handleToggle('beepOnScan')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-lg">Vibrate on Scan</h3>
              <p className="text-gray-500 text-sm">Vibrate when a QR code is scanned</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings.vibrateOnScan}
                onChange={() => handleToggle('vibrateOnScan')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="pt-4 border-t">
            <button 
              onClick={() => {
                const defaultSettings = {
                  darkMode: false,
                  autoSave: true,
                  beepOnScan: true,
                  vibrateOnScan: true,
                };
                setSettings(defaultSettings);
                localStorage.setItem('qr_app_settings', JSON.stringify(defaultSettings));
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
