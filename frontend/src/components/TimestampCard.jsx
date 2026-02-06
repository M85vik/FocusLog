import {
  startSession,
  stopSession,
  deleteTimestamp
} from "../services/api";

export default function TimestampCard({ data, refresh }) {

  const activeSession = data.timeseries.find(
    (t) => !t.endTime
  );

  const handleStart = async () => {
    await startSession(data._id);
    refresh();
  };

  const handleStop = async () => {
    await stopSession(activeSession._id);
    refresh();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this timestamp?")) return;

    await deleteTimestamp(data._id);
    refresh();
  };

  return (
    <div className="relative overflow-hidden  backdrop-blur-xl bg-gradient-to-br from-gray-800/60 via-gray-900/60 to-black/60 rounded-2xl shadow-2xl p-4 border border-gray-700/40">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent pointer-events-none"></div>

      {/* Title */}
      <h2 className="font-semibold text-lg text-green-400">
        {data.title}
      </h2>

      {/* Total */}
      <p className="text-sm text-gray-400 mb-2">
        Total: {data.totalHours?.toFixed(3) || 0} hrs
      </p>

      {/* Controls */}
      <div className="flex gap-2 mb-3 bg-black/30 p-2 rounded-xl backdrop-blur-md border border-gray-700/30">

        {!activeSession && (
          <button
            onClick={handleStart}
            className="flex-1 bg-green-500 hover:bg-green-400 text-black font-semibold py-1 rounded transition"
          >
            ▶ Start
          </button>
        )}

        {activeSession && (
          <button
            onClick={handleStop}
            className="flex-1 bg-green-700 hover:bg-green-600 text-white py-1 rounded transition"
          >
            ⏹ Stop
          </button>
        )}

        <button
          onClick={handleDelete}
          className="bg-gray-700 hover:bg-red-600 text-white px-3 rounded transition"
        >
          X
        </button>

      </div>

      {/* Sessions */}
      <div className="text-sm space-y-1 bg-black/30 rounded-xl p-2 backdrop-blur-md border border-gray-700/30">

        {data.timeseries.map((s) => (
          <div key={s._id} className="flex justify-between">

            <span>
              {new Date(s.startTime).toLocaleTimeString()}
              {" → "}
              {s.endTime
                ? new Date(s.endTime).toLocaleTimeString()
                : "Running"}
            </span>

            <span>
              {s.hours.toFixed(3) || 0}h
            </span>

          </div>
        ))}

      </div>

      </div>
  
  );
}