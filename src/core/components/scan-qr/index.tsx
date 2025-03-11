import React, {useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AppTheme from '../../themes/app-themes';

import {
  Camera,
  useCameraPermission,
  useCameraDevice,
  CameraRuntimeError,
  Code,
  CodeScannerFrame,
} from 'react-native-vision-camera';

interface Props {
  _onCodeScanned: (codes: Code[], frame: CodeScannerFrame) => void;
  onClose?: () => void;
}

const ScanQRCodeComponent = ({_onCodeScanned, onClose}: Props) => {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();

  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {device ? (
        <Camera
          style={styles.camera}
          device={device}
          isActive={true}
          onError={onError}
          codeScanner={{
            codeTypes: ['qr'],
            onCodeScanned: _onCodeScanned,
          }}
          onStarted={() => console.log('Camera started!')}
          onStopped={() => console.log('Camera stopped!')}>
          <View style={styles.overlay}>
            <View style={styles.scanArea} />
          </View>
          {onClose && (
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          )}
          <View style={styles.overlay}>
            <View style={styles.scanArea} />
          </View>
        </Camera>
      ) : (
        <Text style={styles.text}>No camera device found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.palette.background.primary,
  },
  camera: {
    flex: 1,
  },
  text: {
    color: AppTheme.palette.text.primary,
    fontSize: AppTheme.typography.sizes.lg,
    textAlign: 'center',
    marginTop: AppTheme.spacing.xl,
  },
  button: {
    backgroundColor: AppTheme.palette.primary,
    padding: AppTheme.spacing.md,
    borderRadius: AppTheme.borderRadius.md,
    marginTop: AppTheme.spacing.lg,
    marginHorizontal: AppTheme.spacing.xl,
  },
  buttonText: {
    color: AppTheme.palette.text.inverse,
    fontSize: AppTheme.typography.sizes.md,
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: AppTheme.palette.text.inverse,
    backgroundColor: 'transparent',
  },
  closeButton: {
    position: 'absolute',
    top: AppTheme.spacing.xl,
    right: AppTheme.spacing.xl,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: AppTheme.spacing.md,
    borderRadius: AppTheme.borderRadius.full,
  },
  closeButtonText: {
    color: AppTheme.palette.text.inverse,
    fontSize: AppTheme.typography.sizes.md,
  },
});

export default ScanQRCodeComponent;
