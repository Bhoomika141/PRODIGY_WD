const apiKey = '4dd13f8780262788f03089ea3f48d557'; 

document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value;
    fetchWeather(location);
});

function fetchWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            document.getElementById('weatherDisplay').innerText = error.message;
        });
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    const { main, weather, name } = data;
    const temperature = main.temp;
    const description = weather[0].description;

    weatherDisplay.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Conditions: ${description}</p>
    `;
}
