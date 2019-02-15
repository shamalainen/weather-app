$(document).ready(function() {
  $("#cities").on('change', function() {
    const selectedValue = $(this).val();    
    // Passes the value selected into the function.
    renderWeatherData(selectedValue);
    $("#citySearch").val('');
  });
  
  $("#citySearch").keyup(function() {
    const citySearchValue = $(this).val();
    // Passes the value selected into the function.
    renderWeatherData(citySearchValue)
    $("#cities").val('');
  });
});

const temperatureConverter = (temp, unit = 'celcius') =>
  unit === 'fahrenheit'
    ? Math.round((temp - 273.15) * 1.8 + 32)
    : Math.round(temp - 273.15);

const timestampConverter = timestamp => {
  const date = new Date(timestamp * 1000);
  const hours = '0' + date.getHours();
  const minutes = '0' + date.getMinutes();
  const currentDay = date.getDay();
  const currentDate = '0' + date.getDate();
  const currentMonth = date.getMonth();
  const dayNameArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const monthNameArray = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${dayNameArray[currentDay - 1]} | ${
    monthNameArray[currentMonth]
  } ${currentDate.substr(-2)} | ${hours.substr(-2)}:${minutes.substr(-2)}`;
};

const renderWeatherData = (city) => {
  $('.weather-data').remove();
  $.getJSON(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c494b73b8224a7e0c94b4119d630a204`,
    function(data) {
      const cityName = data.name;
      const dataCalculation = data.dt;
      const currentWeather = data.weather[0].description;
      const currentTemperature = data.main.temp;
      const temperatureMax = data.main.temp_max;
      const temperatureMin = data.main.temp_min;
      const cloudinessPercent = data.clouds.all;
      const humidityPercent = data.main.humidity;
      const windSpeed = data.wind.speed;

      const weatherData = $(`<div class="weather-data"></div>`);

      const weatherDataUpper = $(
        `<div class="weather-data__upper"></div>`
      ).appendTo(weatherData);

      const weatherDataTemperature = $(
        `<div class="weather-data__temperature"></div>`
      ).appendTo(weatherDataUpper);

      const weatherDataTemperatureItemMin = $(
        `<h3 class="weather-data__temperature-item weather-data__temperature-item--min"></h3>`
      ).appendTo(weatherDataTemperature);

      const weatherDataTemperatureItemMinValue = $(
        `<span class="weather-data__temperature-value">${temperatureConverter(
          temperatureMin
        )}</span>`
      ).appendTo(weatherDataTemperatureItemMin);

      const weatherDataTemperatureItemMain = $(
        `<h2 class="weather-data__temperature-item weather-data__temperature-item--main"></h2>`
      ).appendTo(weatherDataTemperature);

      const weatherDataTemperatureItemMainValue = $(
        `<span class="weather-data__temperature-value">${temperatureConverter(
          currentTemperature
        )}</span>`
      ).appendTo(weatherDataTemperatureItemMain);

      const weatherDataTemperatureItemMax = $(
        `<h3 class="weather-data__temperature-item weather-data__temperature-item--max"></h3>`
      ).appendTo(weatherDataTemperature);

      const weatherDataTemperatureItemMaxValue = $(
        `<span class="weather-data__temperature-value">${temperatureConverter(
          temperatureMax
        )}</span>`
      ).appendTo(weatherDataTemperatureItemMax);

      const weatherDataDescription = $(
        `<h4 class="weather-data__description">${currentWeather}</h4>`
      ).appendTo(weatherDataUpper);

      const weatherDataLower = $(
        `<div class="weather-data__lower"></div>`
      ).appendTo(weatherData);

      const weatherDataLocation = $(
        `<h3 class="weather-data__location">${cityName}</h3>`
      ).appendTo(weatherDataLower);

      const weatherDataTime = $(
        `<h4 class="weather-data__time">${timestampConverter(
          dataCalculation
        )}</h4>`
      ).appendTo(weatherDataLower);

      const weatherDataFigures = $(
        `<div class="weather-data__figures"></div>`
      ).appendTo(weatherDataLower);

      const weatherDataFigureCloud = $(
        `<div class="weather-data__figure"></div>`
      ).appendTo(weatherDataFigures);

      const weatherDataFigureCloudName = $(
        `<span class="weather-data__figure-name">Clouds</span>`
      ).appendTo(weatherDataFigureCloud);

      const weatherDataFigureCloudValue = $(
        `<span class="weather-data__figure-value">${cloudinessPercent}%</span>`
      ).appendTo(weatherDataFigureCloud);

      const weatherDataFigureWind = $(
        `<div class="weather-data__figure"></div>`
      ).appendTo(weatherDataFigures);

      const weatherDataFigureWindName = $(
        `<span class="weather-data__figure-name">Wind</span>`
      ).appendTo(weatherDataFigureWind);

      const weatherDataFigureWindValue = $(
        `<span class="weather-data__figure-value">${windSpeed} m/s</span>`
      ).appendTo(weatherDataFigureWind);

      const weatherDataFigureHumidity = $(
        `<div class="weather-data__figure"></div>`
      ).appendTo(weatherDataFigures);

      const weatherDataFigureHumidityName = $(
        `<span class="weather-data__figure-name">Wind</span>`
      ).appendTo(weatherDataFigureHumidity);

      const weatherDataFigureHumidityValue = $(
        `<span class="weather-data__figure-value">${humidityPercent}%</span>`
      ).appendTo(weatherDataFigureHumidity);

      weatherData.appendTo($('body'));
    }
  );
};
