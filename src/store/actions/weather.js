export const GET_WEATHER_REQUEST = "GET_WEATHER_REQUEST";
export const GET_WEATHER_SUCCESS = "GET_WEATHER_SUCCESS";
export const GET_WEATHER_FAIL = "GET_WEATHER_FAIL";

export function getWeather(city) {
  return {
    type: GET_WEATHER_REQUEST,
    payload: {city},
  };
};

export const REMOVE_CITY = "REMOVE_CITY";
export function removeCity(cityName) {
  return {
    type: REMOVE_CITY,
    payload: {cityName},
  };
};
