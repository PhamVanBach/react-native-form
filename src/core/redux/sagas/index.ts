import {all} from 'redux-saga/effects';
// Import your sagas
import authSaga from './authSaga';

export default function* rootSaga() {
  yield all([authSaga()]);
}
