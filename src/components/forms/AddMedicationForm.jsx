import React, { useState } from 'react';
import { useHealthData } from '../../context/HealthDataContext';

const AddMedicationForm = ({ onClose, onSuccess }) => {
  const { addMedication } = useHealthData();
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    nextDose: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addMedication(formData);
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (error) {
      console.error('Error adding medication:', error);
      alert('Failed to add medication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Medication Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="e.g., Lisinopril"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dosage
        </label>
        <input
          type="text"
          name="dosage"
          value={formData.dosage}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="e.g., 10mg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Frequency
        </label>
        <select
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">Select frequency</option>
          <option value="Once daily">Once daily</option>
          <option value="Twice daily">Twice daily</option>
          <option value="Three times daily">Three times daily</option>
          <option value="Four times daily">Four times daily</option>
          <option value="As needed">As needed</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Next Dose (Optional)
        </label>
        <input
          type="datetime-local"
          name="nextDose"
          value={formData.nextDose}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes (Optional)
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Any special instructions..."
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Medication'}
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex-1 btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AddMedicationForm;
