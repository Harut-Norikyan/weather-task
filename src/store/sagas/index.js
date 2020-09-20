import { all, fork } from 'redux-saga/effects';
import weather from "./weather";

export default function* watchers() {
  yield all([
    weather
  ].map(fork));
}
