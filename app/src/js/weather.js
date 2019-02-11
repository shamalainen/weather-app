$(document).ready(function() {
  renderWeatherData();
});

const temperatureConverter = (temp, unit = 'celcius') => unit === 'fahrenheit' ? Math.round(((temp - 273.15) * 1.8)+32) : Math.round((temp - 273.15));

const timestampConverter = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  return `${hours}:${minutes.substr(-2)}`;
}

const renderWeatherData = () => {
  $.getJSON( "http://api.openweathermap.org/data/2.5/weather?q=london&appid=c494b73b8224a7e0c94b4119d630a204", function( data ) {
    const cityName = data['name'];
    const dataCalculation = data['dt'];
    const currentWeather = data['weather'][0]['description'];
    const currentWeatherIcon = data['weather'][0]['icon'];
    const currentTemperature = data['main']['temp'];
    const temperatureMax = data['main']['temp_max'];
    const temperatureMin = data['main']['temp_min'];
    const timeSunrise = data['sys']['sunrise'];
    const timeSunset = data['sys']['sunset'];
  });
};