"use client";

import { useState } from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

const leaderboardUsers = [
  {
    id: 1,
    name: "Alice",
    physical: 78,
    mental: 65,
    calories: 520,
    sleep: 7,
    steps: 8900,
    exercises: ["Yoga", "Swimming", "Walking"],
  },
  {
    id: 2,
    name: "Bob",
    physical: 88,
    mental: 75,
    calories: 600,
    sleep: 6,
    steps: 10000,
    exercises: ["Squats", "Deadlifts", "Bench presses", "Overhead presses"],
  },
  {
    id: 3,
    name: "Charlie",
    physical: 60,
    mental: 55,
    calories: 350,
    sleep: 5,
    steps: 6000,
    exercises: ["Brisk walking", "Cycling"],
  },
  {
    id: 4,
    name: "Diana",
    physical: 92,
    mental: 80,
    calories: 700,
    sleep: 8,
    steps: 12000,
    exercises: ["Running", "Yoga", "Swimming"],
  },
  {
    id: 5,
    name: "Ethan",
    physical: 70,
    mental: 60,
    calories: 480,
    sleep: 6.5,
    steps: 7700,
    exercises: ["Walking", "Squats", "Cycling"],
  },
  {
    id: 6,
    name: "Fatima",
    physical: 82,
    mental: 68,
    calories: 540,
    sleep: 7.5,
    steps: 9100,
    exercises: ["Yoga", "Deadlifts", "Swimming"],
  },
  {
    id: 7,
    name: "George",
    physical: 77,
    mental: 72,
    calories: 500,
    sleep: 6.8,
    steps: 8800,
    exercises: ["Bench presses", "Overhead presses", "Running"],
  },
  {
    id: 8,
    name: "Hannah",
    physical: 85,
    mental: 78,
    calories: 620,
    sleep: 7.2,
    steps: 9300,
    exercises: ["Cycling", "Yoga", "Brisk walking"],
  },
  {
    id: 9,
    name: "Ivan",
    physical: 90,
    mental: 70,
    calories: 650,
    sleep: 6.9,
    steps: 9900,
    exercises: ["Squats", "Swimming", "Walking"],
  },
  {
    id: 10,
    name: "Julia",
    physical: 73,
    mental: 62,
    calories: 470,
    sleep: 6.5,
    steps: 8200,
    exercises: ["Deadlifts", "Running", "Brisk walking"],
  },
];



