import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HealthDataProvider } from './context/HealthDataContext';
import { LayoutDashboard, Pill, FileText, Settings as SettingsIcon } from 'lucide-react';

// Pages
import Dashboard from './pages/Dashboard';
import Medications from './pages/Medications';
import Labs from './pages/Labs';
import Settings from './pages/Settings';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/medications', icon: Pill, label: 'Medications' },
    { path: '/labs', icon: FileText, label: 'Lab Results' },
    { path: '/settings', icon: SettingsIcon, label: 'Settings' }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Health Dashboard</span>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive(path)
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <BrowserRouter>
      <HealthDataProvider>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/medications" element={<Medications />} />
              <Route path="/labs" element={<Labs />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>

          <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <p className="text-center text-sm text-gray-600">
                Patient Health Dashboard &copy; 2026. Built by Tobilola Ogunbowale
              </p>
            </div>
          </footer>
        </div>
      </HealthDataProvider>
    </BrowserRouter>
  );
}

export default App;
