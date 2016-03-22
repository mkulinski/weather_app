/**
 * Created by mkulinski on 3/21/2016.
 */
$(document).ready(function(){

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            getWeather(position.coords.latitude, position.coords.longitude);
        });

        function getWeather(lat, long){
            var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?lat="+ lat + "&lon=" + long + "&units=imperial&APPID=1556cb820c9c2e8046f7758288e4089f";

            $.getJSON(weatherAPI, function (data) {
                var weatherCon = data.weather[0].description;

                $(".myCity").html(data.name);
                $(".myTemp").html(parseInt(data.main.temp));

                $("button").on("click", function() {
                    var el = $(this);
                    if (el.text() == el.data("text-swap")) {
                        el.text(el.data("text-original"));
                        $(".myTemp").html(parseInt(data.main.temp));
                    } else {
                        el.data("text-original", el.text());
                        el.text(el.data("text-swap"));
                        $(".myTemp").html(parseInt((data.main.temp-32) / 1.8));
                    }
                });


                if (weatherCon === "clear sky" || weatherCon === "few clouds"){
                    console.log("Sunny!");
                } else if (weatherCon === "scattered clouds" || weatherCon === "broken clouds"){
                    $('.full').css('background', "url(img/cloudy.jpg) no-repeat center center fixed");
                } else if (weatherCon === "shower rain" || weatherCon === "rain"){
                    $('.full').css('background', "url(img/rain.jpg) no-repeat center center fixed");
                } else if (weatherCon === "thunderstorm"){
                    $('.full').css('background', "url(img/tstorm.jpg) no-repeat center center fixed");
                } else if (weatherCon === "snow"){
                    $('.full').css('background', "url(img/snow.jpg) no-repeat center center fixed");
                } else if (weatherCon === "mist"){
                    $('.full').css('background', "url(img/fog.jpg) no-repeat center center fixed");
                }
            });
        }
    }
});