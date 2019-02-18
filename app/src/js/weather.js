$(document).ready(function() {
  // Checks for change and then renders the wanted data.
  $('#cities').on('change', function() {
    const selectedValue = $(this).val();
    // Passes the value selected into the function.
    renderWeatherData(selectedValue);
    // Sets value to empty string
    $('#citySearch').val('');
  });

  // Checks for change and then renders the wanted data.
  $('#citySearch').keyup(function() {
    const citySearchValue = $(this).val();
    // Passes the value selected into the function.
    renderWeatherData(citySearchValue);
    // Sets value to empty string
    $('#cities').val('');
  });
});

// Converts temperature from kelvin to celcius (as default), fahrenheit possible as well.
const temperatureConverter = (temp, unit = 'celcius') =>
  unit === 'fahrenheit'
    ? Math.round((temp - 273.15) * 1.8 + 32)
    : Math.round(temp - 273.15);

// Converts UNIX timestamp into DAY NAME | MONTH DAY | TIME format.
const timestampConverter = timestamp => {
  const date = new Date(timestamp * 1000);
  const hours = '0' + date.getHours();
  const minutes = '0' + date.getMinutes();
  const currentDay = date.getDay();
  const currentDate = '0' + date.getDate();
  const currentMonth = date.getMonth();
  // Set day name abbreviations into array.
  const dayNameArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // Set month name abbreviations into array.
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
  // Returns wanted format.
  return `${dayNameArray[currentDay]} | ${
    monthNameArray[currentMonth]
  } ${currentDate.substr(-2)} | ${hours.substr(-2)}:${minutes.substr(-2)}`;
};

// Function that renders given city name in the parameter.
const renderWeatherData = async city => {
  // Parent element declaration.
  const weatherData = $(`<div class="weather-data"></div>`);

  // Try catch for error handling.
  try {
    $('.weather-data').remove();

    // Gets the data from API where parameter is the city wanted.
    const data = await $.getJSON(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c494b73b8224a7e0c94b4119d630a204`
    );
  
    // Variables for data from the Weather API.
    const { name, dt } = data;
    const { temp_min, temp_max, temp, humidity } = data.main;
    const { speed } = data.wind;
    const { all } = data.clouds;
    const { description } = data.weather[0];
  
  
    // Renders upper and lower sections of the the weather-data element.
    const upperData = renderWeatherDataUpper({temp_min, temp, temp_max, description});
    const lowerData = renderWeatherDataLower({name, dt, all, speed, humidity});
  
    // Appends upper and lower elements to the parent element.
    upperData.appendTo(weatherData);
    lowerData.appendTo(weatherData);
  
  } catch (error) {
    // On error status 404 will render text.
    if (error.status !== 404) {
      console.log("unexpected error:", error);
      $('<h2 style="text-align: center;">Unexpexted error, please try again later.</h2>').appendTo(weatherData);
    }
  }

  weatherData.appendTo($('body'));
};

// Function to render upper data section.
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

// Function to render lower data section.
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
