import {Middleware} from '@reduxjs/toolkit';
import {errorHandler} from '../utils/errorHandler';

export const errorMiddleware: Middleware = () => next => (action: any) => {
  // Check if action has error
  if (action.error) {
    errorHandler.showError({
      title: action.type,
      message: action.error.message || 'An error occurred',
    });
  }

  return next(action);
};
