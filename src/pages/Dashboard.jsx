import React, { useState } from 'react';
import { Activity, Heart, Droplet, Weight } from 'lucide-react';
import MetricCard from '../components/cards/MetricCard';
import LineChartBasic from '../components/charts/LineChartBasic';
import { useHealthData } from '../context/HealthDataContext';

const Dashboard = () => {
  const { metrics, addMetric } = useHealthData();
  const [showAddMetric, setShowAddMetric] = useState(false);
  const [formData, setFormData] = useState({
    type: 'weight',
    value: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Get latest metrics
  const latestWeight = metrics.filter(m => m.type === 'weight')[0]?.value || 0;
  const latestBP = metrics.filter(m => m.type === 'blood_pressure')[0]?.value || '0/0';
  const latestGlucose = metrics.filter(m => m.type === 'glucose')[0]?.value || 0;

  // Prepare chart data
  const chartData = metrics
    .filter(m => ['weight', 'glucose'].includes(m.type))
    .reduce((acc, metric) => {
      const existing = acc.find(d => d.date === metric.date);
      if (existing) {
        existing[metric.type] = parseFloat(metric.value);
      } else {
        acc.push({
          date: metric.date,
          [metric.type]: parseFloat(metric.value)
        });
      }
      return acc;
    }, [])
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-7); // Last 7 days

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMetric(formData);
      setShowAddMetric(false);
      setFormData({ type: 'weight', value: '', date: new Date().toISOString().split('T')[0] });
    } catch (error) {
      alert('Failed to add metric');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Health Dashboard</h1>
        <button
          onClick={() => setShowAddMetric(!showAddMetric)}
          className="btn-primary"
        >
          {showAddMetric ? 'Cancel' : 'Add Metric'}
        </button>
      </div>

      {showAddMetric && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Metric</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="weight">Weight</option>
                <option value="blood_pressure">Blood Pressure</option>
                <option value="glucose">Glucose</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
              <input
                type="text"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder={formData.type === 'blood_pressure' ? '120/80' : '0'}
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
            <button type="submit" className="btn-primary w-full">
              Add Metric
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Weight"
          value={latestWeight}
          unit="lbs"
          icon={<Weight className="w-6 h-6" />}
          color="blue"
        />
        <MetricCard
          title="Blood Pressure"
          value={latestBP}
          unit="mmHg"
          icon={<Heart className="w-6 h-6" />}
          color="red"
        />
        <MetricCard
          title="Glucose"
          value={latestGlucose}
          unit="mg/dL"
          icon={<Droplet className="w-6 h-6" />}
          color="purple"
        />
      </div>

      {chartData.length > 0 && (
        <LineChartBasic
          data={chartData}
          dataKeys={['weight', 'glucose']}
          colors={['#0ea5e9', '#a855f7']}
          title="Health Trends (Last 7 Days)"
        />
      )}

      {chartData.length === 0 && (
        <div className="card text-center py-12">
          <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No health data yet. Add your first metric to see trends.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
