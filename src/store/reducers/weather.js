import {
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAIL,
  REMOVE_CITY,
} from "../actions/weather";

const initialState = {
  data: [],
  cityArr: [],
  message: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_WEATHER_REQUEST:
      return {...state,};
    case GET_WEATHER_SUCCESS:
      const city = action.payload.data.name;
      initialState.cityArr.push([city,Math.floor(action.payload.data.main.temp)]);
      // initialState.cityArr = [...new Set(initialState.cityArr)].sort();
      initialState.cityArr = [...new Map(initialState.cityArr.map(item => [item[0], item])).values()].sort()

      console.log(initialState.cityArr)
      return {
        ...state,
        data: action.payload.data,
        cityArr: [...initialState.cityArr],
        message : "success"
      };
    case GET_WEATHER_FAIL:
      return {
        ...state,
        message: "What city doesn't exist"
      };

    case REMOVE_CITY:
      const {cityName} = action.payload
      let index = initialState.cityArr.indexOf(cityName);
      initialState.cityArr.splice(index, 1);
      return {
        ...state,
        cityArr: [...initialState.cityArr],
        data: null
      };

    default:
      return state;
  }
}
