async function getWeather() {
  const h1 = document.getElementById("temp");
  try {
    const response = await axios.get(
      "http://api.weatherapi.com/v1/current.json?key=8a27eb6a0aff4b4c9a7231822220310&q=Salvador&aqi=no"
    );

    console.log(response);

    changeBack(response.data.current.is_day); // Change background

    if (dayOrNight(response.data.current.is_day)) {
      h1.innerHTML = `<span style="color: #fff">${response.data.current.temp_c}°</span> <i style="color: #ffc72a" class="bx bxs-sun"></i>`;
    } else {
      h1.innerHTML = `<span style="color: #fff">${response.data.current.temp_c}°</span> <i style="color: #ffc72a" class="bx bxs-moon"></i>`;
    }

    fellsLike(response.data.current.feelslike_c); // Get feels like

    day_and_time(getDay(), getHours());

    createUvIndice(response.data.current.uv);

    creatHumidity(response.data.current.humidity);

    createWind(response.data.current.wind_kph);
  } catch (error) {
    console.error(error);
  }
}

function dayOrNight(value) {
  if (value === 1) {
    return true; //day
  }
  return false; // night
}

function fellsLike(like) {
  let fells = document.getElementById("fells_like");
  fells.innerText = `Sensação térmica de ${like}°`;
}

function changeBack(value) {
  let video = document.getElementById("video_back");
  if (dayOrNight(value)) {
    video.innerHTML = `<source src="Assets/video/sun.mp4" type="video/mp4"></source>`;
  } else {
    video.innerHTML = `<source src="Assets/video/night.mp4" type="video/mp4"></source>`;
  }
}

function getDay() {
  let day = new Date().getDay();
  switch (day) {
    case 0:
      return "dom";
      break;

    case 1:
      return "seg";
      break;

    case 2:
      return "ter";
      break;

    case 3:
      return "qua";
      break;

    case 4:
      return "qui";
      break;

    case 5:
      return "sex";
      break;

    case 6:
      return "sáb";
      break;

    default:
      break;
  }
}

function uvIndice(x) {
  if (x < 2) {
    return "Baixo";
  } else if (x >= 3 && x <= 5) {
    return "Moderado";
  } else if (x >= 6 && x <= 7) {
    return "Alto";
  } else if (x >= 8 && x <= 10) {
    return "Muito Alto";
  } else {
    return "Extremo";
  }
}

function createUvIndice(value) {
  let getUv = uvIndice(value);
  let uvElement = document.getElementById("uv");
  uvElement.innerHTML = `<p class="card-text"><i style="color: #ffc72a" class="bx bxs-sun"></i> Índice UV: ${getUv}</p>`;
}

function getHours() {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  return `${hour}:${minute}`;
}

function day_and_time(day, hour) {
  let day_and_time = document.getElementById("day_time");
  day_and_time.innerText = `${day}, ${hour}`;
}

console.log(getDay());

function creatHumidity(value) {
  let humidity = document.getElementById("drop");
  humidity.innerHTML = `<p class="card-text"><i style="color: #91cffe" class="bx bxs-droplet"></i> Umidade: ${value}%</p>`;
}

function createWind(value) {
  let wind = document.getElementById("wind");
  wind.innerHTML = `<p class="card-text"><i style="color: #bebebe" class="bx bx-wind"></i> Vento: ${value} km/h</p>`;
}
