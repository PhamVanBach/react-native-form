import {combineReducers} from '@reduxjs/toolkit';
// Import your slice reducers
import authReducer from './authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
});

export default rootReducer;
