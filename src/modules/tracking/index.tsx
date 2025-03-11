import React from 'react';
import {SafeAreaView} from 'react-native';
import AppScanQRButton from '../../core/components/app-scan-qr-button';
import styles from './styles';

const TrackingScreen = () => {
  return (
    <SafeAreaView testID="register-screen" style={styles.containerWrapper}>
      <AppScanQRButton />
    </SafeAreaView>
  );
};

export default TrackingScreen;
