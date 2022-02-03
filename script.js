let weather = {
    "apikey" : "cae5e1923965a0ab98d286b5734e5c65",
    fetchWeather : function(city){
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?q='
             + city 
             + '&units=metric&appid='
             + 'cae5e1923965a0ab98d286b5734e5c65'
            )
            .then((response) => {
                if (!response.ok) {
                  alert("No weather found.");
                  throw new Error("No weather found.");
                }
                return response.json();
              })
            .then((data) => this.displayWeather(data));
    },
    displayWeather : function(data){
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector("#city").innerHTML = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector("#description").innerHTML = description
        document.querySelector("#temperature").innerHTML = temp + "°C";
        document.querySelector("#humidity").innerHTML = "Humidity: " + humidity + "%";
        document.querySelector("#wind-speed").innerHTML = "Wind Speed: " + speed + "kmph";
        document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + description + "')";
    },
    search : function(){
        this.fetchWeather(document.querySelector("#search-bar").value);
    },

};

document.querySelector("#search-box button").addEventListener("click", function(){
    weather.search();
});

document.querySelector("#search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("Nandigama");