import React, {Component} from 'react';
import {IoIosSearch} from "react-icons/io";
import {connect} from 'react-redux';
import {getWeather, removeCity} from "../store/actions/weather";
import DayNight from "./DayNight";
import {WiCelsius} from "react-icons/wi";
import {RiDeleteBin2Line} from "react-icons/ri";

const dayImg = require("./day-night/day.jpeg");

class Home extends Component {
  static propTypes = {};

  state = {
    city: '',
    component: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (city) => {
    this.setState({city: ''});
    this.props.getWeather(city);
  };

  closeBlock = () => {
    this.setState({component: false});
  };

  getWeatherFromCity = async (city) => {
    await this.props.getWeather(city);
    await this.setState({component: true});
  };

  render() {
    let {city, component} = this.state;
    return (
      <div>
        <div className="container">
          <div className="container__item">
          {component ? <DayNight data={this.props.data} closeBlock={this.closeBlock}/> : null}
            <img className="img" src={dayImg} alt="day"/>
            <div className="container__item__block container__item__block__top">
              <p className="location">Location</p>
              <div className="search__block">
                <input type="text"
                       name="city"
                       value={city}
                       onChange={this.handleChange}
                       className="searchInput"
                />
                <span className="searchIcon" onClick={() => this.handleSubmit(city)}><IoIosSearch/></span>
              </div>
              <div className="error">
                {this.props?.error?.length && this?.props?.error !== "request" ? this?.props?.error : null}
              </div>
              <div className="scroll__block">
                {this.props.cityArr?.length ? this.props.cityArr.map((m, index) =>
                  <div key={index} className="cityes__block">
                    <div className="cityes__by__home">
                      <div className="delete__city" onClick={() => {this.props.removeCity(m)}}>
                        <RiDeleteBin2Line/>
                      </div>
                      <div className="cityes__name__by__home">
                        <p className="city__name"
                           onClick={() => this.getWeatherFromCity(m[0])}
                        >{m[0]}</p>
                        <p className="degree">
                          {m[1]}
                          <span className="degreeCelsius"><WiCelsius/></span>
                        </p>
                      </div>
                    </div>
                  </div>) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state,
  data: state?.weather?.data,
  cityArr: state?.weather?.cityArr,
  error: state.weather.message,
});

const mapDispatchToProps = {
  getWeather,
  removeCity,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default Container;
