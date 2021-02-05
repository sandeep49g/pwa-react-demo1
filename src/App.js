import React, { useState } from 'react';

import { fetchWeather } from './api/fetchWeather';
import './App.css';

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [mode, setMode] = useState('online');

    const search = async (e) => {
        if(e.key === 'Enter') {
            try {
                const data = await fetchWeather(query);
                setWeather(data);
                setQuery('');
                setMode('online');
            }
            catch(error) {
                setMode('offline');
            }
        }
    }

    return (
        <div className="main-container">
            {mode === 'offline' && (
                <div className="alert alert-warning" role="alert">
                    you are in offline mode or some issue with connection
                </div>
            )}
            <input type="text"
                className="search"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}onKeyPress={search}
            />
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
