async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "5df5c11f3c6f1628a78fcf958cc02088";

    const errorMsg = document.getElementById("errorMsg");
    const card = document.getElementById("weatherCard");

    // Validation: Empty input
    if (city === "") {
        errorMsg.textContent = "⚠ Please enter a city name";
        card.classList.add("hidden");
        return;
    }

    errorMsg.textContent = "Loading...";
    card.classList.add("hidden");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        errorMsg.textContent = "";

        card.innerHTML = `
            <h2>${data.name}</h2>
            <p>🌡 <b>${data.main.temp}°C</b></p>
            <p>☁ ${data.weather[0].description}</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬 Wind: ${data.wind.speed} m/s</p>
        `;

        card.classList.remove("hidden");

    } catch (error) {
        errorMsg.textContent = "❌ City not found";
        card.classList.add("hidden");
    }
}

// Enter key support
document.getElementById("cityInput")
.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        getWeather();
    }
});