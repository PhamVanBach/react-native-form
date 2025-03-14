import {call, put, takeLatest} from 'redux-saga/effects';
import {AuthApi} from '../../api';
import {navigate} from '../../navigation/navigationRef';
import {storage} from '../../storage/mmkv';
import {handleApiError} from '../../utils/apiErrorHandler';
import {errorHandler} from '../../utils/errorHandler';
import {
  login,
  loginFailed,
  loginSuccess,
  registerUser,
  registerUserFailed,
  registerUserSuccess,
} from '../reducers/authSlice';

const authApi = new AuthApi();

function* handleLogin(
  action: ReturnType<typeof login>,
): Generator<any, void, any> {
  try {
    const {email, password} = action.payload;

    // Call the API
    const response = yield call(authApi.login, email, password);

    // Store tokens in secure storage
    const {user, token} = response.data;
    storage.set('accessToken', token);
    storage.set('refreshToken', token);

    // Dispatch success action with user data
    yield put(loginSuccess(user));

    // Navigate to home screen
    yield call(navigate, 'Home');
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || 'Login failed. Please try again.';
    yield put(loginFailed(errorMessage));
    handleApiError(error);
  }
}

function* handleRegister(
  action: ReturnType<typeof registerUser>,
): Generator<any, void, any> {
  try {
    const {name, email, password} = action.payload;

    // Call the API
    const response = yield call(authApi.register, {
      name,
      email,
      password,
    });

    // Store tokens in secure storage
    const {tokens} = response.data;
    storage.set('accessToken', tokens.accessToken);
    storage.set('refreshToken', tokens.refreshToken);

    // Dispatch success action
    yield put(registerUserSuccess());

    // Show success message
    errorHandler.showError({
      title: 'Registration Successful',
      message: 'Your account has been created successfully.',
    });
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      'Registration failed. Please try again.';
    yield put(registerUserFailed(errorMessage));
    handleApiError(error);
  }
}

export default function* authSaga() {
  yield takeLatest(login.type, handleLogin);
  yield takeLatest(registerUser.type, handleRegister);
}
