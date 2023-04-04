import { useState, useEffect } from "react";
import axios from "axios";
const apiHost = "https://weather-by-api-ninjas.p.rapidapi.com/v1";
const apiKey = "bd0c87eea4msh70fc55ad498ddc7p1a6cf3jsn7a143442815e";
const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [formValues, setFormValues] = useState("");
  const [cities, setCities] = useState([]);

  const getCityList = () => {
    let options = {
      method: "GET",
      url: "https://city-by-api-ninjas.p.rapidapi.com/v1/city",
      params: { country: "IN", limit: "30" },
      headers: {
        "X-RapidAPI-Key": "bd0c87eea4msh70fc55ad498ddc7p1a6cf3jsn7a143442815e",
        "X-RapidAPI-Host": "city-by-api-ninjas.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((response) => {
        const cityArray = [];
        console.log("Cities", response);
        const city = response?.data?.map((city) => {
          cityArray.push({
            city: city?.name,
          });
          return city?.name;
        });
        console.log(city);
        setCities(cityArray);
      })
      .catch((err) => {});
  };

  const getWeatherData = () => {
    let options = {
      method: "GET",
      url: `${apiHost}/weather`,
      params: { city: formValues },
      headers: {
        "X-RapidAPI-Key": "bd0c87eea4msh70fc55ad498ddc7p1a6cf3jsn7a143442815e",
        "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setWeatherData(response?.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  console.log("weather data", weatherData);
  console.log("cities data", cities);
  const handleFormValues = (e) => {
    const { value } = e.target;
    console.log("value -->", value);
    setFormValues(value);
  };

  const onEnterPressed = (e) => {
    const { key, keyCode } = e;
    if (key === "Enter" || keyCode === 13) {
      getWeatherData();
    }
  };

  useEffect(() => {
    getCityList();
  }, []);

  return (
    <>
      <h1>Weather App</h1>
      <input
        type="text"
        list="cities"
        value={formValues}
        onKeyDown={onEnterPressed}
        onChange={handleFormValues}
      />
      <datalist id="cities">
        {cities?.map((city) => (
          <option>{city?.city}</option>
        ))}
      </datalist>
      <button onClick={getWeatherData}>Get Weather</button>
      <div>
        <ul style={{ padding: 20 }}>
          <li>Temprature:{weatherData?.temp}</li>
          <li>Feels like:{weatherData?.feels_like}</li>
        </ul>
      </div>
    </>
  );
};

export default Weather;
