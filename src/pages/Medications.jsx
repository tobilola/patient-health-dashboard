import React, { useState } from 'react';
import { Pill } from 'lucide-react';
import MedicationCard from '../components/cards/MedicationCard';
import AddMedicationForm from '../components/forms/AddMedicationForm';
import { useHealthData } from '../context/HealthDataContext';

const Medications = () => {
  const { medications, deleteMedication } = useHealthData();
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medication?')) {
      try {
        await deleteMedication(id);
      } catch (error) {
        alert('Failed to delete medication');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Medications</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary"
        >
          {showAddForm ? 'Cancel' : 'Add Medication'}
        </button>
      </div>

      {showAddForm && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Medication</h2>
          <AddMedicationForm
            onClose={() => setShowAddForm(false)}
            onSuccess={() => setShowAddForm(false)}
          />
        </div>
      )}

      {medications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {medications.map(medication => (
            <MedicationCard
              key={medication.id}
              medication={medication}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <Pill className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No medications added yet.</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary mt-4"
          >
            Add Your First Medication
          </button>
        </div>
      )}
    </div>
  );
};

export default Medications;