export default function Dashboard() {
  const [selectedUser, setSelectedUser] = useState(leaderboardUsers[0]);

  const [dietChecks, setDietChecks] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  const [exerciseChecks, setExerciseChecks] = useState({
    walk: false,
    yoga: false,
    gym: false,
  });

  const handleDietChange = (e) => {
    const { name, checked } = e.target;
    setDietChecks((prev) => ({ ...prev, [name]: checked }));
  };

  const handleExerciseChange = (e) => {
    const { name, checked } = e.target;
    setExerciseChecks((prev) => ({ ...prev, [name]: checked }));
  };

  const healthData = [
    {
      title: "Physical Health",
      value: selectedUser.physical,
      fill: "#4ade80",
    },
    {
      title: "Mental Health",
      value: selectedUser.mental,
      fill: "#60a5fa",
    },
  ];
  const [playingExercise, setPlayingExercise] = useState(null);

  // Dummy function for demo: Map exercise to a sample video URL (replace with real URLs)
  const getVideoUrl = (exercise) => {
    const videos = {
      "Pushups": "https://www.w3schools.com/html/mov_bbb.mp4",
      "Squats": "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      "Running": "https://i.pinimg.com/originals/f9/2e/1b/f92e1bb2a6789fff27bfd483145e0efc.gif",
      "Walking": "https://i.pinimg.com/originals/47/03/09/4703093a70ba47001bf2c86319aae091.gif",
      "Yoga": "https://media3.giphy.com/media/DBbPjLMsQPruMkDcrd/giphy.gif?cid=6c09b9524m9xkve1e6lybohccu5r635ae5czqnf01tf6jmul&ep=v1_gifs_search&rid=giphy.gif",
      "Cycling": "https://cdn.dribbble.com/userupload/23144255/file/original-cc0fbe4bb4116aa89584d60198bfd92c.gif",
      "Swimming": "https://i.gifer.com/HmKF.gif"
    };
    return videos[exercise] || "https://i.pinimg.com/originals/47/03/09/4703093a70ba47001bf2c86319aae091.gif"
  };
  const createChartData = (value, fill) => [{ name: "Score", value, fill }];

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      {/* Main Dashboard Section */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6 text-[color:#1a057a]">
          Dashboard - {selectedUser.name}
        </h1>

        {/* Metrics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {[
            {
              title: "Calories Burnt",
              value: selectedUser.calories,
              icon: "🔥",
              bg: "bg-red-50",
              textColor: "text-red-800",
            },
            {
              title: "Sleep Duration",
              value: selectedUser.sleep,
              icon: "😴",
              bg: "bg-purple-50",
              textColor: "text-purple-800",
            },
            {
              title: "Steps Walked",
              value: selectedUser.steps,
              icon: "👟",
              bg: "bg-green-50",
              textColor: "text-green-800",
            },
          ].map((metric, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl shadow ${metric.bg} flex items-center justify-between`}
            >
              <div>
                <div className="text-2xl">{metric.icon}</div>
                <div className={`text-sm font-medium mt-2 ${metric.textColor}`}>
                  {metric.title}
                </div>
                <div className="text-xl font-bold">{metric.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Speedometers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {healthData.map((data, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded shadow flex flex-col items-center"
            >
              <h2 className="text-lg font-semibold">{data.title} Score</h2>
              <div className="relative w-full h-96 -mt-36">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="100%"
                    innerRadius="75%"
                    outerRadius="100%"
                    startAngle={180}
                    endAngle={0}
                    data={createChartData(data.value, data.fill)}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      angleAxisId={0}
                      tick={false}
                    />
                    <RadialBar background dataKey="value" cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xl font-bold">
                  {data.value}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recents */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-[color:#1a057a]">
            Recents
          </h2>
          <div className="bg-white p-4 rounded shadow space-y-2">
            <p>✅ {selectedUser.name} completed yoga today.</p>
            <p>🍎 {selectedUser.name} logged breakfast.</p>
            <p>💧 {selectedUser.name} drank 2L of water.</p>
          </div>
        </div>

        {/* Checklists */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Diet Checklist */}
{/* Diet Checklist */}
<div className="bg-white p-6 rounded-xl shadow-lg w-full">
  <h2 className="text-2xl font-extrabold mb-6 text-[#1a057a] border-b-2 border-[#1a057a] pb-2">
    Diet Checklist
  </h2>

  {Object.keys(dietChecks).map((item) => (
    <div
      key={item}
      className="flex items-center justify-between mb-4 p-4 rounded-lg bg-gradient-to-r from-green-100 via-teal-100 to-cyan-100 shadow-md hover:shadow-lg transition-shadow"
    >
      <label className="flex items-center space-x-3 cursor-pointer w-full">
        <input
          type="checkbox"
          name={item}
          checked={dietChecks[item]}
          onChange={handleDietChange}
          className="h-5 w-5 text-green-600 rounded focus:ring-green-500"
        />
        <span className="text-gray-800 font-semibold capitalize">{item}</span>
      </label>
    </div>
  ))}
</div>



          {/* Exercise Checklist */}
<div className="bg-white p-6 rounded-xl shadow-lg w-full">
  <h2 className="text-2xl font-extrabold mb-6 text-[#1a057a] border-b-2 border-[#1a057a] pb-2">
    Exercise Checklist
  </h2>

  {selectedUser.exercises.map((exercise) => (
    <div
      key={exercise}
      className="flex items-center justify-between mb-4 p-4 rounded-lg bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-md hover:shadow-lg transition-shadow"
    >
      <label className="flex items-center space-x-3 cursor-pointer w-full">
        <input
          type="checkbox"
          name={exercise}
          onChange={handleExerciseChange}
          className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
        />
        <span className="text-gray-800 font-semibold">{exercise}</span>
      </label>

      <button
        onClick={() => setPlayingExercise(exercise)}
        className="ml-4 bg-[#1a057a] text-white px-3 py-1 rounded hover:bg-[#14044d] transition"
      >
        Start
      </button>
    </div>
  ))}

{playingExercise && (
<div
    className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"

    onClick={() => setPlayingExercise(null)}
  >
    <div
      className="bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-lg font-bold text-[#1a057a] mb-2">
        Now Playing: {playingExercise}
      </h3>

      {getVideoUrl(playingExercise).endsWith(".gif") ? (
        <img
          src={getVideoUrl(playingExercise)}
          alt={playingExercise}
          className="h-[90vh] rounded-lg shadow-lg"
        />
      ) : (
        <video
          src={getVideoUrl(playingExercise)}
          controls
          autoPlay
          className="w-full rounded-lg shadow-lg"
        />
      )}

      <button
        onClick={() => setPlayingExercise(null)}
        className="mt-2 text-indigo-600 hover:underline"
      >
        Close Video
      </button>
    </div>
  </div>
)}


    </div>


        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="w-full md:w-72 bg-white rounded shadow p-4">
        <h2 className="text-xl font-bold mb-4 text-center text-[color:#1a057a]">
          🏆 Leaderboard
        </h2>
        <ul className="space-y-2">
          {leaderboardUsers.map((user) => (
            <li
              key={user.id}
              className={`p-2 rounded cursor-pointer hover:bg-blue-50 ${
                selectedUser.id === user.id ? "bg-blue-100 font-semibold" : ""
              }`}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
