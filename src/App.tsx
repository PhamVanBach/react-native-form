import * as React from 'react';
import {useEffect} from 'react';
import {InteractionManager} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigator from './core/navigation';
import {SheetProvider} from './core/screens/sheet/contexts/SheetContext';
import {SheetRegistration} from './core/screens/sheet/sheet-registation';
import {BiometricsService} from './core/utils/biometrics';
import {DatabaseService} from './database/services';
import {store} from './core/redux/store';

const App = () => {
  useEffect(() => {
    DatabaseService.getInstance().initDatabase();
  }, []);

  useEffect(() => {
    const initBiometrics = async () => {
      const available = await BiometricsService.isBiometricsAvailable();
      if (available) {
        await BiometricsService.createKeys();
      }
    };

    initBiometrics();
  }, []);

  if (__DEV__) {
    InteractionManager.setDeadline(0);
    setTimeout(() => {
      InteractionManager.setDeadline(0);
    }, 0);
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <SheetProvider>
          <SheetRegistration />
          <MainNavigator />
        </SheetProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
