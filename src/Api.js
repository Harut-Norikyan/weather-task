import axios from "axios";
const Api_Key = "330216f9e3042b8a57a7865c3de67865";

export class Api{
  static getWeather(city) {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}&units=metric`);
  }
}
export default Api;
