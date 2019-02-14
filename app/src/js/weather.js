$(document).ready(function() {
  renderWeatherData();
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

const renderWeatherData = () => {
  $.getJSON(
    'http://api.openweathermap.org/data/2.5/weather?q=berlin&appid=c494b73b8224a7e0c94b4119d630a204',
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

      const weatherData = $('<div></div>', { class: 'weather-data' });

      const weatherDataUpper = $('<div></div>', {
        class: 'weather-data__upper',
      }).appendTo(weatherData);

      const weatherDataTemperature = $('<div></div>', {
        class: 'weather-data__temperature',
      }).appendTo(weatherDataUpper);

      const weatherDataTemperatureItemMin = $('<h3></h3>', {
        class:
          'weather-data__temperature-item weather-data__temperature-item--min',
      }).appendTo(weatherDataTemperature);

      const weatherDataTemperatureItemMinValue = $('<span></span>', {
        class: 'weather-data__temperature-value',
        text: temperatureConverter(temperatureMin),
      }).appendTo(weatherDataTemperatureItemMin);

      const weatherDataTemperatureItemMain = $('<h2></h2>', {
        class:
          'weather-data__temperature-item weather-data__temperature-item--main',
      }).appendTo(weatherDataTemperature);

      const weatherDataTemperatureItemMainValue = $('<span></span>', {
        class: 'weather-data__temperature-value',
        text: temperatureConverter(currentTemperature),
      }).appendTo(weatherDataTemperatureItemMain);

      const weatherDataTemperatureItemMax = $('<h3></h3>', {
        class:
          'weather-data__temperature-item weather-data__temperature-item--max',
      }).appendTo(weatherDataTemperature);

      const weatherDataTemperatureItemMaxValue = $('<span></span>', {
        class: 'weather-data__temperature-value',
        text: temperatureConverter(temperatureMax),
      }).appendTo(weatherDataTemperatureItemMax);

      const weatherDataDescription = $('<h4></h4>', {
        class: 'weather-data__description',
        text: currentWeather,
      }).appendTo(weatherDataUpper);

      const weatherDataLower = $('<div></div>', {
        class: 'weather-data__lower',
      }).appendTo(weatherData);

      const weatherDataLocation = $('<h3></h3>', {
        class: 'weather-data__location',
        text: cityName,
      }).appendTo(weatherDataLower);

      const weatherDataTime = $('<h3></h3>', {
        class: 'weather-data__time',
        text: timestampConverter(dataCalculation),
      }).appendTo(weatherDataLower);

      const weatherDataFigures = $('<div></div>', {
        class: 'weather-data__figures',
      }).appendTo(weatherDataLower);

      const weatherDataFigureCloud = $('<div></div>', {
        class: 'weather-data__figure',
      }).appendTo(weatherDataFigures);

      const weatherDataFigureCloudName = $('<span></span>', {
        class: 'weather-data__figure-name',
        text: 'Clouds',
      }).appendTo(weatherDataFigureCloud);

      const weatherDataFigureCloudValue = $('<span></span>', {
        class: 'weather-data__figure-value',
        text: `${cloudinessPercent}%`,
      }).appendTo(weatherDataFigureCloud);

      const weatherDataFigureWind = $('<div></div>', {
        class: 'weather-data__figure',
      }).appendTo(weatherDataFigures);

      const weatherDataFigureWindName = $('<span></span>', {
        class: 'weather-data__figure-name',
        text: 'Wind',
      }).appendTo(weatherDataFigureWind);

      const weatherDataFigureWindValue = $('<span></span>', {
        class: 'weather-data__figure-value',
        text: `${windSpeed} m/s`,
      }).appendTo(weatherDataFigureWind);

      const weatherDataFigureHumidity = $('<div></div>', {
        class: 'weather-data__figure',
      }).appendTo(weatherDataFigures);

      const weatherDataFigureHumidityName = $('<span></span>', {
        class: 'weather-data__figure-name',
        text: 'Humidity',
      }).appendTo(weatherDataFigureHumidity);

      const weatherDataFigureHumidityValue = $('<span></span>', {
        class: 'weather-data__figure-value',
        text: `${humidityPercent}%`,
      }).appendTo(weatherDataFigureHumidity);

      weatherData.appendTo($('body'));
    }
  );
};
