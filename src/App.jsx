import React, { useState } from "react";
import "./App.css";
const App = () => {
  const [age, setAge] = useState("");
  const [insuranceYears, setInsuranceYears] = useState("");
  const [averageMonthlyWage, setAverageMonthlyWage] = useState("");
  const [results, setResults] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const pension1 = Math.max(
      averageMonthlyWage * insuranceYears * 0.00775 + 3000,
      averageMonthlyWage * insuranceYears * 0.0155
    );

    let pension2 = 0;
    if (age >= 60 && insuranceYears > 15) {
      pension2 = averageMonthlyWage * (15 * 1 + (insuranceYears - 15) * 2);
    }

    setResults({
      pension1,
      pension2,
    });
  };

  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <div>
          <label>年齡: </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label>保險年資: </label>
          <input
            type="number"
            value={insuranceYears}
            onChange={(e) => setInsuranceYears(e.target.value)}
          />
        </div>
        <div>
          <label>平均月投保薪資: </label>
          <input
            type="number"
            value={averageMonthlyWage}
            onChange={(e) => setAverageMonthlyWage(e.target.value)}
          />
        </div>
        <button type="submit">計算</button>
      </form>
      {results.pension1 && (
        <div>
          <h2>結果</h2>
          <p>老年年金給付: {results.pension1.toFixed(2)}</p>
          <p>老年一次金給付: {results.pension2.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default App;
