import React, {Component} from 'react';
import {WiDayCloudy} from "react-icons/wi";
import {WiCelsius} from "react-icons/wi";
import {IoMdArrowUp} from "react-icons/io";
import {IoMdArrowDown} from "react-icons/io";

class MiniWeatherBlock extends Component {
  render() {
    return (
      <div>
        {this.props.data ?
          <div className="horizontal__container__scroll">
            <div className="mini__icon">
              <WiDayCloudy/>
            </div>
            <div className="mini__day">
              <p>{this.props.weekDay.slice(0, 3) + "," + this.props.day}</p>
            </div>
            <div className="mini__celsius__block">
              <div className="mini__celsius__block__item__left">
                <p>{Math.floor(this.props.data.main.temp_max)}</p>
                <span className="mini__celsius"><WiCelsius/></span>
                <span className="mini__arrow"><IoMdArrowUp/></span>
              </div>
              <div className="mini__celsius__block__item__right">
                <p>{Math.floor(this.props.data.main.temp_min)}</p>
                <span className="mini__celsius"><WiCelsius/></span>
                <span className="mini__arrow"><IoMdArrowDown/></span>
              </div>
            </div>
          </div>
          : null}
      </div>
    );
  }
}
export default MiniWeatherBlock;
