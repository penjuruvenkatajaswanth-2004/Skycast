// ====== CONFIG ======
const API_KEY = "cc625f6c28d851cf4e4c6a193d0e3981";
const BASE = "https://api.openweathermap.org/data/2.5/weather";

// Debug: confirm script loaded
console.log('weather.js loaded');
console.log('API_KEY:', API_KEY ? 'Present' : 'Missing');

// ====== DOM ======
const cityInput = document.getElementById('city');
const searchBtn = document.getElementById('searchBtn');
const geoBtn = document.getElementById('geoBtn');

const card = document.getElementById('card');
const errBox = document.getElementById('error');
const loader = document.getElementById('loading');

const cityName = document.getElementById('cityName');
const updatedAt = document.getElementById('updatedAt');
const icon = document.getElementById('icon');
const temp = document.getElementById('temp');
const desc = document.getElementById('desc');
const feels = document.getElementById('feels');
const humid = document.getElementById('humid');
const wind = document.getElementById('wind');

// ====== HELPERS ======
function show(el) { el.style.display = 'block'; }
function hide(el) { el.style.display = 'none'; }

function showError(message) {
  console.error('Error:', message);
  errBox.textContent = message;
  show(errBox);
  hide(card);
  hide(loader);
}
function clearError() { 
  errBox.textContent = ''; 
  hide(errBox); 
}

function renderWeather(data) {
  console.log('Rendering weather data:', data);
  
  try {
    cityName.textContent = `${data.name}, ${data.sys?.country ?? ''}`.trim();
    temp.textContent = Math.round(data.main.temp);
    desc.textContent = data.weather?.[0]?.description ?? '-';
    feels.textContent = Math.round(data.main.feels_like);
    humid.textContent = data.main.humidity;
    wind.textContent = data.wind.speed;

    const iconCode = data.weather?.[0]?.icon;
    icon.src = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : '';
    icon.style.display = iconCode ? 'block' : 'none';

    updatedAt.textContent = new Date(data.dt * 1000).toLocaleString();
    clearError();
    show(card);
    hide(loader);
  } catch (error) {
    console.error('Error rendering weather:', error);
    showError('Failed to display weather data. Please try again.');
  }
}

async function getByCity(city) {
  const trimmedCity = city?.trim();
  
  if (!trimmedCity) {
    showError('Please type a city name.');
    return;
  }
  
  if (!API_KEY || API_KEY.length < 20) {
    showError('Invalid API key. Please check your OpenWeatherMap API key.');
    return;
  }
  
  hide(card); 
  clearError(); 
  show(loader);
  
  try {
    const url = `${BASE}?q=${encodeURIComponent(trimmedCity)}&appid=${API_KEY}&units=metric`;
    console.log('Fetching URL:', url);
    
    const res = await fetch(url);
    console.log('Response status:', res.status);
    
    const data = await res.json();
    console.log('Response data:', data);
    
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('City not found. Please check the spelling.');
      } else if (res.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
      } else if (data.message) {
        throw new Error(data.message);
      } else {
        throw new Error(`Request failed with status ${res.status}`);
      }
    }
    
    if (!data || !data.main) {
      throw new Error('Invalid response from weather service.');
    }
    
    renderWeather(data);
  } catch (e) {
    console.error('Fetch error:', e);
    showError(e.message || 'Something went wrong. Please try again.');
  }
}

async function getByCoords(lat, lon) {
  if (!API_KEY || API_KEY.length < 20) {
    showError('Invalid API key. Please check your OpenWeatherMap API key.');
    return;
  }
  
  hide(card); 
  clearError(); 
  show(loader);
  
  try {
    const url = `${BASE}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    console.log('Fetching coordinates URL:', url);
    
    const res = await fetch(url);
    console.log('Response status:', res.status);
    
    const data = await res.json();
    console.log('Response data:', data);
    
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
      } else if (data.message) {
        throw new Error(data.message);
      } else {
        throw new Error(`Request failed with status ${res.status}`);
      }
    }
    
    if (!data || !data.main) {
      throw new Error('Invalid response from weather service.');
    }
    
    renderWeather(data);
  } catch (e) {
    console.error('Fetch error:', e);
    showError(e.message || 'Could not get weather for your location. Please try a city search instead.');
  }
}

// ====== EVENTS ======
searchBtn.addEventListener('click', () => {
  console.log('Search button clicked. City:', cityInput.value);
  getByCity(cityInput.value);
});

cityInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    console.log('Enter pressed. City:', cityInput.value);
    getByCity(cityInput.value);
  }
});

geoBtn.addEventListener('click', () => {
  console.log('Geolocation button clicked');
  
  if (!('geolocation' in navigator)) {
    showError('Geolocation not supported by your browser.');
    return;
  }
  
  show(loader);
  clearError();
  
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      console.log('Got coordinates:', latitude, longitude);
      getByCoords(latitude, longitude);
    },
    (err) => {
      console.error('Geolocation error:', err);
      hide(loader);
      if (err.code === err.PERMISSION_DENIED) {
        showError('Location permission denied. Please type a city instead.');
      } else if (err.code === err.POSITION_UNAVAILABLE) {
        showError('Location unavailable. Please type a city instead.');
      } else {
        showError('Could not get your location. Please type a city instead.');
      }
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
  );
});
