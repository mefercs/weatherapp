import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [data, setData] = useState(null);
  const [parse, setParse] = useState(true);

  console.log("======== We are in a loop? ========");
  useEffect(() => {
    const getData = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      await fetch(`${process.env.REACT_APP_WEATHER_URI}lat=${lat}&lon=${long}`)
        .then((res) => res.json())
        .then((result) => setData(result));
    };
    getData();
  }, [lat, long]);
  return (
    <div className="App">
      {data != null ? (
        <div>
          <p>Latitude: {lat}</p>
          <p>Longitude: {long}</p>
          <h1>JSON INFORMATION</h1>
          <p> Your current temperature on your zone:
            {!data.main
              ? "loading..."
              : parse
              ? data.main.temp
              : (data.main.temp * 1.8 + 32).toFixed(2)}{" "}
            &deg;{parse ? "C" : "F"}
          </p>
          <p>{parse}</p>
          <button onClick={() => setParse(p => !p)}>Farenheit</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
