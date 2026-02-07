import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function OverallStatsModal({ timestamps, onClose }) {

  const labels = timestamps.map(t => t.title);

  const hours = timestamps.map(
    t => t.totalHours || 0
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Hours",
        data: hours,
        backgroundColor: "#22c55e"
      }
    ]
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-gray-900 p-4 rounded-xl w-[90%] max-w-xl">

        <h2 className="text-green-400 mb-3">
          Overall Stats
        </h2>

        <Bar data={chartData} />

        <button
          onClick={onClose}
          className="mt-3 bg-green-600 px-4 py-1 rounded"
        >
          Close
        </button>

      </div>
    </div>
  );
}