import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();

const MAX_RETRIES = 5;
const RETRY_DELAY = 100; // milliseconds

const waitForNavigation = (
  callback: () => void,
  retries = 0,
): Promise<void> => {
  return new Promise(resolve => {
    if (navigationRef.isReady()) {
      callback();
      resolve();
      return;
    }

    if (retries >= MAX_RETRIES) {
      console.warn('Navigation failed: container not ready after max retries');
      resolve();
      return;
    }

    setTimeout(() => {
      waitForNavigation(callback, retries + 1).then(resolve);
    }, RETRY_DELAY);
  });
};

export const navigate = async (name: string, params?: any) => {
  await waitForNavigation(() => {
    navigationRef.navigate(name, params);
  });
};

export const goBack = async () => {
  await waitForNavigation(() => {
    navigationRef.goBack();
  });
};

export const reset = async (name: string, params?: any) => {
  await waitForNavigation(() => {
    navigationRef.reset({
      index: 0,
      routes: [{name, params}],
    });
  });
};
