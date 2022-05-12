var results;
var city_name;

if (localStorage.getItem("citylist") == null) {
    localStorage.setItem("citylist", '[]');
}

function displayWeather(num) {

    var weatherdate1Timestamp = results.daily[num].dt
    var tempDate = new Date(weatherdate1Timestamp * 1000);

    var weatherdate1 = (tempDate.getMonth() + 1) + "/" + tempDate.getDate() + "/" + tempDate.getFullYear()
    document.getElementById("weatherdate" + num).innerText = city_name + " " + weatherdate1;

    document.getElementById("weathertemp" + num).innerText = results.daily[num].temp.day

    document.getElementById("weatherwind" + num).innerText = results.daily[num].wind_speed

    document.getElementById("weatherhumid" + num).innerText = results.daily[num].humidity

    document.getElementById("weathericon" + num).setAttribute("src", "Images/" + results.daily[num].weather[0].icon + ".png")

    if (num == 0) {
        document.getElementById("uv").innerText = results.daily[num].uvi

        var uvi = parseFloat(results.daily[num].uvi);

        if (uvi <= 2) {
            document.getElementById("uv").classList.add("bg-low");
        }
        if (uvi > 2 && uvi <= 5) {
            document.getElementById("uv").classList.add("bg-medium");
        }
        if (uvi > 5 && uvi <= 7) {
            document.getElementById("uv").classList.add("bg-high");
        }
        if (uvi > 7 && uvi <= 10) {
            document.getElementById("uv").classList.add("bg-veryHigh");
        }
        if (uvi > 10) {
            document.getElementById("uv").classList.add("bg-extremelyHigh");
        }


    }
}

function loadWeatherData(lat, long) {

    const Http = new XMLHttpRequest();
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&appid=f4422f4cb3a82e450745466518b05ea6';
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



//loadWeatherData(33.44,-94.5);
function refreshHistory() {
    var currentCityList = localStorage.getItem("citylist");

    currentCityList = JSON.parse(currentCityList);

    var outputHtml = '';
    for (let i = 0; i < currentCityList.length; i++) {
        outputHtml += '<li><button onclick="searchButton(\'' + currentCityList[i] + '\')">' + currentCityList[i] + '</button></li>';
    }
    document.getElementById("history").innerHTML = outputHtml;
}

refreshHistory();

function searchButton(cityname = '') {

    var x;
    if (cityname == '') {
        x = document.getElementById("result").value;

        var currentCityList = localStorage.getItem("citylist");

        currentCityList = JSON.parse(currentCityList);
        
        if(currentCityList.indexOf(x) == -1)
        {
        currentCityList.push(x);


        currentCityList = JSON.stringify(currentCityList);
        localStorage.setItem("citylist", currentCityList);
        }
    }
    else {
        x = cityname;
    }




    refreshHistory();

    var cityDetails;
    const Http = new XMLHttpRequest();
    const url = 'https://api.weatherapi.com/v1/current.json?key=ad1e479decca463983d231628220405&q=' + x + '&aqi=no';
    Http.open("GET", url);
    Http.send();


    Http.onload = () => {

        //console.log(Http.responseText);
        cityDetails = JSON.parse(Http.responseText);
        //console.log(cityDetails);
        city_name = cityDetails.location.name 


        loadWeatherData(cityDetails.location.lat, cityDetails.location.lon);
        //loadWeatherData(cityDetails[ cityDetails.location.lat])
    }

    /*
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
     */
}

searchButton('los angeles');

function clearHistory() {
    localStorage.setItem("citylist", '[]');
    refreshHistory();
}


