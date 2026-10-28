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