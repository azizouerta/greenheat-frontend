import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchWeatherData } from "../services/weatherService";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Interfaces for weather data
interface WeatherData {
  temperature_2m: number[];
  precipitation: number[];
  time: string[];
}

interface CurrentWeather {
  temperature: number;
  time: string;
  windspeed: number;
  weathercode: number;
}

interface LocationInfo {
  city: string;
}

const Dashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [days, setDays] = useState(7);  // State for number of days

  // Fetch weather data when days change
  const fetchWeather = async (days: number) => {
    const response = await fetch(`http://localhost:5000/weather?days=${days}`);
    const data = await response.json();
    setWeatherData(data?.hourly);
    setCurrentWeather(data?.current_weather);
    setLocation({ city: data?.city_name || "Unknown Location" });
  };

  useEffect(() => {
    fetchWeather(days);  // Fetch weather data for selected number of days on mount
  }, [days]);  // Re-fetch data whenever 'days' changes

  // Handle loading state
  if (!weatherData || !currentWeather || !location) {
    return <div>Loading...</div>;
  }

  // Chart data for temperature trends
  const temperatureChartData = {
    labels: weatherData.time,  // Time as labels
    datasets: [
      {
        label: 'Temperature (°C)',
        data: weatherData.temperature_2m,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const precipitationChartData = {
    labels: weatherData.time,  // Time as labels
    datasets: [
      {
        label: 'Precipitation (mm)',
        data: weatherData.precipitation,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  // Chart options
  const lineChartOptions = {
    scales: {
      x: { title: { display: true, text: 'Time' } },
      y: { title: { display: true, text: 'Value' } },
    },
  };

  return (
    <div>
      {/* Display City Name in the Header */}
      <h1>Weather Dashboard for {location.city}</h1>

      {/* Dropdown to select number of days */}
      <label htmlFor="days">Select number of days: </label>
      <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
        <option value={1}>1 Day</option>
        <option value={3}>3 Days</option>
        <option value={7}>7 Days</option>
      </select>

      {/* Summary Cards for Current Weather */}
      <div className="summary-cards">
        <div className="summary-card">
          <h2>Current Temperature</h2>
          <p>{currentWeather.temperature}°C</p>
        </div>
        <div className="summary-card">
          <h2>Windspeed</h2>
          <p>{currentWeather.windspeed} km/h</p>
        </div>
        <div className="summary-card">
          <h2>Weather Code</h2>
          <p>{currentWeather.weathercode}</p>
        </div>
      </div>

      {/* Line Chart for Hourly Temperature Trends */}
      <h2>Hourly Temperature Trends</h2>
      <Line data={temperatureChartData} options={lineChartOptions} />

      {/* Line Chart for Hourly Precipitation Trends */}
      <h2>Hourly Precipitation Trends</h2>
      <Line data={precipitationChartData} options={lineChartOptions} />
    </div>
  );
};

export default Dashboard;
