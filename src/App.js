import './App.css';
import React, { useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['Easy', 'Medium', 'Hard'];
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Bar Chart',
    },
  },
};

function App() {
  const [input, setInput] = useState({
    'easy': 0,
    'medium': 0,
    'hard': 0,
  });

  const [data, setData] = useState({
    labels: labels,
    datasets: [{
      label: 'Dataset',
      data: [],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }]
  })

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value
      }
    });
  }

  function setHeight(e) {
    e.preventDefault();
    const { easy, medium, hard } = input;
    // console.log(easy, medium, hard);
    let d = [easy, medium, hard];
    if (easy < 0 || easy > 100 || medium < 0 || medium > 100 || hard < 0 || hard > 100) {
      alert('Values should be between 0 and 100');
      return;
    }

    setData((prevVal) => {
      return {
        ...prevVal,
        datasets: [{
          label: 'Dataset',
          data: d,
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }]
      }
    });
  }

  return (
    <div className='container mt-3'>
      <h1>Bar Chart</h1>
      <div className='chartArea mb-2'>
        <Bar options={options} data={data} />
      </div>
      <div className='inputDiv row inputRow'>
        <div className='col inputCol'>
          <input type="number" min='0' max='100' id='easyInp' name='easy' onChange={handleInputChange} className='form-control' placeholder='Easy' />
        </div>
        <div className='col inputCol'>
          <input type="number" min='0' max='100' id='mediumInp' name='medium' className='form-control' onChange={handleInputChange} placeholder='Medium' />
        </div>
        <div className='col inputCol'>
          <input type="number" min='0' max='100' id='hardInp' name='hard' className='form-control' onChange={handleInputChange} placeholder='Hard' />
        </div>
        <div className='col inputCol'>
          <button type="submit" className="btn btn-primary submitBtn" onClick={setHeight}>Refresh</button>
        </div>
      </div>
    </div>
  );
}

export default App;
