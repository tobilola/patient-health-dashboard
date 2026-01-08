import React from 'react';
import { Pill, Trash2 } from 'lucide-react';

const MedicationCard = ({ medication, onDelete }) => {
  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Pill className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{medication.name}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {medication.dosage} - {medication.frequency}
            </p>
            {medication.nextDose && (
              <p className="text-sm text-gray-500 mt-2">
                Next dose: {medication.nextDose}
              </p>
            )}
            {medication.notes && (
              <p className="text-sm text-gray-500 mt-1">
                Note: {medication.notes}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={() => onDelete(medication.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete medication"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MedicationCard;
