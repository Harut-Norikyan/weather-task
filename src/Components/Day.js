import React, {Component} from "react";
import {WiDayCloudy} from "react-icons/wi";
import {WiCelsius} from "react-icons/wi";
import {WiHumidity} from "react-icons/wi";
import {GiSpeedometer} from "react-icons/gi";
// import { WiBarometer } from "react-icons/wi";
import {WiStrongWind} from "react-icons/wi";
import {WiSunrise} from "react-icons/wi";
import {WiSunset} from "react-icons/wi";
import {GiSandsOfTime} from "react-icons/gi";
import {IoMdArrowUp} from "react-icons/io";
import {IoMdArrowDown} from "react-icons/io";
import {MdLocationOn} from "react-icons/md";
import {connect} from 'react-redux';
import MiniWeatherBlock from "./MiniWeatherBlock";

const dayImg = require("./day-night/day.jpeg");
let weekDay = null;
let day = null;

class Day extends Component {
  static propTypes = {};

  getDateFunc = () => {
    let d = new Date();
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    const monthNames = [" Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    weekDay = weekday[d.getDay()]

    day = '' + d.getDate();
    let year = d.getFullYear();
    if (day.length < 2) day = '0' + day;

    let month = monthNames[d.getMonth()];

    let hours = d.getHours();

    let min = d.getMinutes();
    if (min < 10) min = '0' + min;

    return (
      <p className="location__block__time">
        {weekDay + "," + day + " " + month + " " + year + " | " + hours + ":" + min}PM
      </p>)
  };

  render() {
    return (
      <>
        {this.props.data !== null ?
          <div className="container__item">
            <img className="img" src={dayImg} alt="dayImg"/>
            <div className="container__item__block">
              <div className="location__block">

                <div className="location__block__date">
                  {this.getDateFunc()}
                </div>

                <div className="location__block__city">
                  <h2 className="location__block__city__name">{this.props.data.name}</h2>
                  <div className="location__block__city__icon"><MdLocationOn/></div>
                </div>
              </div>

              <div className="temp__block">
                <div className="sunny__block">
                  <div className="sunny__icon"><WiDayCloudy/></div>
                  <p className="sunny__desc">sunny</p>
                </div>

                <div className="celsius__block">
                  <p
                    className='celsius__now'>{Math.floor(this.props.data.main.temp)}</p>
                  <div className='celsius__icon'>
                    <WiCelsius/>
                  </div>
                </div>

                <div className="min__max__celsius__block">
                  <div className="max__celsius__block">
                    <p className="max__temp">{Math.floor(this.props.data?.main.temp_max)}</p>
                    <p className="mini__celsius__icon"><WiCelsius/></p>
                    <p className="mini__celsius__arrow__up"><IoMdArrowUp/></p>
                  </div>
                  <div className="min__celsius__block">
                    <p className="min__temp">{Math.floor(this.props.data?.main.temp_min)}</p>
                    <p className="mini__celsius__icon"><WiCelsius/></p>
                    <p className="mini__celsius__arrow__down"><IoMdArrowDown/></p>
                  </div>
                </div>

              </div>
              <div className="bar__block">
                <div className="components__block">
                  <div className="blocks__icon"><WiHumidity/></div>
                  <div className='blocks__num'>{this.props.data?.main.humidity}%</div>
                  <div className='blocks__desc'>Humidity</div>
                </div>

                <div className="components__block">
                  <div className="blocks__icon"><GiSpeedometer/></div>
                  <div className='blocks__num'>{this.props.data?.main.pressure} mBar</div>
                  <div className='blocks__desc'>Pressure</div>
                </div>

                <div className="components__block">
                  <div className="blocks__icon"><WiStrongWind/></div>
                  <div className='blocks__num'>{(this.props.data?.wind.speed * 3.6).toFixed(1)} km/h</div>
                  <div className='blocks__desc'>Wind</div>
                </div>
              </div>
              <div className="daytime__block">
                <div className="components__block">
                  <div className="blocks__icon"><WiSunrise/></div>
                  <div className='blocks__num'>
                    {new Date(this.props.data?.sys.sunrise * 1000).getHours()}:
                    {(new Date(this.props.data?.sys.sunrise * 1000).getMinutes()) < 10 ? "0" + (new Date(this.props.data?.sys.sunrise * 1000).getMinutes()) : (new Date(this.props.data?.sys.sunrise * 1000).getMinutes())} AM
                  </div>
                  <div className='blocks__desc'>Sunrise</div>
                </div>

                <div className="components__block">
                  <div className="blocks__icon"><WiSunset/></div>
                  <div className='blocks__num'>
                    {new Date(this.props.data?.sys.sunset * 1000).getHours()}:
                    {(new Date(this.props.data?.sys.sunset * 1000).getMinutes()) < 10 ? "0" + (new Date(this.props.data?.sys.sunset * 1000).getMinutes()) : (new Date(this.props.data?.sys.sunset * 1000).getMinutes())} PM
                  </div>
                  <div className='blocks__desc'>Sunset</div>
                </div>

                <div className="components__block">
                  <div className="blocks__icon"><GiSandsOfTime/></div>
                  <div className='blocks__num'>13h1m????</div>
                  <div className='blocks__desc'>Daytime</div>
                </div>
              </div>
              <div className="horizontal__scroll__block scrollbar" id="style-3">
                <MiniWeatherBlock data={this.props.data} weekDay={weekDay} day={day}/>
                <MiniWeatherBlock data={this.props.data} weekDay={weekDay} day={day}/>
                <MiniWeatherBlock data={this.props.data} weekDay={weekDay} day={day}/>
                <MiniWeatherBlock data={this.props.data} weekDay={weekDay} day={day}/>
                <MiniWeatherBlock data={this.props.data} weekDay={weekDay} day={day}/>
              </div>
            </div>
          </div>
          : null}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  cityArr: state?.weather?.cityArr,
});

const mapDispatchToProps = {};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Day);

export default Container;


