import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';

const HealthDataContext = createContext();

export const useHealthData = () => {
  const context = useContext(HealthDataContext);
  if (!context) {
    throw new Error('useHealthData must be used within HealthDataProvider');
  }
  return context;
};

export const HealthDataProvider = ({ children }) => {
  const [metrics, setMetrics] = useState([]);
  const [medications, setMedications] = useState([]);
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchMetrics(),
        fetchMedications(),
        fetchLabs()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Metrics CRUD
  const fetchMetrics = async () => {
    try {
      const q = query(collection(db, 'metrics'), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  const addMetric = async (metric) => {
    try {
      const docRef = await addDoc(collection(db, 'metrics'), {
        ...metric,
        createdAt: new Date().toISOString()
      });
      setMetrics(prev => [{ id: docRef.id, ...metric }, ...prev]);
      return docRef.id;
    } catch (error) {
      console.error('Error adding metric:', error);
      throw error;
    }
  };

  const deleteMetric = async (id) => {
    try {
      await deleteDoc(doc(db, 'metrics', id));
      setMetrics(prev => prev.filter(m => m.id !== id));
    } catch (error) {
      console.error('Error deleting metric:', error);
      throw error;
    }
  };

  // Medications CRUD
  const fetchMedications = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'medications'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMedications(data);
    } catch (error) {
      console.error('Error fetching medications:', error);
    }
  };

  const addMedication = async (medication) => {
    try {
      const docRef = await addDoc(collection(db, 'medications'), {
        ...medication,
        createdAt: new Date().toISOString()
      });
      setMedications(prev => [...prev, { id: docRef.id, ...medication }]);
      return docRef.id;
    } catch (error) {
      console.error('Error adding medication:', error);
      throw error;
    }
  };

  const updateMedication = async (id, updates) => {
    try {
      await updateDoc(doc(db, 'medications', id), updates);
      setMedications(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    } catch (error) {
      console.error('Error updating medication:', error);
      throw error;
    }
  };

  const deleteMedication = async (id) => {
    try {
      await deleteDoc(doc(db, 'medications', id));
      setMedications(prev => prev.filter(m => m.id !== id));
    } catch (error) {
      console.error('Error deleting medication:', error);
      throw error;
    }
  };

  // Labs CRUD
  const fetchLabs = async () => {
    try {
      const q = query(collection(db, 'labs'), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLabs(data);
    } catch (error) {
      console.error('Error fetching labs:', error);
    }
  };

  const addLab = async (lab) => {
    try {
      const docRef = await addDoc(collection(db, 'labs'), {
        ...lab,
        createdAt: new Date().toISOString()
      });
      setLabs(prev => [{ id: docRef.id, ...lab }, ...prev]);
      return docRef.id;
    } catch (error) {
      console.error('Error adding lab:', error);
      throw error;
    }
  };

  const deleteLab = async (id) => {
    try {
      await deleteDoc(doc(db, 'labs', id));
      setLabs(prev => prev.filter(l => l.id !== id));
    } catch (error) {
      console.error('Error deleting lab:', error);
      throw error;
    }
  };

  const value = {
    metrics,
    medications,
    labs,
    loading,
    addMetric,
    deleteMetric,
    addMedication,
    updateMedication,
    deleteMedication,
    addLab,
    deleteLab,
    refreshData: fetchAllData
  };

  return (
    <HealthDataContext.Provider value={value}>
      {children}
    </HealthDataContext.Provider>
  );
};
