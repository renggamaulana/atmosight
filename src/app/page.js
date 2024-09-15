"use client"

import Image from "next/image";
import { useState, useEffect } from 'react';
import weather2 from "../app/public/images/weather2.jpg"
import axios from "axios";
import humidity from '../app/public/icons/humidity.svg'
import wind from '../app/public/icons/wind.svg'
import tempMin from '../app/public/icons/temp-min.svg'
import tempMax from '../app/public/icons/temp-max.svg'
import clear from '../app/public/icons/clear.svg'
import sunrise from '../app/public/icons/sunrise.svg'
import visibility from '../app/public/icons/visibility.svg'
import clouds from '../app/public/icons/clouds.svg'
import drizzle from '../app/public/icons/drizzle.svg'
import thunderstorm from '../app/public/icons/thunderstorm.svg'
import snow from '../app/public/icons/snow.svg'
import rain from '../app/public/icons/rain.svg'



export default function Home() {

  const [city, setCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState([]);
  const apiKey = "40fa755c9a24007a9e44a697310fae37"

  useEffect(() => {
    // Fungsi untuk mengambil koordinat pengguna
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            await getCityName(latitude, longitude);
          },
          (error) => {
            setError('Location access denied');
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    getUserLocation();
    fetchWeather();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fungsi untuk mendapatkan nama kota dari API menggunakan koordinat
  const getCityName = async (lat, lon) => {
    try {
      // Menggunakan OpenWeatherMap API sebagai contoh
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const data = await response.json();
      setCity(data.name); // Mengambil nama kota dari respons
    } catch (error) {
      setError('Failed to fetch city name');
    }
  };

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(res.data);
      getWeatherIcon(res.data.weather[0].main);
      setError([]); // Clear error if request is successful
    } catch (err) {
      setError('City not found, please try again.');
      setWeather([]); // Clear weather data if there's an error
    }
  };

  // Panggil fetchWeather setiap kali `city` berubah
  useEffect(() => {
    if (city) {
      fetchWeather();
    }
    // Hanya jalankan ketika `city` berubah
  },[city]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(searchQuery); // Ubah nilai `city` saat submit, bukan saat mengetik
  };

  // Function to map weather conditions to iconsf
  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear':
        return clear;
      case 'Clouds':
        return clouds;
      case 'Drizzle':
        return drizzle;
      case 'Thunderstorm':
        return thunderstorm;
      case 'Rain':
        return rain;
      case 'Snow':
        return snow;
      default:
        return sunrise; // Fallback icon
    }
  };

  const convertToMph = (speedInMps) => {
    return (speedInMps * 2.237).toFixed(2); // Membulatkan hasil ke dua desimal
  };

  return (
    <div className="relative w-screen h-screen">
      <Image
        src={weather2}
        layout="fill"
        objectFit="cover"
        alt="weather"
        className="absolute inset-0 z-[-1]"
      />
      <main className="w-screen h-screen flex">
        <div className="bg-white/10 backdrop-blur-lg w-full h-full p-10 flex justify-center items-center">
          {/* Konten aplikasi di sini */}
          <div className="relative">
            <Image
              src={weather2}
              objectFit="contain"
              alt="weather"
              width={2000}
              className="inset-0 w-[1500px] h-[400px] object-cover rounded"
            />
            <div className="absolute top-5 left-5">
              <div className="flex w-full justify-between gap-5">
                <form onSubmit={handleSearch} className="flex justify-center items-center gap-4">
                  <input type="text"
                    placeholder="Search locations"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none text-white text-3xl placeholder-gray-400"/>
                  <button type="submit" className="border text-white px-4 py-2 rounded-lg">Search</button>
                </form>
              </div>
            </div>
            {/* Current Location */}
            <div className="absolute top-10 right-10 text-white flex flex-col justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12 text-white text-right">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <h3 className="text-xl">{weather.name}, {weather.sys ? weather.sys.country : ''}</h3>
            </div>
            <div className="bg-white/20 backdrop-blur-xl flex w-full h-36 rounded-bl rounded-br flex-wrap divide-y md:flex-nowrap md:divide-x md:divide-y-0 overflow-auto">
              <div className="w-2/6 flex justify-center items-center gap-8 p-4">
                <div className="flex flex-col flex-shrink-0">
                  <h1 className="text-center text-5xl font-normal text-white">{weather.main ? Math.round(weather.main.temp) : ''}<sup className="text-3xl">°C</sup></h1>
                  <p className="capitalize text-white text-lg">Feels like: {weather.main ? Math.round(weather.main.feels_like) : ''} <sup className="text-sm">°C</sup></p>
                </div>
                {weather && weather.weather && weather.weather.length > 0 && (
                  <div className="flex flex-col flex-shrink-0 justify-center items-center">
                    {/* Check if weather and weather.weather[0] exist before accessing them */}
                    <Image
                      src={getWeatherIcon(weather.weather[0].main)}
                      alt={weather.weather[0].main}
                      className="w-12"
                      width={100}
                      height={100}
                    />
                    <p className="capitalize text-white text-lg">{weather.weather ? weather.weather[0].description : ''}</p>
                  </div>
                )}
              </div>
              <div className="w-4/6 flex justify-between md:divide-x md:divide-y-0">
                <div className="flex w-1/5 flex-col items-center justify-center gap-2">
                  <span className="text-white">Min. Temp</span>
                  <Image src={tempMin} className="w-10" alt="alt"/>
                  <span className="text-white text-md font-semibold">{ weather.main ? Math.round(weather.main.temp_min) : '' } <sup className="text-md">°C</sup></span>
                </div>
                <div className="flex w-1/5 flex-col items-center justify-center gap-2">
                  <span className="text-white">Max. Temp</span>
                  <Image src={tempMax} className="w-10" alt="alt"/>
                  <span className="text-white text-md font-semibold">{ weather.main ? Math.round(weather.main.temp_max) : '' } <sup className="text-md">°C</sup></span>
                </div>
                <div className="flex w-1/5 flex-col items-center justify-center gap-2">
                  <span className="text-white">Wind</span>
                  <Image src={wind} className="w-10" alt="alt"/>
                  <span className="text-white text-md font-semibold">{weather.wind ? convertToMph(weather.wind.speed) : ''}mph / {weather.wind ? weather.wind.deg : ''}°</span>
                </div>
                <div className="flex w-1/5 flex-col items-center justify-center gap-2">
                  <span className="text-white">Humidity</span>
                  <Image src={humidity} className="w-10" alt="alt"/>
                  <span className="text-white text-md font-semibold">{ weather.main ? weather.main.humidity : '' }%</span>
                </div>
                <div className="flex w-1/5 flex-col items-center justify-center gap-2">
                  <span className="text-white">Visibility</span>
                  <Image src={visibility} className="w-10" alt="alt"/>
                  <span className="text-white text-md font-semibold">{ weather.main ? parseInt(weather.visibility / 1000) : '' } km</span>
                </div>
             </div>
            </div>
          </div>
        </div>
      </main>
  </div>
  );
}
