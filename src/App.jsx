import React, { useState } from "react";
import { maleAge, femaleAge } from "./utils/AgeArray";
import "./App.css";
const App = () => {
  const [age, setAge] = useState("");
  const [retireAge, setRetireAge] = useState("");
  const [gender, setGender] = useState("");
  const [insuranceYears, setInsuranceYears] = useState("");
  const [averageMonthlyWage, setAverageMonthlyWage] = useState("");
  const [results, setResults] = useState({});

  // 總年金現值計算
  function presentValue(value, year) {
    let sum = 0;
    for (let i = 0; i <= year; i++) {
      sum += value * 12 * Math.pow(1 / (1 + 0.01), i);
    }
    return sum;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // 計算年金：取最大
    let pension1 = Math.max(
      averageMonthlyWage * insuranceYears * 0.00775 + 3000,
      averageMonthlyWage * insuranceYears * 0.0155
    );
    console.log(pension1);
    // 展延年金計算
    const ageDiff = retireAge - 63;
    console.log(ageDiff);
    if (ageDiff > 0) {
      pension1 *= 1 + 0.04 * Math.min(ageDiff, 5);
      // 減給年金計算
    } else if (ageDiff < 0) {
      pension1 *= 1 - 0.04 * Math.min(Math.abs(ageDiff), 5);
    }
    console.log(pension1);

    // 計算一次金
    let pension2 = averageMonthlyWage * insuranceYears;

    // 計算一次領
    let pension3 = 0;
    if (insuranceYears > 15) {
      if (retireAge > 60) {
        pension3 =
          averageMonthlyWage * Math.min(15 * 1 + (insuranceYears - 15) * 2, 50);
      } else {
        pension3 =
          averageMonthlyWage * Math.min(15 * 1 + (insuranceYears - 15) * 2, 45);
      }
    } else {
      pension3 = averageMonthlyWage * insuranceYears;
    }

    // 總年金計算
    const remainingYears =
      gender === "male" ? maleAge[retireAge] : femaleAge[retireAge];

    // 現值計算
    const pv = presentValue(pension1, Math.round(remainingYears));

    const recommendation = pv > pension2 ? "老年年金給付" : "老年一次金給付";

    console.log({
      pension1,
      pv,
      pension2,
      pension3,
      recommendation,
    });

    setResults({
      pension1,
      pv,
      pension2,
      pension3,
      recommendation,
    });
  };

  return (
    <div className="main">
      <h1>年金 一次金計算</h1>
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
          <label>預計退休年齡: </label>
          <input
            type="number"
            value={retireAge}
            onChange={(e) => setRetireAge(e.target.value)}
          />
        </div>
        <div>
          <label>性別: </label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">請選擇</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
          </select>
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
      {results.pv && (
        <div className="result">
          <h2>結果</h2>
          <p>年金月領給付: {results.pension1.toFixed(2)}</p>
          <p>老年一次金給付: {results.pension2.toFixed(2)}</p>
          <p>老年一次領給付: {results.pension3}</p>
          <p>年金預計總額: {results.pv.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default App;
