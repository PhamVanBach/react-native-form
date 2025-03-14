import Reactotron from 'reactotron-react-native';
export default class LoggedUtils {
  static log(message: string, args: any) {
    if (!__DEV__) {
      return;
    }
    Reactotron.display({
      name: 'LOG',
      preview: message,
      value: { message, args },
    });
  }
  static warn(message: string, args: any) {
    if (!__DEV__) {
      return;
    }
    Reactotron.display({
      name: 'WARN',
      preview: message,
      value: { message, args },
      important: true,
    });
  }
  static error(message: string, args: any) {
    if (!__DEV__) {
      return;
    }
    Reactotron.display({
      name: 'ERROR',
      preview: message,
      value: { message, args },
      important: true,
    });
  }
}
