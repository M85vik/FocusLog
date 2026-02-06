import { useEffect, useState } from "react";

import {
  getTimestamps,
  createTimestamp
} from "../services/api";

import TimestampCard from "../components/TimestampCard";

export default function Dashboard() {

  const [timestamps, setTimestamps] = useState([]);
  const [title, setTitle] = useState("");

  const loadData = async () => {
    const data = await getTimestamps();

    if (data.timestamps) {
      setTimestamps(data.timestamps);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) return;

    await createTimestamp(title);
    setTitle("");
    loadData();
  };

  return (
        <div className="min-h-screen p-4 w-full max-w-md md:max-w-2xl lg:max-w-5xl xl:max-w-7xl mx-auto bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4 text-center">
      Time Tracker
      </h1>

      {/* Create */}
      <div className="flex gap-2 mb-4">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
          className="flex-1 p-2 rounded border border-green-600 bg-to-r bg-black"
        />

        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 rounded font-semibold"
        >
          Add
        </button>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {timestamps.map((t) => (
          <TimestampCard
            key={t._id}
            data={t}
            refresh={loadData}
          />
        ))}
      </div>

    </div>
  );
}