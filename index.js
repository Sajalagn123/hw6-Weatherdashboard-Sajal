// Step 1: Have current and future weather conditions for the city present and added to search history
// Step 2: Have city name, date, weather icon, temperature, humidity, wind speed, and UV index displayed when current weather conditions for city is viewed
// Step 3: Have UV index that indicates if weather conditions are favorable, moderate, or severe
// Step 4: Have 5-day forecast that diaplays future conditions for the city, including weather icon, date, temperature, wind speed, and humidity
// Step 5: Have present and future conditions for city displayed when user clicks on city in search history

/** Refreshes the weather data */
var results;

function displayWeather(num) {

    var weatherdate1Timestamp = results.daily[num].dt
    var tempDate = new Date(weatherdate1Timestamp * 1000);

    var weatherdate1 = (tempDate.getMonth() + 1) + "/" + tempDate.getDate() + "/" + tempDate.getFullYear()
    document.getElementById("weatherdate" + num).innerText = weatherdate1;

    document.getElementById("weathertemp" + num).innerText = results.daily[num].temp.day

    document.getElementById("weatherwind" + num).innerText = results.daily[num].wind_speed

    document.getElementById("weatherhumid" + num).innerText = results.daily[num].humidity

    document.getElementById("weathericon" + num).setAttribute("src", "Images/" + results.daily[num].weather[0].icon + ".png")

    if (num == 0) {
        document.getElementById("uv").innerText = results.daily[num].uvi
    }
}

function loadWeatherData(lat,long) {

    const Http = new XMLHttpRequest();
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&appid=0803a401b3162ccbcd5921eef9926928';
    Http.open("GET", url);
    Http.send();


    Http.onload = () => {

        //console.log(Http.responseText);
        results = JSON.parse(Http.responseText);
        //console.log(results);
        displayWeather(0);
        displayWeather(1);
        displayWeather(2);
        displayWeather(3);
        displayWeather(4);
        displayWeather(5);

    }

}

loadWeatherData(33.44,-94.5);

function searchButton()
{
    var x = document.getElementById("result").value;
    //x = x.toLowerCase();
    var cities = {
        "austin":{lat:30.405790218321375,long:-97.88649374062982},
        "chicago":{lat:41.85292874764548,long:-87.68034246651565},
        "newyork":{lat:40.71557974781632,long:-73.99059576070117},
        "orlando":{lat:28.541429731701104,long:-81.3948051893707},
        "sanfrancisco":{lat:37.75293193702904,long:-122.46502842767454},
        "seattle":{lat:47.60912956410058,long:-122.32284713614095},
        "denver":{lat:39.730952219760034,long:-104.88812580261084},
        "atlanta":{lat:33.767018443344284,long: -84.45562831872064},

    }
    x = x.replace(' ', '').toLowerCase();
    console.log(cities[x].long)
    loadWeatherData(cities[x].lat, cities[x].long);
}



