# Weather App 🌤️

A modern, responsive weather application built with HTML, CSS, and JavaScript that provides current weather conditions and 5-day forecasts for any city worldwide.

## Features ✨

- **Current Weather Display**: Temperature, weather description, feels like, humidity, wind speed, and visibility
- **5-Day Forecast**: Detailed weather predictions for the next 5 days
- **Location-Based Weather**: Get weather for your current location using geolocation
- **Search by City**: Search for weather in any city worldwide
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dynamic Backgrounds**: Background changes based on weather conditions
- **Local Storage**: Remembers your last searched city
- **Modern UI**: Beautiful gradient backgrounds and smooth animations
- **Error Handling**: User-friendly error messages for invalid cities or network issues

## Setup Instructions 🚀

### 1. Get an API Key
1. Go to [OpenWeatherMap](https://openweathermap.org/)
2. Sign up for a free account
3. Navigate to your API keys section
4. Copy your API key

### 2. Configure the App
1. Open `script.js`
2. Replace `'YOUR_API_KEY_HERE'` on line 2 with your actual API key:
   ```javascript
   const API_KEY = 'your_actual_api_key_here';
   ```

### 3. Run the Application
1. Open `index.html` in your web browser
2. Or use a local server for better development experience:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

## Usage 📱

1. **Search by City**: Type a city name in the search box and press Enter or click the search button
2. **Use Current Location**: Click the "Use My Location" button to get weather for your current location
3. **View Forecast**: Scroll down to see the 5-day weather forecast
4. **Responsive Design**: The app adapts to different screen sizes automatically

## API Information 🔗

This app uses the OpenWeatherMap API:
- **Current Weather**: `https://api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast**: `https://api.openweathermap.org/data/2.5/forecast`
- **Units**: Metric (Celsius, km/h)
- **Rate Limit**: 1000 calls/day (free tier)

## File Structure 📁

```
WeatherApp/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality and API calls
└── README.md           # This file
```

## Features in Detail 🔍

### Current Weather Display
- City name and country
- Current temperature in Celsius
- Weather description (e.g., "scattered clouds")
- Weather icon from OpenWeatherMap
- Detailed information:
  - Feels like temperature
  - Humidity percentage
  - Wind speed in km/h
  - Visibility in kilometers

### 5-Day Forecast
- Daily weather predictions
- Date and day of the week
- Weather icon for each day
- Temperature and description
- Hover effects for better UX

### Location Features
- Geolocation support for current location
- Automatic city name detection
- Fallback error handling for location services

### UI/UX Features
- Loading spinner during API calls
- Error messages for invalid cities
- Smooth animations and transitions
- Dynamic background colors based on weather
- Mobile-responsive design
- Local storage for user preferences

## Browser Compatibility 🌐

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Troubleshooting 🔧

### Common Issues:

1. **"City not found" error**
   - Check the spelling of the city name
   - Try using the city name in English
   - Ensure the city exists in the OpenWeatherMap database

2. **Location not working**
   - Allow location access in your browser
   - Check if your browser supports geolocation
   - Try refreshing the page

3. **API errors**
   - Verify your API key is correct
   - Check if you've exceeded the daily API limit
   - Ensure you have an active internet connection

## Customization 🎨

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --text-color: #333;
    --background-color: #f8f9fa;
}
```

### Adding New Features
The modular JavaScript structure makes it easy to add new features:
- Temperature unit toggle (Celsius/Fahrenheit)
- Additional weather data (UV index, pressure, etc.)
- Weather alerts and notifications
- Historical weather data

## License 📄

This project is open source and available under the [MIT License](LICENSE).

## Contributing 🤝

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

## Support 💬

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the OpenWeatherMap API documentation
3. Open an issue on the project repository

---

**Happy Weather Tracking! ☀️🌧️❄️** 