"use client"

import { useState } from 'react';
import axios from 'axios';

export default function MentalHealth() {
  const [formData, setFormData] = useState({
    Age: 30,
    'Sleep Hours': 7,
    'Work Hours per Week': 40,
    'Screen Time per Day (Hours)': 5,
    'Social Interaction Score': 4,
    'Happiness Score': 3,
    Gender: 'Male',
    'Exercise Level': 'Moderate',
    'Diet Type': 'Vegan',
    'Stress Level': 'Medium',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        [
          'Age',
          'Sleep Hours',
          'Work Hours per Week',
          'Screen Time per Day (Hours)',
          'Social Interaction Score',
          'Happiness Score',
        ].includes(name)
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/predict`, formData);
      setResult(res.data);
    } catch (error) {
      console.error('Prediction Error:', error);
      setResult({ error: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mental Health Prediction</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow"
      >
        {[
          { label: 'Age', name: 'Age', type: 'number' },
          { label: 'Sleep Hours', name: 'Sleep Hours', type: 'number' },
          { label: 'Work Hours per Week', name: 'Work Hours per Week', type: 'number' },
          { label: 'Screen Time per Day (Hours)', name: 'Screen Time per Day (Hours)', type: 'number' },
          { label: 'Social Interaction Score', name: 'Social Interaction Score', type: 'number' },
          { label: 'Happiness Score', name: 'Happiness Score', type: 'number' },
          { label: 'Gender', name: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
          {
            label: 'Exercise Level',
            name: 'Exercise Level',
            type: 'select',
            options: ['None', 'Low', 'Moderate', 'High'],
          },
          {
            label: 'Diet Type',
            name: 'Diet Type',
            type: 'select',
            options: ['Vegan', 'Vegetarian', 'Balanced', 'Non-Vegetarian'],
          },
          {
            label: 'Stress Level',
            name: 'Stress Level',
            type: 'select',
            options: ['Low', 'Medium', 'High'],
          },
        ].map(({ label, name, type, options }) => (
          <div key={name}>
            <label className="block font-medium mb-1">{label}</label>
            {type === 'select' ? (
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            )}
          </div>
        ))}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-[#1a057a] text-white py-2 rounded hover:bg-blue-800 transition"
          >
            {loading ? 'Predicting...' : 'Get Mental Health Prediction'}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-8 bg-white p-6 rounded shadow space-y-4">
          <h2 className="text-xl font-bold">Prediction Result</h2>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap break-words">
            {result?.message}
          </pre>
        </div>
      )}
    </div>
  );
}
