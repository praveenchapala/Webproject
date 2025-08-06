// OpenWeatherMap API Configuration
const API_KEY = '8409127200824e55d4f9aa1b25007650'; // Your API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorMessage = document.getElementById('errorMessage');

// Weather display elements
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
const weatherIcon = document.getElementById('weatherIcon');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const visibility = document.getElementById('visibility');
const forecastGrid = document.getElementById('forecastGrid');

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherByCity(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherByCity(city);
        }
    }
});

locationBtn.addEventListener('click', getWeatherByLocation);

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('Weather App initialized');
    console.log('API Key:', API_KEY ? 'Set' : 'Missing');
    
    // Check if user has a saved city
    const savedCity = localStorage.getItem('lastCity');
    if (savedCity) {
        console.log('Loading saved city:', savedCity);
        cityInput.value = savedCity;
        getWeatherByCity(savedCity);
    } else {
        console.log('No saved city found');
    }
});

// API Functions
async function getWeatherByCity(city) {
    showLoading();
    hideError();
    
    try {
        console.log(`Fetching weather for city: ${city}`);
        
        // Get current weather
        const currentWeather = await fetchWeatherData(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
        
        // Get 5-day forecast
        const forecast = await fetchWeatherData(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`);
        
        displayWeather(currentWeather, forecast);
        localStorage.setItem('lastCity', city);
        
    } catch (err) {
        console.error('Error fetching weather data:', err);
        showError(`Error: ${err.message}. Please check the city name and try again.`);
    }
}

async function getWeatherByLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser.');
        return;
    }
    
    showLoading();
    hideError();
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            
            try {
                console.log(`Fetching weather for location: ${latitude}, ${longitude}`);
                
                // Get current weather by coordinates
                const currentWeather = await fetchWeatherData(`${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`);
                
                // Get 5-day forecast by coordinates
                const forecast = await fetchWeatherData(`${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`);
                
                displayWeather(currentWeather, forecast);
                cityInput.value = currentWeather.name;
                localStorage.setItem('lastCity', currentWeather.name);
                
            } catch (err) {
                console.error('Error fetching location weather:', err);
                showError('Unable to get weather data for your location. Please try again.');
            }
        },
        (err) => {
            console.error('Geolocation error:', err);
            showError('Unable to get your location. Please check your browser settings and try again.');
        }
    );
}

async function fetchWeatherData(url) {
    try {
        console.log('Fetching URL:', url);
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('API Error:', errorData);
            
            if (response.status === 401) {
                throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
            } else if (response.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            } else if (response.status === 429) {
                throw new Error('API rate limit exceeded. Please try again later.');
            } else {
                throw new Error(`API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
            }
        }
        
        const data = await response.json();
        console.log('Weather data received:', data);
        return data;
        
    } catch (err) {
        console.error('Fetch error:', err);
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
            throw new Error('Network error. Please check your internet connection.');
        }
        throw err;
    }
}

// Display Functions
function displayWeather(currentWeather, forecast) {
    hideLoading();
    
    // Display current weather
    cityName.textContent = `Weather in ${currentWeather.name}, ${currentWeather.sys.country}`;
    temperature.textContent = Math.round(currentWeather.main.temp);
    weatherDescription.textContent = currentWeather.weather[0].description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;
    
    // Weather details
    feelsLike.textContent = Math.round(currentWeather.main.feels_like);
    humidity.textContent = currentWeather.main.humidity;
    windSpeed.textContent = Math.round(currentWeather.wind.speed * 3.6); // Convert m/s to km/h
    visibility.textContent = (currentWeather.visibility / 1000).toFixed(1);
    
    // Display forecast
    displayForecast(forecast);
}

function displayForecast(forecast) {
    forecastGrid.innerHTML = '';
    
    // Get daily forecasts (every 24 hours)
    const dailyForecasts = forecast.list.filter((item, index) => index % 8 === 0).slice(1, 6);
    
    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="forecast-date">${dayName}<br>${monthDay}</div>
            <div class="forecast-icon">
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
            </div>
            <div class="forecast-temp">${Math.round(day.main.temp)}°C</div>
            <div class="forecast-desc">${day.weather[0].description}</div>
        `;
        
        forecastGrid.appendChild(card);
    });
}

// Utility Functions
function showLoading() {
    loading.classList.add('show');
    document.querySelector('.weather-container').style.display = 'none';
}

function hideLoading() {
    loading.classList.remove('show');
    document.querySelector('.weather-container').style.display = 'block';
}

function showError(message) {
    hideLoading();
    errorMessage.textContent = message;
    error.classList.add('show');
    document.querySelector('.weather-container').style.display = 'none';
}

function hideError() {
    error.classList.remove('show');
    document.querySelector('.weather-container').style.display = 'block';
}

// Weather icon mapping for better visual representation
const weatherIcons = {
    '01d': '☀️',
    '01n': '🌙',
    '02d': '⛅',
    '02n': '☁️',
    '03d': '☁️',
    '03n': '☁️',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌧️',
    '09n': '🌧️',
    '10d': '🌦️',
    '10n': '🌧️',
    '11d': '⛈️',
    '11n': '⛈️',
    '13d': '❄️',
    '13n': '❄️',
    '50d': '🌫️',
    '50n': '🌫️'
};

// Add some additional features
function addWeatherFeatures() {
    // Add temperature unit toggle
    let isCelsius = true;
    
    // Add background based on weather
    function updateBackground(weatherCode) {
        const body = document.body;
        const hour = new Date().getHours();
        const isDay = hour >= 6 && hour <= 18;
        
        if (weatherCode.startsWith('01')) {
            // Clear sky
            body.style.background = isDay 
                ? 'linear-gradient(135deg, #87CEEB 0%, #98D8E8 100%)'
                : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
        } else if (weatherCode.startsWith('02') || weatherCode.startsWith('03') || weatherCode.startsWith('04')) {
            // Cloudy
            body.style.background = 'linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)';
        } else if (weatherCode.startsWith('09') || weatherCode.startsWith('10')) {
            // Rain
            body.style.background = 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)';
        } else if (weatherCode.startsWith('11')) {
            // Thunderstorm
            body.style.background = 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)';
        } else if (weatherCode.startsWith('13')) {
            // Snow
            body.style.background = 'linear-gradient(135deg, #dfe6e9 0%, #b2bec3 100%)';
        } else if (weatherCode.startsWith('50')) {
            // Mist
            body.style.background = 'linear-gradient(135deg, #dcdde1 0%, #a4b0be 100%)';
        }
    }
    
    // Update the displayWeather function to include background changes
    const originalDisplayWeather = displayWeather;
    displayWeather = function(currentWeather, forecast) {
        originalDisplayWeather(currentWeather, forecast);
        updateBackground(currentWeather.weather[0].icon);
    };
}

// Initialize additional features
addWeatherFeatures(); 