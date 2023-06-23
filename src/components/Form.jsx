import { useState } from "react";
import { COUNTRIES } from "../constants";
import useWeather from "../hooks/useWeather";

const Form = () => {
  const [alert, setAlert] = useState("");
  const { search, dataSearch, queryWeather } = useWeather();
  const { city, country } = search;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(search).includes("")) {
      setAlert("All field are mandatory");
      return;
    }
    setAlert("");
    queryWeather(search);
  };

  return (
    <div className="contain">
      {alert && <p>{alert}</p>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={dataSearch}
          />
        </div>
        <div className="field">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={country}
            onChange={dataSearch}
          >
            <option value="">Select a country</option>
            {Object.keys(COUNTRIES).map((key) => (
              <option value={key} key={key}>
                {COUNTRIES[key].name}
              </option>
            ))}
          </select>
        </div>
        <input type="submit" value="Get the weather" />
      </form>
    </div>
  );
};

export default Form;
