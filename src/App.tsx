import * as React from 'react';
import MainNavigator from './core/navigation';
import {InteractionManager} from 'react-native';
import {useEffect} from 'react';
import {BiometricsService} from './core/utils/biometrics';
import {SheetRegistration} from './core/screens/sheet/sheet-registation';
import {SheetProvider} from './core/screens/sheet/contexts/SheetContext';
import {DatabaseService} from './database/services';

export default () => {
  useEffect(() => {
    DatabaseService.getInstance().initDatabase();
  }, []);

  useEffect(() => {
    const initBiometrics = async () => {
      const available = await BiometricsService.isBiometricsAvailable();
      if (available) {
        await BiometricsService.createKeys(); // Create keys if needed
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
    <SheetProvider>
      <SheetRegistration />
      <MainNavigator />;
    </SheetProvider>
  );
};
