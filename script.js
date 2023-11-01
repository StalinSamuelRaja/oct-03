fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    const divEle = document.createElement("div");
    divEle.setAttribute("id", "div");
    document.body.append(divEle);

    divEle.innerHTML = `
      <div class="container">
        <div class="row" id="cardRow">
        </div>
      </div>
    `;

    const cardRow = document.getElementById("cardRow");

    data.forEach((element) => {
      const countryObject = {
        ...element,
        name: element.name.common,
        flag: element.flags.png,
        capital: element.capital,
        region: element.region,
        countryCode: element.cca3 ? element.cca3 : "no countrycode",
      };

      countryCard(countryObject, cardRow);
    });
  });

function countryCard(element, cardRow) {
  cardRow.innerHTML += `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card" style="width: 18rem;">
        <h3>${element.name}</h3>
        <img src="${element.flag}" class="card-img-top rounded m-auto p-2" alt="${element.name}">
        <div class="card-body">
          <p id="cap"><span>Capital: ${element.capital} </span></p>
          <p id="reg"><span>Region: ${element.region}</span></p>
          <p id="cc"><span>Country Code: ${element.countryCode} </span></p>
          <button class="btn btn-primary" data-capital="${element.capital}">Click for Weather</button>
        </div>
      </div>
    </div>
  `;

  const weatherButtons = document.querySelectorAll('button.btn-primary');

  weatherButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const capital = button.getAttribute("data-capital");
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=64f0b4d5a5028cc3d9a1315cde8009bb`)
        .then((response) => response.json())
        .then((weatherData) => {
          alert(`Weather in ${capital}:\nTemperature: ${weatherData.main.temp}°C\nWeather: ${weatherData.weather[0].description}`);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    });
  });
}
