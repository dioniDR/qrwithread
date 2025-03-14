import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Layout from './components/layout/Layout';
import ScannerPage from './pages/ScannerPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ScannerPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
      
      <Toaster position="bottom-center" toastOptions={{
        duration: 3000,
        style: {
          background: '#333',
          color: '#fff',
        },
      }} />
    </Router>
  );
}

export default App;
