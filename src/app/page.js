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
import mist from '../app/public/icons/mist.svg'
import visibility from '../app/public/icons/visibility.svg'
import clouds from '../app/public/icons/clouds.svg'
import drizzle from '../app/public/icons/drizzle.svg'
import thunderstorm from '../app/public/icons/thunderstorm.svg'
import snow from '../app/public/icons/snow.svg'
import rain from '../app/public/icons/rain.svg'
import useIntersectionObserver from './hooks/useInterSectionObserver';




export default function Home() {

  const [city, setCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState([]);
  const apiKey = "40fa755c9a24007a9e44a697310fae37";

  const FadeInSection = ({ children }) => {
    const [isVisible, elementRef] = useIntersectionObserver();

    return (
      <div
        ref={elementRef}
        className={`fade-in ${isVisible ? 'visible' : ''}`}
      >
        {children}
      </div>
    );
  };


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
      case 'Mist':
        return mist;
      default:
        return clear; // Fallback icon
    }
  };

  const convertToMph = (speedInMps) => {
    return (speedInMps * 2.237).toFixed(2); // Membulatkan hasil ke dua desimal
  };

  return (
    <div className="relative max-w-screen max-h-screen">
      <Image
        src={weather2}
        layout="fill"
        objectFit="cover"
        alt="weather"
        className="absolute inset-0 z-[-1]"
      />
      <div className="absolute top-40 left-10 flex gap-5">
      <form onSubmit={handleSearch} className="flex justify-between items-center gap-4">
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent text-white outline-none border rounded-lg py-1 px-5 " placeholder="Search locations"/>
        <button type="submit" className="text-white border rounded-lg px-5 py-1">Search</button>
      </form>
      </div>
      <main className="w-screen h-screen flex">
        <div className="md:bg-white/10 md:backdrop-blur-lg w-full h-full p-10 flex justify-center items-center">
          {/* Konten aplikasi di sini */}
          <div className="relative">
            <Image
              src={weather2}
              objectFit="contain"
              alt="weather"
              width={2000}
              className="inset-0 w-[1500px] h-[400px] object-cover rounded"
            />
            <div className="absolute hidden md:flex z-10 top-5 left-5">
              <div className="flex w-screen justify-between gap-5">
                <form onSubmit={handleSearch} className="flex justify-between items-center gap-4">
                  <input type="text"
                    placeholder="Search locations"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none text-white text-lg md:text-3xl placeholder-gray-400"/>
                  <button type="submit" className="border text-white md:px-4 md:py-2 rounded-lg">Search</button>
                </form>
              </div>
            </div>
            {/* Current Location */}
            <div className="absolute top-10 right-10 text-white hidden md:flex flex-col justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 md:size-12 text-white text-right">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <h3 className="text-xl">{weather.name}, {weather.sys ? weather.sys.country : ''}</h3>
            </div>
            {/* Weather Details */}
            <div className="md:bg-white/20 md:backdrop-blur-xl backdrop-blur-sm absolute top-0 md:relative h-full flex md:flex-row flex-col items-center w-full md:h-36 rounded-bl rounded-br divide-y md:divide-x md:divide-y-0 overflow-y-auto">
              <div className="md:w-2/6 md:mt-0 mt-16 flex justify-center items-center gap-8 p-4">
              {/* <FadeInSection> */}
              <div className="absolute flex gap-2 items-center top-10 md:hidden text-white text-center">
                {/* <h1 className="font-semibold text-lg">My location</h1> */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 md:size-12 text-white text-right">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <p className="text-xl font-semibold">{weather.name}, {weather.sys ? weather.sys.country : ''}</p>
              </div>
                <div className="md:flex-row flex-col-reverse flex gap-4">
                  <div className="w-[150px] text-center flex justify-center flex-col flex-shrink-0">
                    <h1 className="text-center text-5xl font-normal text-white">{weather.main ? Math.round(weather.main.temp) : ''}<sup className="text-3xl">°C</sup></h1>
                    <p className="capitalize text-white text-lg">Feels like: {weather.main ? Math.round(weather.main.feels_like) : ''} <sup className="text-sm">°C</sup></p>
                  </div>
                  {weather && weather.weather && weather.weather.length > 0 && (
                    <div className="w-[150px] text-center flex flex-col flex-shrink-0 justify-center items-center">
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
              {/* </FadeInSection> */}
              </div>
              <div className="md:w-4/6 w-[355px] grid grid-cols-2 py-5 gap-8 md:gap-0 place-items-center md:flex md:divide-x md:divide-y-0">
                <div className="flex w-1/2 flex-nowrap md:w-1/5 flex-col items-center justify-center gap-2">
                  <span className="text-white font-normal">Min. Temp</span>
                  <Image src={tempMin} className="w-10" alt="alt"/>
                  <span className="text-white text-md font-normal">{ weather.main ? Math.round(weather.main.temp_min) : '' } <sup className="text-md">°C</sup></span>
                </div>
                <div className="flex w-1/2 flex-nowrap md:w-1/5 flex-col items-center justify-center gap-2">
                  <span className="text-white font-normal">Max. Temp</span>
                  <Image src={tempMax} className="w-10" alt="alt"/>
                  <span className="text-white text-md font-normal">{ weather.main ? Math.round(weather.main.temp_max) : '' } <sup className="text-md">°C</sup></span>
                </div>
                <div className="flex w-1/2 flex-nowrap md:w-1/5 flex-col items-center justify-center gap-2">
                  <span className="text-white font-normal">Wind</span>
                  <Image src={wind} className="w-10" alt="alt"/>
                  <span className="text-white text-md whitespace-nowrap font-normal">{weather.wind ? convertToMph(weather.wind.speed) : ''}mph / {weather.wind ? weather.wind.deg : ''}°</span>
                </div>
                <div className="flex w-1/2 flex-nowrap md:w-1/5 flex-col items-center justify-center gap-2">
                  <span className="text-white font-normal">Humidity</span>
                  <Image src={humidity} className="w-10" alt="alt"/>
                  <span className="text-white text-md font-normal">{ weather.main ? weather.main.humidity : '' }%</span>
                </div>
                <div className="flex w-1/2 flex-nowrap md:w-1/5 flex-col items-center justify-center gap-2">
                  <span className="text-white font-normal">Visibility</span>
                  <Image src={visibility} className="w-10" alt="alt"/>
                  <span className="text-white text-md font-normal">{ weather.main ? parseInt(weather.visibility / 1000) : '' } km</span>
                </div>
             </div>
            </div>
          </div>
        </div>
      </main>
  </div>
  );
}
