import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function GraphModal({ data, onClose }) {

  const labels = data.timeseries.map(
    (s) => new Date(s.startTime).toLocaleDateString()
  );

  const hours = data.timeseries.map(
    (s) => s.hours || 0
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Hours",
        data: hours,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.2)",
        tension: 0.3
      }
    ]
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-gray-900 p-4 rounded-xl w-[90%] max-w-lg">

        <h2 className="text-green-400 mb-3">
          {data.title} Stats
        </h2>

        <Line data={chartData} />

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