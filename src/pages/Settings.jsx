import React from 'react';
import { Settings as SettingsIcon, Database, RefreshCw } from 'lucide-react';
import { useHealthData } from '../context/HealthDataContext';

const Settings = () => {
  const { refreshData } = useHealthData();

  const handleRefresh = async () => {
    try {
      await refreshData();
      alert('Data refreshed successfully');
    } catch (error) {
      alert('Failed to refresh data');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <Database className="w-6 h-6 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900">Data Management</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Manage your health data stored in Firebase Firestore.
        </p>
        <button
          onClick={handleRefresh}
          className="btn-primary flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Data</span>
        </button>
      </div>

      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <SettingsIcon className="w-6 h-6 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900">Application Info</h2>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>Version:</strong> 1.0.0</p>
          <p><strong>Tech Stack:</strong> React 18, Vite, Tailwind CSS, Firebase</p>
          <p><strong>Features:</strong> Health metrics tracking, Medication management, Lab results</p>
        </div>
      </div>

      <div className="card bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">About This Dashboard</h3>
        <p className="text-sm text-blue-800">
          This is a personal health tracking dashboard designed to help you monitor your health metrics,
          manage medications, and track lab results. All data is stored securely in Firebase Firestore.
        </p>
      </div>
    </div>
  );
};

export default Settings;
