import {takeLatest, put} from 'redux-saga/effects';
import {login} from '../reducers/authSlice';

function* handleLogin(action: any) {
  try {
    // Your API call here
    yield put(login(action.payload));
  } catch (error) {
    // Handle error
  }
}

export default function* authSaga() {
  yield takeLatest('auth/loginRequest', handleLogin);
}
