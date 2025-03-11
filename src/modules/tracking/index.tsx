import React from 'react';
import ScanQRCodeComponent from '../../core/components/scan-qr';
import {SafeAreaView} from 'react-native';
import styles from './styles';

const TrackingScreen = () => {
  return (
    <SafeAreaView testID="register-screen" style={styles.containerWrapper}>
      <ScanQRCodeComponent
        _onCodeScanned={data => {
          console.log('Scanned QR code:', data);
          // Handle the scanned QR code data here
        }}
        onClose={() => {
          // Handle closing the scanner
        }}
      />
    </SafeAreaView>
  );
};

export default TrackingScreen;
