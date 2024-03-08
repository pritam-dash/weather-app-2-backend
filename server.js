import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/weather', async (req, res) => {
  const location = req.query.location;
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const apiKey = process.env.WEATHER_API_KEY;
  //const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&q=${location}&appid=${apiKey}&units=metric`;

  let apiUrl = `http://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=metric`;

  if (location) {
    apiUrl += `&q=${location}`;
  } else if (latitude && longitude) {
    apiUrl += `&lat=${latitude}&lon=${longitude}`;
  } else {
    return res.status(400).json({ error: 'Location or coordinates are required' });
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running!`);
});