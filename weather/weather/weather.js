const apiKey = 'a9fa26b0315d19e27581d7b01fd4cfcd';

        function getWeather() {
            const cityInput = document.getElementById('cityInput');
            const cityName = cityInput.value;

            if (cityName === '') {
                alert('Please enter a city name.');
                return;
            }

            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    alert('Error fetching weather data. Please try again.');
                });
        }

        function displayWeather(data) {
            const weatherInfoDiv = document.getElementById('weatherInfo');

            // Clear previous weather information
            weatherInfoDiv.innerHTML = '';

            const cityName = data.city.name;

            // Create a container for weather cards
            const weatherCardsContainer = document.createElement('div');
            weatherCardsContainer.classList.add('weather-cards');

            // Loop through the forecast list for the next 3 days
            for (let i = 0; i < 3; i++) {
                const forecast = data.list[i * 8];
                const date = new Date(forecast.dt * 1000);
                const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

                const temperature = forecast.main.temp;
                const description = forecast.weather[0].description;
                const iconCode = forecast.weather[0].icon;

                // Create a weather card
                const weatherCard = document.createElement('div');
                weatherCard.classList.add('weather-card');

                const weatherHtml = `
                    <h2>${cityName}</h2>
                    <p>${dayOfWeek}</p>
                    <p>Date: ${date.toDateString()}</p>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Description: ${description}</p>
                    <img class="weather-icon" src="https://openweathermap.org/img/w/${iconCode}.png" alt="Weather Icon">
                `;

                weatherCard.innerHTML = weatherHtml;
                weatherCardsContainer.appendChild(weatherCard);
            }

            // Append the weather cards container to the main div
            weatherInfoDiv.appendChild(weatherCardsContainer);
        }