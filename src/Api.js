import axios from "axios";
const Api_Key = "330216f9e3042b8a57a7865c3de67865";
// const Api_Key = "5925f403cbc46f948d854f4e62f4f8d0";

export class Api{
  static getWeather(city) {
    console.log(city,"=>city")
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}&units=metric`);
    // return axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=10&appid=5925f403cbc46f948d854f4e62f4f8d0`);
  }
}
export default Api;
