import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Calendar from './components/CustomCalendar';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default App;
