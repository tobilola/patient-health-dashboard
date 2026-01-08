import React, { useState } from 'react';
import { FileText, Trash2 } from 'lucide-react';
import { useHealthData } from '../context/HealthDataContext';

const Labs = () => {
  const { labs, addLab, deleteLab } = useHealthData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    testName: '',
    value: '',
    unit: '',
    referenceRange: '',
    date: new Date().toISOString().split('T')[0],
    status: 'normal'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addLab(formData);
      setShowAddForm(false);
      setFormData({
        testName: '',
        value: '',
        unit: '',
        referenceRange: '',
        date: new Date().toISOString().split('T')[0],
        status: 'normal'
      });
    } catch (error) {
      alert('Failed to add lab result');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lab result?')) {
      try {
        await deleteLab(id);
      } catch (error) {
        alert('Failed to delete lab result');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'low':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Lab Results</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary"
        >
          {showAddForm ? 'Cancel' : 'Add Lab Result'}
        </button>
      </div>

      {showAddForm && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Lab Result</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Name</label>
                <input
                  type="text"
                  value={formData.testName}
                  onChange={(e) => setFormData({ ...formData, testName: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Hemoglobin A1C"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <input
                  type="text"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., 5.7"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., %"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reference Range</label>
                <input
                  type="text"
                  value={formData.referenceRange}
                  onChange={(e) => setFormData({ ...formData, referenceRange: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., 4.0-5.6"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full">
              Add Lab Result
            </button>
          </form>
        </div>
      )}

      {labs.length > 0 ? (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Test</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Value</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Reference Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {labs.map((lab) => (
                <tr key={lab.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-600">{lab.date}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{lab.testName}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {lab.value} {lab.unit}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{lab.referenceRange}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lab.status)}`}>
                      {lab.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(lab.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No lab results added yet.</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary mt-4"
          >
            Add Your First Lab Result
          </button>
        </div>
      )}
    </div>
  );
};

export default Labs;
