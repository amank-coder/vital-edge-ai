"use client"

import { useState } from 'react';
import axios from 'axios';

export default function PhysicalHealth() {
  const [formData, setFormData] = useState({
    Sex: 'Male',
    Age: 25,
    Height: 170,
    Weight: 65,
    Hypertension: 0,
    Diabetes: 0,
    BMI: 22.5,
    Level: 'Normal',
    'Fitness Goal': 'Weight Loss',
    'Fitness Type': 'Cardio Fitness',
  });

  const [results, setResults] = useState({
    exercises: null,
    equipment: null,
    diet: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        ['Age', 'Height', 'Weight', 'Hypertension', 'Diabetes', 'BMI'].includes(name)
          ? Number(value)
          : value,
    }));
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [exercisesRes, equipmentRes, dietRes] = await Promise.all([
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/predict_exercises`, formData),
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/predict_equipment`, formData),
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/predict_diet`, formData),
      ]);
      setResults({
        exercises: exercisesRes.data,
        equipment: equipmentRes.data,
        diet: dietRes.data,
      });
    } catch (error) {
      console.error('Prediction Error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Personalized Physical Health Plan</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow">
        {[
          { label: 'Sex', name: 'Sex', type: 'select', options: ['Male', 'Female'] },
          { label: 'Age', name: 'Age', type: 'number' },
          { label: 'Height (cm)', name: 'Height', type: 'number' },
          { label: 'Weight (kg)', name: 'Weight', type: 'number' },
          { label: 'BMI', name: 'BMI', type: 'number' },
          { label: 'Hypertension (0 or 1)', name: 'Hypertension', type: 'number' },
          { label: 'Diabetes (0 or 1)', name: 'Diabetes', type: 'number' },
          { label: 'Level', name: 'Level', type: 'select', options: ['Normal', 'Obuse', 'Overweight', 'Underweight'] },
          { label: 'Fitness Goal', name: 'Fitness Goal', type: 'select', options: ['Weight Gain', 'Weight Loss'] },
          { label: 'Fitness Type', name: 'Fitness Type', type: 'select', options: ['Cardio Fitness', 'Muscular Fitness'] },
        ].map(({ label, name, type, options }) => (
          <div key={name}>
            <label className="block font-medium mb-1">{label}</label>
            {type === 'select' ? (
              <select name={name} value={formData[name]} onChange={handleChange} className="w-full p-2 border rounded">
                {options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
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
          <button type="submit" className="w-full bg-[#1a057a] text-white py-2 rounded hover:bg-blue-800 transition">
            Get Recommendations
          </button>
        </div>
      </form>

      {results.exercises && (
        <div className="mt-8 bg-white p-6 rounded shadow space-y-4">
          <h2 className="text-xl font-bold">Recommendations</h2>
          <div>
            <h3 className="font-semibold">Exercises:</h3>
            <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap break-words">{results.exercises.recommended_exercises}</pre>
          </div>
          <div>
            <h3 className="font-semibold">Equipment:</h3>
            <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap break-words">{results.equipment.recommended_equipment}</pre>
          </div>
          <div>
            <h3 className="font-semibold">Diet:</h3>
            <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap break-words">{results.diet.recommended_diet}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
