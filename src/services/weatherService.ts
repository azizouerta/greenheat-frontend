// src/services/weatherService.ts
const API_URL = "http://localhost:5000/weather"; // Assuming Flask runs on port 5000

export const fetchWeatherData = async () => {
  try {
    const response = await fetch(API_URL);
    console.log(response)
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};