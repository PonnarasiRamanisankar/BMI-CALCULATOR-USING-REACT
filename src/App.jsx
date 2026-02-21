import React, { useState } from 'react';
import './App.css';

function App() {
  const [userData, setUserData] = useState({ 
    name: '', age: '', gender: '', height: '', weight: '' 
  });
  const [currentStep, setCurrentStep] = useState('form');
  const [bmiResult, setBmiResult] = useState(null);
  const [bmiStatus, setBmiStatus] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!userData.name || !userData.age || !userData.gender || !userData.height || !userData.weight) {
      alert('Please fill all fields');
      return;
    }

    const heightInMeters = parseFloat(userData.height) / 100;
    const bmiValue = (parseFloat(userData.weight) / (heightInMeters * heightInMeters)).toFixed(2);
    
    let status = '';
    if (bmiValue < 18.5) status = 'Underweight';
    else if (bmiValue < 25) status = 'Normal';
    else if (bmiValue < 30) status = 'Overweight';
    else status = 'Obese'; // ← OBESE INCLUDED
    
    setBmiResult(bmiValue);
    setBmiStatus(status);
    setCurrentStep('result');
  };

  const handleInputChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setUserData({ name: '', age: '', gender: '', height: '', weight: '' });
    setBmiResult(null);
    setBmiStatus('');
    setCurrentStep('form');
  };

  if (currentStep === 'form') {
    return (
      <div className="app">
        <div className="container">
          <h1>📊 BMI Calculator</h1>
          <form onSubmit={calculateBMI} className="bmi-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Age *</label>
                <input
                  type="number"
                  value={userData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="Years"
                  min="1"
                  max="120"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Gender *</label>
              <select value={userData.gender} onChange={(e) => handleInputChange('gender', e.target.value)} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Height (cm) *</label>
                <input
                  type="number"
                  value={userData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  placeholder="170"
                  step="0.1"
                  required
                />
              </div>
              <div className="form-group">
                <label>Weight (kg) *</label>
                <input
                  type="number"
                  value={userData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  placeholder="70"
                  step="0.1"
                  required
                />
              </div>
            </div>

            <button type="submit" className="calculate-btn">Calculate My BMI</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>Hi {userData.name}! 👋</h1>
          <button onClick={resetForm} className="reset-btn">New Calculation</button>
        </div>
        
        <div className="result-container">
          <div className="user-card">
            <h2>Your BMI Result</h2>
            <div className="bmi-display">
              <div className="bmi-number">{bmiResult}</div>
              <div className={`bmi-level ${bmiStatus.toLowerCase()}`}>
                {bmiStatus} Level
              </div>
            </div>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <span>Age:</span> {userData.age} years
            </div>
            <div className="detail-item">
              <span>Gender:</span> {userData.gender}
            </div>
            <div className="detail-item">
              <span>Height:</span> {userData.height} cm
            </div>
            <div className="detail-item">
              <span>Weight:</span> {userData.weight} kg
            </div>
          </div>

          <div className="result-actions">
            <button onClick={resetForm} className="reset-btn">Calculate Again</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
