$(document).ready(function() {
  $('#cities').on('change', function() {
    const selectedValue = $(this).val();
    // Passes the value selected into the function.
    renderWeatherData(selectedValue);
    $('#citySearch').val('');
  });

  $('#citySearch').keyup(function() {
    const citySearchValue = $(this).val();
    // Passes the value selected into the function.
    renderWeatherData(citySearchValue);
    $('#cities').val('');
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

const renderWeatherData = async city => {
  try {
    $('.weather-data').remove();

    const data = await $.getJSON(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c494b73b8224a7e0c94b4119d630a204`
    );
  
    const { name, dt } = data;
    const { temp_min, temp_max, temp, humidity } = data.main;
    const { speed } = data.wind;
    const { all } = data.clouds;
    const { description } = data.weather[0];
  
    const weatherData = $(`<div class="weather-data"></div>`);
  
    const upperData = renderWeatherDataUpper({temp_min, temp, temp_max, description});
    const lowerData = renderWeatherDataLower({name, dt, all, speed, humidity});
  
    upperData.appendTo(weatherData);
    lowerData.appendTo(weatherData);
  
    weatherData.appendTo($('body'));
  } catch (error) {
    if (error.status !== 404) {
      console.log("unexpected error:", error);
    }
  }
};

const renderWeatherDataUpper = ({temp_min, temp, temp_max, description}) => {
  const weatherDataUpper = $(
    `<div class="weather-data__upper"></div>`
  );

  const weatherDataTemperature = $(
    `<div class="weather-data__temperature"></div>`
  ).appendTo(weatherDataUpper);

  const weatherDataTemperatureItemMin = $(
    `<h3 class="weather-data__temperature-item weather-data__temperature-item--min"></h3>`
  ).appendTo(weatherDataTemperature);

  $(
    `<span class="weather-data__temperature-value">${temperatureConverter(
      temp_min
    )}</span>`
  ).appendTo(weatherDataTemperatureItemMin);

  const weatherDataTemperatureItemMain = $(
    `<h2 class="weather-data__temperature-item weather-data__temperature-item--main"></h2>`
  ).appendTo(weatherDataTemperature);

  $(
    `<span class="weather-data__temperature-value">${temperatureConverter(
      temp
    )}</span>`
  ).appendTo(weatherDataTemperatureItemMain);

  const weatherDataTemperatureItemMax = $(
    `<h3 class="weather-data__temperature-item weather-data__temperature-item--max"></h3>`
  ).appendTo(weatherDataTemperature);

  $(
    `<span class="weather-data__temperature-value">${temperatureConverter(
      temp_max
    )}</span>`
  ).appendTo(weatherDataTemperatureItemMax);

  $(`<h4 class="weather-data__description">${description}</h4>`).appendTo(
    weatherDataUpper
  );

  return weatherDataUpper;
};

const renderWeatherDataLower = ({name, dt, all, speed, humidity}) => {
  const weatherDataLower = $(
  `<div class="weather-data__lower"></div>`
  );

  $(`<h3 class="weather-data__location">${name}</h3>`).appendTo(
    weatherDataLower
  );

  $(`<h4 class="weather-data__time">${timestampConverter(dt)}</h4>`).appendTo(
    weatherDataLower
  );

  const weatherDataFigures = $(
    `<div class="weather-data__figures"></div>`
  ).appendTo(weatherDataLower);

  const weatherDataFigureCloud = $(
    `<div class="weather-data__figure"></div>`
  ).appendTo(weatherDataFigures);

  $(`<span class="weather-data__figure-name">Clouds</span>`).appendTo(
    weatherDataFigureCloud
  );

  $(`<span class="weather-data__figure-value">${all}%</span>`).appendTo(
    weatherDataFigureCloud
  );

  const weatherDataFigureWind = $(
    `<div class="weather-data__figure"></div>`
  ).appendTo(weatherDataFigures);

  $(`<span class="weather-data__figure-name">Wind</span>`).appendTo(
    weatherDataFigureWind
  );

  $(`<span class="weather-data__figure-value">${speed} m/s</span>`).appendTo(
    weatherDataFigureWind
  );

  const weatherDataFigureHumidity = $(
    `<div class="weather-data__figure"></div>`
  ).appendTo(weatherDataFigures);

  $(`<span class="weather-data__figure-name">Wind</span>`).appendTo(
    weatherDataFigureHumidity
  );

  $(`<span class="weather-data__figure-value">${humidity}%</span>`).appendTo(
    weatherDataFigureHumidity
  );

  return weatherDataLower;
}
