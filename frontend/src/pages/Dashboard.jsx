import { useEffect, useState } from "react";
import GraphModal from "../components/GraphModal";
import {
  getTimestamps,
  createTimestamp
} from "../services/api";

import TimestampCard from "../components/TimestampCard";
import OverallStatsModal from "../components/OverallStatsModal";

export default function Dashboard() {
  const [showOverall, setShowOverall] = useState(false);
  const [timestamps, setTimestamps] = useState([]);
  const [title, setTitle] = useState("");
  const [selectedTimestamp, setSelectedTimestamp] = useState(null);
  const loadData = async () => {
    const data = await getTimestamps();

    if (data && data.timestamps) {
      setTimestamps(data.timestamps);
    } else {
      setTimestamps([]);
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
      <h1 className="text-2xl font-bold mb-4 text-center text-green-400">
        FocusLog
      </h1>

      {/* Create */}
      <div className="flex gap-2 mb-4">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
          className="flex-1 p-2 rounded bg-gray-900 border border-green-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 rounded font-semibold"
        >
          Add
        </button>

        <button
          onClick={() => setShowOverall(true)}
          className="bg-green-600 text-white px-4 rounded font-semibold"
        >
          📊 Overall
        </button>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {timestamps.map((t) => (
          <TimestampCard
            key={t._id}
            data={t}
            refresh={loadData}
            onOpenGraph={setSelectedTimestamp}
          />
        ))}


        {timestamps.length === 0 && (
          <p className="col-span-full text-center text-gray-400 mt-6">
            No tasks yet. Create one 👆
          </p>
        )}


      </div>
      {showOverall && (
        <OverallStatsModal
          timestamps={timestamps}
          onClose={() => setShowOverall(false)}
        />
      )}

      {selectedTimestamp && (
        <GraphModal
          data={selectedTimestamp}
          onClose={() => setSelectedTimestamp(null)}
        />
      )}
    </div>
  );
}