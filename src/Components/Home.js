import React, { Component } from 'react';
import { IoIosSearch } from "react-icons/io";
import { WiCelsius } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
import { WiBarometer } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import { WiSunrise } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";
import { GiSandsOfTime } from "react-icons/gi";
import Day from "./Day"

// GiSandsOfTime

import axios from "axios";
const day = require("./day-night/day.jpeg");
const night = require("./day-night/night.jpg");

const Api_Key = "330216f9e3042b8a57a7865c3de67865";

class Home extends Component {

  state = {
    city: '',
    cityArr: [],
    error: '',
    data: null,
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = async () => {
    let { city, cityArr } = this.state;
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}`)
      .then(
        (res) => {
          console.log(res);
          if (res) {
            cityArr.unshift(res.data.name);
            this.setState({ cityArr, city: '' });
          };
        },
        (error) => {
          if (error && city.length !== 0) {
            this.setState({
              error: "error"
            });
          };
        });
  };

  getWeatherFromCity = async (city) => {
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}&units=metric`)
      .then(
        (res) => {
          if (res) {
            this.setState({
              data: res.data
            })
          }
        });
  }

  render() {
    let { city, cityArr, error, data } = this.state;
    return (
      <div>
        <div className="container">

          {data !== null ? <Day data={this.state.data} /> : null}


          <div className="container__item">
            <img className="img" src={day} />
            <div className="container__item__block container__item__block__top">
              <p className="location">Location</p>

              <div className="search__block">
                <input type="text"
                  name="city"
                  value={city}
                  onChange={this.handleChange}
                  onFocus={() => this.setState({ error: '' })}
                  className="searchInput"
                />
                <span className="searchIcon" onClick={this.handleSubmit}><IoIosSearch /></span>
              </div>
              <div className="error">{error}</div>
              {cityArr.length ? cityArr.map((m, index) =>
                <div
                  key={index}
                  className="cityes__block"
                >
                  <p onClick={() => this.getWeatherFromCity(m)}>{m}</p>
                </div>) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
