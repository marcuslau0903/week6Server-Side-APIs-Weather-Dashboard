const renderCities = (citiesFromLocalStorage) => {
    //for each city construct a list item and append to the list group
}

const getCurrentData = (oneApiData) => {
  // from object extract the data points you need for the return data
  return {
    name: "",
    date: "",
    iconURL: "",
    tempreature:"",
    humidity:"",
    windSpeed:"",
    uvIndex:0
  }
}


const fetchAllWeatherData = (cityName) => {
    //construct URL 

    const functionForJSON = (responseObject) => {
        // unless you have some logic here do that before you return
        return responseObject.json()
      }
      const functionForApplication = (dataFromServer) => {
        // whatever your application code is goes here
        //1. from the dataFromServer get the lat and lon
        //2. use lat lon to construct URL and store in variable called oneApiUrl
      }
      const functionToHandleError = (errorObject) => {
        // handle your error here according to your application
      }
      fetch(`api.openweathermap.org/data/2.5/weather?q=${}&appid=deb3f4250cb3403a6131e817bc7b59a9`)
        .then(weatherApiUrl)
        .then(functionForApplication)
        .catch(functionToHandleError)
}
// function called on load of the document
const onLoad = () => {
    //read from local storage and store data in variable called citiesFromLocalStorage

    // if data is present call renderCities and pass the data from local storage

    // renderCities (citiesFromLocalStorage)

    // get the last city name from citiesFromLocalStorage and store in variable called cityName

    // fetchAllWeatherData(cityName)
}

// function called when the form is submitted
const onSubmit = () => {}

$("#your-form-id").submit(onSubmit)

$(document).ready(onLoad)