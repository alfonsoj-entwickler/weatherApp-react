import { createContext, useState } from "react";
import axios from "axios";

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [search, setSearch] = useState({
    city: "",
    country: "",
  });

  const [ result, setResult ] = useState({});
  const [ noResult, setNoResult ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const dataSearch = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const queryWeather = async data => {
    setLoading(true);
    setNoResult(false);
    try {
        const { city, country } = data;
        const appID = import.meta.env.VITE_API_KEY;
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=${1}&appid=${appID}`
 
        const { data: coordinates } = await axios(url);
        const { lat, lon } = coordinates[0];

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appID}`
        const { data: currentWeather} = await axios(weatherUrl);
        setResult(currentWeather);
        
    } catch (error) {
        console.error(error);
        setNoResult(true);

    } finally {
      setLoading(false);
    }
  }

  return (
    <WeatherContext.Provider value={{ search, result, loading, noResult, dataSearch, queryWeather, setLoading }}>
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherProvider };

export default WeatherContext;
