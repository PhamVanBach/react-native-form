import {call, put, takeLatest} from 'redux-saga/effects';
import {DatabaseService} from '../../../database/services';
import {navigate} from '../../navigation/navigationRef';
import {
  login,
  loginFailed,
  loginSuccess,
  registerUser,
  registerUserFailed,
  registerUserSuccess,
} from '../reducers/authSlice';
import {errorHandler} from '../../utils/errorHandler';

const db = DatabaseService.getInstance();

interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

const selectUsers = async (
  email: string,
  password: string,
): Promise<User | null> => {
  try {
    const users = await db.select('users');
    return (
      users.data.find(
        (user: User) => user.email === email && user.password === password,
      ) || null
    );
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

const handleInsertUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  try {
    const response = await db.insert('users', userData);
    if (response.error) {
      throw new Error(response.error.message || 'Failed to register user');
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

function* handleLogin(
  action: ReturnType<typeof login>,
): Generator<any, void, any> {
  try {
    const {email, password} = action.payload;
    const user = yield call(selectUsers, email, password);

    if (!user) {
      yield put(loginFailed('Invalid email or password'));
      errorHandler.showError({
        title: 'Login Failed',
        message: 'Invalid email or password',
      });
      return;
    }

    yield put(loginSuccess(user));
    yield call(navigate, 'Home');
  } catch (error: any) {
    const errorMessage = error?.message || 'An unexpected error occurred';
    yield put(loginFailed(errorMessage));
    errorHandler.showError({
      title: 'Login Error',
      message: errorMessage,
    });
  }
}

function* handleRegister(
  action: ReturnType<typeof registerUser>,
): Generator<any, void, any> {
  try {
    const {name, email, password} = action.payload;
    const userData = {name, email, password};

    const user = yield call(handleInsertUser, userData);
    if (!user) {
      return;
    }
    yield put(registerUserSuccess());
  } catch (error: any) {
    const errorMessage = error?.message || 'An unexpected error occurred';
    yield put(registerUserFailed(errorMessage));
    errorHandler.showError({
      title: 'Register Failed',
      message: errorMessage,
    });
  }
}

export default function* authSaga() {
  yield takeLatest(login.type, handleLogin);
  yield takeLatest(registerUser.type, handleRegister);
}
