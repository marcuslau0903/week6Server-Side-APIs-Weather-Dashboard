const myApiKey = "deb3f4250cb3403a6131e817bc7b59a9"

const getFromLocalStorage = () => {
  // retrieve, parse data string from LS to an object
  const localStorageData = JSON.parse(localStorage.getItem("cities"))
  if (localStorageData === null) {
    return []
  } else {
    return localStorageData
  }
}

const fetchData = async (url) => {
  try {
    const response = await fetch(url);

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const onSubmit = (event) => { 
  event.preventDefault()

  // target user input value
  const cityName = $("#searchInput").val()
  // get cities array from LS
  const cities = getFromLocalStorage()
  
  const index = cities.indexOf(cityName)

  if (index <= -1) {
  cities.push(cityName)
  localStorage.setItem("cities", JSON.stringify(cities))

  renderCitiesFromLocalStorage()

  $("#searchInput").val("")

  renderAllCards(cityName)
  }
  
}

const getDataByCityName = async (event) => {
  const target = $(event.target);
  if (target.is("li")) {
    const cityName = target.data("city");

    renderAllCards(cityName);
  }
};

const transformCurrentDayData = (data, name) => {
  const current = data.current;
  return {
    cityName: name,
    temperature: current.temp,
    humidity: current.humidity,
    windSpeed: current.wind_speed,
    date: moment.unix(current.dt).format("MM/DD/YYYY"),
    iconURL: `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`,
    uvi: current.uvi,
  };
};

const transformForecastData = (data) => {
  return {
    date: moment.unix(data.dt).format("MM/DD/YYYY"),
    iconURL: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    temperature: data.temp.day,
    humidity: data.humidity,
  };
};
//set place holders for API URLS 
const renderAllCards = async (cityName) => {
  const currentDayUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${myApiKey}`;
  
  const currentDayResponse = await fetchData(currentDayUrl);
  
  const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentDayResponse.coord.lat}&lon=${currentDayResponse.coord.lon}&exclude=minutely,hourly&units=metric&appid=${myApiKey}`;

  const forecastResponse = await fetchData(forecastUrl);
  console.log(forecastResponse)
  const cardsData = forecastResponse.daily.map(transformForecastData);
  
  $("#parentForCastContainer").empty();

  cardsData.slice(1, 6).forEach(renderForecastCard);

  const currentDayData = transformCurrentDayData(
    forecastResponse,
    currentDayResponse.name
  );
console.log(currentDayData)
  renderCurrentDayCard(currentDayData);
};

const renderCitiesFromLocalStorage = () => {
  $("#searchedCities").empty()
  //get cities from LS
  const cities = getFromLocalStorage()
  console.log(cities)
  //create list here
  const ul = $("<ul>").addClass("list-group","gap-3","bg-warning","fw-bold");
  
  const appendListItemToUl = (city) => {
    const li = $("<li>")
      .addClass("list-group-item","rounded-3","bg-warning","fw-bold")
      .attr("data-city", city) 
      .text(city);

    ul.append(li);
  };

  cities.forEach(appendListItemToUl);

  ul.on("click", getDataByCityName);
  
  $("#searchedCities").append(ul);
}

const renderCurrentDayCard = (data) => {
  $("#disPlayWeatherContainer").empty();

  const card = `<div class="my-2">
    <div>
      <h2>
        ${data.cityName} (${data.date}) <img src="${data.iconURL}" />
      </h2>
      <div class="py-2">Temperature: ${data.temperature}&deg; C</div>
      <div class="py-2">Humidity: ${data.humidity}%</div>
      <div class="py-2">Wind Speed: ${data.windSpeed} MPH</div>
      <div class="py-2">UV Index: <span class="">${data.uvi}</span></div>
    <h2 class="text-center my-4">5-Day Forecast</h2>
    </div>
  </div>`;
  $("#disPlayWeatherContainer").append(card);
};

const clear = () => {
localStorage.clear()
console.log(localStorage)
$("#searchedCities").empty()
}


const renderForecastCard = (data) => {
  const card = `<div class="card mh-100 bg-warning text-dark rounded card-block">
    <h5 class="card-title p-1">${data.date}</h5>
    <img src="${data.iconURL}"/>
    <h6 class="card-subtitle mb-2 text-dark p-md-2">
      Temperature: ${data.temperature}&deg; C
    </h6>
    <h6 class="card-subtitle mb-2 text-dark p-md-2">
      Humidity: ${data.humidity}%
    </h6>
  </div>`;
  $("#parentForCastContainer").append(card);
};


const onReady = () => {
  renderCitiesFromLocalStorage()
}

$("#search-by-city-form").on("submit", onSubmit)
$("#clearBtn").on("click",clear)
$(document).ready(onReady)