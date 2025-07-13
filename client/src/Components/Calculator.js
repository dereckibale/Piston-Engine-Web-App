import React, { useState } from 'react';

function Calculator() {
  // Use a single state object to hold all input values instead of many separate states
  const [inputs, setInputs] = useState({
    thermalEfficiency: '',
    compressionRatio: '',
    wNet: '',
    specificHeatRatio: '',
    p1: '',
    p2: '',
    p3: '',
    p4: '',
    t1: '',
    t2: '',
    t3: '',
    t4: '',
  });

  // State to hold calculated results
  const [results, setResults] = useState({
    thermalEfficiency: null,
    compressionRatio: null,
    wNet: null,
    specificHeatRatio: null,
    p1: null,
    p2: null,
    p3: null,
    p4: null,
    t1: null,
    t2: null,
    t3: null,
    t4: null,
  });

  // State to control reminder message
  const [remind, setRemind] = useState(false);

  // Descriptive names for display
  const variableNames = {
    thermalEfficiency: "Thermal Efficiency",
    compressionRatio: "Compression Ratio",
    wNet: "Work_net",
    specificHeatRatio: "Specific Heat Ratio",
    p1: "Pressure @point 1",
    p2: "Pressure @point 2",
    p3: "Pressure @point 3",
    p4: "Pressure @point 4",
    t1: "Temperature @pt.1 in Kelvin",
    t2: "Temperature @pt.2 in Kelvin",
    t3: "Temperature @pt.3 in Kelvin",
    t4: "Temperature @pt.4 in Kelvin",
  };

  // Handle input changes generically, parsing to float or empty string if invalid
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Parse float or set empty string if invalid input
    const parsedValue = value === '' ? '' : parseFloat(value);
    setInputs(prev => ({ ...prev, [name]: parsedValue }));
  };

  // Reset all inputs and results
  const resetAll = () => {
    setInputs({
      thermalEfficiency: '',
      compressionRatio: '',
      wNet: '',
      specificHeatRatio: '',
      p1: '',
      p2: '',
      p3: '',
      p4: '',
      t1: '',
      t2: '',
      t3: '',
      t4: '',
    });
    setResults({
      thermalEfficiency: null,
      compressionRatio: null,
      wNet: null,
      specificHeatRatio: null,
      p1: null,
      p2: null,
      p3: null,
      p4: null,
      t1: null,
      t2: null,
      t3: null,
      t4: null,
    });
    setRemind(false);
  };

  // Main solver function that calculates values based on inputs
  const solveEverything = () => {
    const Cv = 0.718; // Specific heat at constant volume for air

    // Destructure inputs for easier access
    const {
      thermalEfficiency,
      compressionRatio,
      wNet,
      specificHeatRatio,
      p1,
      p2,
      p3,
      p4,
      t1,
      t2,
      t3,
      t4,
    } = inputs;

    // Check if all inputs are empty or zero - show reminder
    const hasInput = Object.values(inputs).some(val => val !== '' && val !== 0 && val !== null);
    if (!hasInput) {
      resetAll();
      setRemind(true);
      return;
    } else {
      setRemind(false);
    }

    // Prepare new results object to update state once at the end
    const newResults = { ...results };

    // Calculate thermal efficiency if compression ratio and specific heat ratio are given
    if (compressionRatio && specificHeatRatio) {
      newResults.thermalEfficiency = 1 - (1 / Math.pow(compressionRatio, specificHeatRatio - 1));

      // Calculate temperatures based on isentropic relations
      newResults.t1 = t1 || 300; // Default 300K if not provided
      newResults.t2 = newResults.t1 * Math.pow(compressionRatio, specificHeatRatio - 1);
      newResults.t3 = 1000; // Assumed max temp after heat addition
      newResults.t4 = newResults.t3 / Math.pow(compressionRatio, specificHeatRatio - 1);

      // Calculate net work
      newResults.wNet = Cv * ((newResults.t3 - newResults.t2) - (newResults.t4 - newResults.t1));

      // Update compression ratio and specific heat ratio results as well
      newResults.compressionRatio = compressionRatio;
      newResults.specificHeatRatio = specificHeatRatio;
    }

    // Calculate compression ratio from pressures if available
    if (p1 && p2) {
      const compRatioFromP = Math.pow(p2 / p1, 1 / 1.4);
      newResults.compressionRatio = compRatioFromP;
      newResults.thermalEfficiency = 1 - (1 / Math.pow(compRatioFromP, 1.4 - 1));
    }

    // Calculate compression ratio from thermal efficiency if available
    if (thermalEfficiency && specificHeatRatio && thermalEfficiency < 1) {
      const r = Math.pow(1 / (1 - thermalEfficiency), 1 / (specificHeatRatio - 1));
      newResults.compressionRatio = r;
    }

    // Update pressures and temperatures if provided as inputs
    ['p1', 'p2', 'p3', 'p4', 't1', 't2', 't3', 't4'].forEach(key => {
      if (inputs[key] !== '') {
        newResults[key] = inputs[key];
      }
    });

    // Update state with all calculated and input values
    setResults(newResults);
  };

  return (
    <div className="calculator-container" style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Thermodynamics Calculator</h2>
      <p>
        Input any available data. Thermal Efficiency depends on Compression Ratio.<br />
        Air specific heat at constant volume: 0.718 kJ/kg.K.<br />
        Use 300K for temperature at point 1 if unknown.
      </p>
      <p style={{ fontStyle: 'italic', color: 'red' }}>
        Warning: This calculator is in development. High inputs may cause miscalculations.
      </p>

      {/* Render inputs dynamically */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {Object.keys(inputs).map(key => (
          <input
            key={key}
            type="number"
            name={key}
            placeholder={variableNames[key]}
            value={inputs[key]}
            onChange={handleInputChange}
            step="any"
          />
        ))}
      </div>

      <button
        onClick={solveEverything}
        style={{ marginTop: 20, padding: '10px 20px', cursor: 'pointer', backgroundColor: 'skyblue' }}
      >
        Solve!
      </button>

      {/* Display results if any */}
      {Object.values(results).some(val => val !== null) && (
        <div className="answers-container" style={{ marginTop: 20 }}>
          <h3>Results</h3>
          <ul>
            {Object.entries(results).map(([key, val]) =>
              val !== null && val !== '' ? (
                <li key={key}>
                  <strong>{variableNames[key]}:</strong> {val.toFixed ? val.toFixed(4) : val}
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}

      {/* Reminder message */}
      {remind && <div style={{ color: 'red', marginTop: 10 }}>Please enter valid data</div>}
    </div>
  );
}

export default Calculator;
