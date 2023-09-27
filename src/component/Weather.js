import React, { useState } from 'react';
import './weather.css';
import sun from './sun.png';
import rain from './rain.png';
import party from './party.png';
import thunder from './thunder.png';
import clouds from './clouds.png';
import wind from './wind.png';
import pressur from './pressur.png';
import humidity from './humidity.png';
import vesibilit from './vesibilit.png';
import moon from './moon.jpg';
import cloud from './cloud.png';

export default function Weather() {
    const apikey = '532708bb665417b4bc5a333afec1330b';

    const [inputValue, setInputValue] = useState('');
    const [temperature, setTemperature] = useState('30°C');
    const [mintemprature, setmintemprature] = useState('30°C');
    const [maxtemprature, setmaxtemprature] = useState('30°C');
    const [location, setLocation] = useState('London');
    const [windspeed, setwindspeed] = useState('14');
    const [humedity, sethumidity] = useState('34');
    const [pressure, setpressure] = useState('78');
    const [vesibility, setvesibility] = useState('09');
    const [icon, seticon] = useState('');
    const [cld, setcld] = useState('');


    const update = async () => {
        if (inputValue === '') {
            return;
        } else {
            try {
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=Metric&appid=${apikey}`;
                let data = await fetch(url);
                let parsedata = await data.json();
                setTemperature(parsedata.main.temp + '°C');
                setLocation(parsedata.name);
                setwindspeed(parsedata.wind.speed + 'KM')
                sethumidity(parsedata.main.humidity + '%')
                setpressure(parsedata.main.pressure + '%')
                setvesibility(parsedata.visibility + '%')
                setcld( 'Clouds '+ parsedata.clouds.all +'%')
                setmintemprature('Min ' + parsedata.main.temp_min +"°C")
                setmaxtemprature('Min ' + parsedata.main.temp_max +"°C")
                if (parsedata.weather[0].icon === '01d') {
                    seticon(sun)
                } else if(parsedata.weather[0].icon === '01n'){
                  seticon(moon)
                }
                else if (parsedata.weather[0].icon === '02d' || parsedata.weather[0].icon === '02n') {
                    seticon(party)
                }
                else if (parsedata.weather[0].icon === '03d' || parsedata.weather[0].icon === '03n') {
                    seticon(clouds)
                }
                else if (parsedata.weather[0].icon === '04d' || parsedata.weather[0].icon === '04n') {
                    seticon(clouds)
                }
                else if (parsedata.weather[0].icon === '10d' || parsedata.weather[0].icon === '10n') {
                    seticon(rain)
                }
                else if (parsedata.weather[0].icon === '11d' || parsedata.weather[0].icon === '11n') {
                    seticon(thunder)
                } else {
                    seticon(sun)
                }
            } catch (error) {
                console.log(error)
            }
        }
    };
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const dayIndex = currentDate.getDay();
    const dayOfWeek = daysOfWeek[dayIndex];

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="main-container">
            <div className="container">
                <div className="search-bar">
                    <input type="text" id="input" value={inputValue} onChange={handleInputChange} />
                    <button onClick={update}>Search</button>
                </div>
                <div className="weather-data">
                    <div className="weather-info">
                        <h2>{location}</h2>
                        <h1>{temperature}</h1>
                        <div className="wholetemp">
                            <h4>{mintemprature}</h4>
                            <h4>{maxtemprature}</h4>
                        </div>
                        <h3>{dayOfWeek}</h3>
                    </div>
                    <div className="weather-image">
                        <img src={icon} alt="" />
                    </div>
                </div>
                <div className="clouds">
                    <img src={cloud} alt="" />
                    <span>{cld}</span>
                </div>
                <div className="weather-phase1">
                    <div className="wind-speed bg">
                        <img src={wind} alt="" />
                        <h2>{windspeed}</h2>
                    </div>
                    <div className="Humidity bg">
                    <img src={humidity} alt="" />
                        <h2>{humedity}</h2>
                    </div>
                </div>
                <div className="weather-phase2">
                    <div className="uv-index bg">
                    <img src={pressur} alt="" />
                        <h2>{pressure}</h2>
                    </div>
                    <div className="visibility bg">
                    <img src={vesibilit} alt="" />
                        <h2>{vesibility}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
