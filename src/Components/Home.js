// import React, { Component } from 'react';
// import { IoIosSearch } from "react-icons/io";
// import { RiDeleteBin2Line } from "react-icons/ri";
//
// import Day from "./Day"
// import axios from "axios";
//
// const day = require("./day-night/day.jpeg");
// const night = require("./day-night/night.jpg");
// const Api_Key = "330216f9e3042b8a57a7865c3de67865";
//
// class Home extends Component {
//
//   state = {
//     city: '',
//     cityArr: [],
//     error: '',
//     data: null,
//     over: false
//   }
//   handleChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value
//     })
//   }
//   handleSubmit = async () => {
//     let { city, cityArr } = this.state;
//     await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}`)
//       .then(
//         (res) => {
//           console.log(res);
//           if (res) {
//             cityArr.unshift(res.data.name);
//             this.setState({ cityArr, city: '' });
//           }
//         },
//         (error) => {
//           if (error && city.length !== 0) {
//             this.setState({
//               error: "error"
//             });
//           }
//         });
//   };
//
//   getWeatherFromCity = async (city) => {
//     await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}&units=metric`)
//       .then(
//         (res) => {
//           if (res) {
//             this.setState({
//               data: res.data
//             })
//           }
//         });
//   }
//
//   removeCity = (city) => {
//     let { cityArr } = this.state
//     cityArr.indexOf(city);
//     cityArr.splice(city, 1);
//     this.setState({ cityArr })
//   }
//
//
//   render() {
//     let { city, cityArr, error, data } = this.state;
//     return (
//       <div>
//         <div className="container">
//
//           {data !== null ? <Day data={this.state.data} /> : null}
//
//
//           <div className="container__item">
//             <img className="img" src={day} />
//             <div className="container__item__block container__item__block__top">
//               <p className="location">Location</p>
//
//               <div className="search__block">
//                 <input type="text"
//                   name="city"
//                   value={city}
//                   onChange={this.handleChange}
//                   onFocus={() => this.setState({ error: '' })}
//                   className="searchInput"
//                 />
//                 <span className="searchIcon" onClick={this.handleSubmit}><IoIosSearch /></span>
//               </div>
//               <div className="error">{error}</div>
//
//               {cityArr.length ? cityArr.map((m, index) =>
//                 <div key={index} className="cityes__block">
//                   <div className="cityes__by__home" >
//                     <div className="delete__city" onClick={() => this.removeCity(m)}>
//                       <RiDeleteBin2Line />
//                     </div>
//                     <p className="cityes__name__by__home" onClick={() => this.getWeatherFromCity(m)}>{m}</p>
//                   </div>
//                 </div>) : null}
//
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
//
// export default Home;


import React, {Component} from 'react';
import {IoIosSearch} from "react-icons/io";
import {RiDeleteBin2Line} from "react-icons/ri";
import {connect} from 'react-redux';
import {getWeather, removeCity} from "../store/actions/weather"
import Day from "./Day"
import Night from "./Night"
import {WiCelsius} from "react-icons/wi";

const day = require("./day-night/day.jpeg");

class Home extends Component {
  static propTypes = {};

  state = {
    city: '',
    components: false,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (city) => {
    this.setState({city: ''})
    this.props.getWeather(city)
  }

  closeBlock = () => {
    this.setState({components: false})
  }

  getWeatherFromCity = async (city) => {
    await this.props.getWeather(city);
    await this.setState({components: true})
  }
  render() {
    console.log(this.props.state,"this.props.state")
    let {city, components} = this.state;
    return (
      <div>
        <div className="container">
          <div className="container__item">
            {components ? <Day data={this.props.data} closeBlock={this.closeBlock}/> : null}
          </div>
          <div className="container__item">
            {components ? <Night data={this.props.data} closeBlock={this.closeBlock}/> : null}
          </div>
          <div className="container__item">
            <img className="img" src={day} alt={day}/>
            <div className="container__item__block container__item__block__top">
              <p className="location">Location</p>

              <div className="search__block">
                <input type="text"
                       name="city"
                       value={city}
                       onChange={this.handleChange}
                       // onFocus={()=>this.errorFunc(error)}
                       className="searchInput"
                />
                {/*<span className="searchIcon" onClick={this.getWeather}><IoIosSearch /></span>*/}
                <span className="searchIcon" onClick={() => this.handleSubmit(city)}><IoIosSearch/></span>
              </div>
              <div className="error">
                {this.props?.error?.length && this?.props?.error !== "success" ? this?.props?.error : null}
              </div>
              <div className="scroll__block">
                {this.props.cityArr?.length ? this.props.cityArr.map((m, index) =>
                  <div key={index} className="cityes__block">
                    <div className="cityes__by__home">
                      <div className="delete__city" onClick={() => this.props.removeCity(m)}>
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
  error:state.weather.message
});

const mapDispatchToProps = {
  getWeather,
  removeCity
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default Container;





