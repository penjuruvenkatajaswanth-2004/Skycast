# 🌤️ Simple Weather App

A lightweight, responsive **Weather App** built using **HTML**, **CSS**, and **JavaScript**, powered by the **OpenWeatherMap API**.  
It allows users to search for weather by city name or automatically fetch the weather using their **current location**.

---

## 🚀 Features

- 🔍 **Search by City:** Enter any city name to view live weather details.
- 📍 **Use My Location:** Automatically fetches weather using your device's location (with permission).
- 🌡️ **Live Weather Data:** Shows temperature, humidity, wind speed, and weather description.
- 🕒 **Real-time Updates:** Displays the last updated time.
- 🖼️ **Weather Icons:** Uses OpenWeatherMap icons to represent conditions visually.
- ⚡ **Error Handling:** Handles invalid cities, API issues, and location permission errors gracefully.

---

## 🧩 Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS)
- **API:** [OpenWeatherMap API](https://openweathermap.org/current)
- **Data Format:** JSON

---

## 🛠️ How to Use

1. **Clone this repository**
   ```bash
   git clone https://github.com/<your-username>/simple-weather-app.git
   cd simple-weather-app
   ```

2. **Open the project**
   - Simply open `weather.html` in your browser.

3. **Set up your API key**
   - Open `weather.js`
   - Replace the placeholder key with your own from [OpenWeatherMap](https://home.openweathermap.org/api_keys):
     ```js
     const API_KEY = "your_api_key_here";
     ```

4. **Run locally**
   - You can double-click `weather.html` to open it, or run it with a simple HTTP server:
     ```bash
     python -m http.server 8000
     ```
   - Then visit [http://localhost:8000](http://localhost:8000)

---

## 🖥️ Demo Preview

| City Search  | Current Location |
|--------------|------------------|
| ![City Search Demo](https://via.placeholder.com/300x200?text=Search+by+City) | ![Location Demo](https://via.placeholder.com/300x200?text=Use+My+Location) |

*(You can replace the images above with screenshots of your running app.)*

---

## 📚 Project Structure

```
📦 simple-weather-app
 ┣ 📜 weather.html      # Main UI
 ┣ 📜 weather.js        # API logic & event handling
 ┣ 📜 style.css         # Styling (not shown in repo snippet)
 ┗ 📜 README.md         # Project documentation
```

---

## ⚠️ Notes

- Requires a valid **OpenWeatherMap API key** to fetch weather data.
- Works best over **HTTPS** if using location services.
- Designed for educational and demo purposes.

---

## 🧑‍💻 Author

**Your Name**  
📫 [GitHub Profile](https://github.com/<your-username>)  
💡 Feel free to fork and improve!

---

## 📄 License

This project is open source and available under the Jaswanth.

---

> 🌦️ *"Check the sky before you fly — with Simple Weather App!"*
