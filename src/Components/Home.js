import React, {Component} from 'react';
import {IoIosSearch} from "react-icons/io";
import axios from "axios"

const Api_Key = "330216f9e3042b8a57a7865c3de67865"

class Home extends Component {

  state = {
    city: '',
    cityArr: []
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = async () => {
    let {city, cityArr} = this.state
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}`)
      .then((res) => {if (res){
        cityArr.push(res.data.name)
        this.setState({cityArr,city:''})
      }})
  }

  render() {
    let {city, cityArr} = this.state
    return (
      <div>
        <div className="container">
          <div className="container__item">hello</div>
          <div className="container__item">my</div>
          <div className="container__item">
            <div className="search__block">
              <input type="text" placeholder="Enter the name of the city !"
                     name="city"
                     value={city}
                     onChange={this.handleChange}
              />
              <button onClick={this.handleSubmit}><span><IoIosSearch/></span></button>
            </div>
            {cityArr.length ? cityArr.map(m =>
              <div>
                <span>{m}</span>
              </div>) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
