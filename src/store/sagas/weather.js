import {takeLatest, put, call} from 'redux-saga/effects';
import Api from "../../Api"
import {
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAIL,
} from "../actions/weather";

export default function* watcher() {
  yield takeLatest(GET_WEATHER_REQUEST, getWeather);
}

function* getWeather(action) {
  try {
    let {city} = action.payload;
    const weather = yield call(Api.getWeather, city);
    yield put({
      type: GET_WEATHER_SUCCESS,
      payload: weather,
    });
  } catch (e) {
    yield put({
      type: GET_WEATHER_FAIL,
      message: e.message,
    });
  }
}
