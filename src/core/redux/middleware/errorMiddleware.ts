import {Middleware} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

interface ErrorAction {
  error?: {
    message?: string;
  };
  type: string;
}

export const errorMiddleware: Middleware = () => next => action => {
  const errorAction = action as ErrorAction;
  if (errorAction.error) {
    Alert.alert(
      'Error',
      errorAction.error.message || 'An unexpected error occurred',
      [{text: 'OK'}],
    );
  }
  return next(action);
};
