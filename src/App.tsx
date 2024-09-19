// src/App.tsx
import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GreenHeat Weather Dashboard</h1>
      </header>
      <Dashboard />
    </div>
  );
}

export default App;
