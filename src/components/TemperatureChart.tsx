import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TemperatureChartProps {
  hourlyTemperatures: number[];
  times: string[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ hourlyTemperatures, times }) => {
  const data = {
    labels: times,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: hourlyTemperatures,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      x: { title: { display: true, text: 'Time' } },
      y: { title: { display: true, text: 'Temperature (°C)' } },
    },
  };

  return <Line data={data} options={options} />;
};

export default TemperatureChart;
