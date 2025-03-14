import {AxiosError} from 'axios';
import {errorHandler} from './errorHandler';

export const handleApiError = (error: AxiosError | any) => {
  // Handle different types of errors
  if (error.response) {
    // Server responded with error
    const status = error.response.status;
    const message =
      error.response.data?.message || 'Something went wrong with the server';

    // You can handle specific error codes here
    switch (status) {
      case 401:
        errorHandler.showError({
          title: 'Authentication Error',
          message: 'Your session has expired. Please sign in again.',
        });
        break;
      case 403:
        errorHandler.showError({
          title: 'Access Denied',
          message: 'You do not have permission to perform this action.',
        });
        break;
      case 404:
        errorHandler.showError({
          title: 'Not Found',
          message: 'The requested resource could not be found.',
        });
        break;
      case 422:
        const validationErrors = error.response.data?.errors;
        let validationMessage =
          'There were validation errors with your request.';

        if (validationErrors) {
          // Format validation errors
          const errorMessages = Object.values(validationErrors).flat();
          if (errorMessages.length > 0) {
            validationMessage = errorMessages.join('\n');
          }
        }

        errorHandler.showError({
          title: 'Validation Error',
          message: validationMessage,
        });
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        errorHandler.showError({
          title: 'Server Error',
          message:
            'Our servers are experiencing issues. Please try again later.',
        });
        break;
      default:
        errorHandler.showError({
          title: `Error (${status})`,
          message: message,
        });
        break;
    }
  } else if (error.request) {
    // Request was made but no response was received
    errorHandler.showError({
      title: 'Network Error',
      message:
        'Unable to connect to the server. Please check your internet connection.',
    });
  } else {
    // Something happened in setting up the request
    errorHandler.showError({
      title: 'Error',
      message: error.message || 'An unexpected error occurred',
    });
  }

  // Log the error for debugging
  if (__DEV__) {
    console.error('API Error:', error);
  }
};
