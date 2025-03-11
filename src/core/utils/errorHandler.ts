import {Alert} from 'react-native';

interface ErrorConfig {
  title?: string;
  message: string;
  onOk?: () => void;
}

class ErrorHandler {
  private static instance: ErrorHandler;

  private constructor() {}

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  showError = (error: string | ErrorConfig) => {
    console.log('error', error);

    if (typeof error === 'string') {
      Alert.alert('Error', error, [{text: 'OK'}]);
      return;
    }

    Alert.alert(error.title || 'Error', error.message, [
      {
        text: 'OK',
        onPress: error.onOk,
      },
    ]);
  };
}

export const errorHandler = ErrorHandler.getInstance();
