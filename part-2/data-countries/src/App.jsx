import axios from "axios";
import { useEffect, useState } from "react";

const CountriesList = ({ country }) => {
  const [showCountry, setShowCountry] = useState(false);

  return (
    <div>
      {country.name.common}{" "}
      <button onClick={() => setShowCountry(!showCountry)}>
        {showCountry ? "hide" : "show"}
      </button>
      {showCountry && <CountryDescription country={country} />}
    </div>
  );
};

const CountryDescription = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  const api_key = import.meta.env.VITE_SOME_KEY;
  const langs = [];

  for (const language in country.languages) {
    langs.push(country.languages[language]);
  }

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`
      )
      .then((res) => setWeatherData(res.data))
      .catch((err) => console.error(err));
  }, [api_key, country.latlng]);

  const weatherImageData = weatherData?.weather[0];

  return (
    <div>
      <h1>{country.name.common}</h1>

      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>

      <h2>languages</h2>
      <ul>
        {langs.map((lang, i) => (
          <li key={i}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt} />

      <h2>Weather in {country.capital[0]}</h2>
      <div>temperature {weatherData?.main?.temp}</div>
      <img
        src={`https://openweathermap.org/img/wn/${weatherImageData?.icon}@2x.png`}
        alt={weatherImageData?.description}
      />
      <div>wind {weatherData?.wind?.speed} m/s</div>
    </div>
  );
};

const SearchBar = ({ handleInputMessage }) => {
  return (
    <div>
      find countries{" "}
      <input onChange={(e) => handleInputMessage(e.target.value)} />
    </div>
  );
};

const SearchResult = ({ countries }) => {
  if (!countries.length) return <div>not found</div>;

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countries.length <= 10 && countries.length > 1) {
    return countries.map((country, i) => (
      <CountriesList key={i} country={country} />
    ));
  }

  return <CountryDescription country={countries[0]} />;
};

const App = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((res) => {
        setCountries(
          res.data.filter((country) =>
            country.name.common
              .toLocaleLowerCase()
              .includes(inputMessage.toLocaleLowerCase())
          )
        );
      })
      .catch((err) => console.error(err));
  }, [inputMessage]);

  return (
    <>
      <SearchBar handleInputMessage={setInputMessage} />
      {Boolean(inputMessage) && <SearchResult countries={countries} />}
    </>
  );
};

export default App;
