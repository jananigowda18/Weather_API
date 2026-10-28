async function getWeather() {

    const city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    searchButton.innerText = "⏳ Searching...";
    searchButton.disabled = true;

    const url =
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=yes&alerts=yes`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        console.log(data);

        // Check if city was found
        if (!response.ok) {
            alert("City not found. Please enter a valid city name.");
            return;
        }

        displayWeather(data);

    } catch (error) {

        console.log(error);

        alert("Unable to get weather information.");

    }finally {

        searchButton.innerText = "🔍 Search";
        searchButton.disabled = false;
    }
}
function displayWeather(data) {
    const current = data.current;

    document.getElementById("defaultCloud").style.display = "none";
    document.getElementById("weatherIcon").style.display = "inline-block";

    const location = data.location;
    const today = data.forecast.forecastday[0];

    document.getElementById("cityName").innerText =
        location.name + ", " + location.country;

    document.getElementById("weatherIcon").src =
        "https:" + current.condition.icon;

    document.getElementById("temperature").innerText =
        current.temp_c + "°C";

    document.getElementById("condition").innerText =
        current.condition.text;

    document.getElementById("rainChance").innerText =
        today.day.daily_chance_of_rain + "%";

    document.getElementById("maxTemp").innerText =
        today.day.maxtemp_c + "°C";

    document.getElementById("humidity").innerText =
        current.humidity + "%";

    document.getElementById("wind").innerText =
        current.wind_kph + " km/h";

    generateAdvice(
        today.day.daily_chance_of_rain,
        today.day.maxtemp_c
    );
}
function generateAdvice(rainChance, maxTemp) {

    let advice = "";

    if (rainChance >= 60 && maxTemp >= 35) {

        advice =
            "🌧️🔥 High chance of rain and very hot weather. Carry an umbrella and stay hydrated.";

    }

    else if (rainChance >= 60) {

        advice =
            "☔ Rain is likely today. Carry an umbrella before going outside.";

    }

    else if (maxTemp >= 35) {

        advice =
            "🔥 It may be very hot today. Stay hydrated and avoid prolonged outdoor activity during the hottest part of the day.";

    }

    else if (maxTemp >= 30) {

        advice =
            "🌤️ It will be warm today. Keep yourself hydrated.";

    }

    else {

        advice =
            "😊 Weather looks relatively comfortable today.";

    }

    document.getElementById("advice").innerText = advice;
}
function getMyLocation() {

    const locationButton = document.getElementById("locationButton");

    if (!navigator.geolocation) {
        alert("Your browser does not support location.");
        return;
    }

    locationButton.innerText = "⏳ Finding...";
    locationButton.disabled = true;

    navigator.geolocation.getCurrentPosition(

        async function(position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);

            const url =
                `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=7&aqi=yes&alerts=yes`;

            try {

                const response = await fetch(url);

                const data = await response.json();

                console.log("WeatherAPI response:", data);

                if (!response.ok) {

                    alert(
                        "WeatherAPI Error: " +
                        data.error.message
                    );

                    return;
                }

                displayWeather(data);

            } catch (error) {

                console.error(error);

                alert("Unable to connect to WeatherAPI.");

            } finally {

                locationButton.innerText = "📍 My Location";
                locationButton.disabled = false;
            }
        },

        function(error) {

            console.error("Location error:", error);

            if (error.code === 1) {
                alert("Location permission was denied.");
            }
            else if (error.code === 2) {
                alert("Your location could not be determined.");
            }
            else if (error.code === 3) {
                alert("Location request timed out.");
            }

            locationButton.innerText = "📍 My Location";
            locationButton.disabled = false;
        }
    );
}

