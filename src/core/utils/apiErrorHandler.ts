import {errorHandler} from './errorHandler';

export const handleApiError = (error: any) => {
  // Handle different types of errors
  if (error.response) {
    // Server responded with error
    errorHandler.showError({
      title: 'Server Error',
      message:
        error.response.data?.message || 'Something went wrong with the server',
    });
  } else if (error.request) {
    // Request was made but no response
    errorHandler.showError({
      title: 'Network Error',
      message: 'Unable to connect to the server',
    });
  } else {
    // Other errors
    errorHandler.showError({
      title: 'Error',
      message: error.message || 'An unexpected error occurred',
    });
  }
};
