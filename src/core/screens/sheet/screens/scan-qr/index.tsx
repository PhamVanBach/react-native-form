import React, {useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import AppTheme from '../../../../themes/app-themes';

import {
  Camera,
  useCameraPermission,
  useCameraDevice,
  CameraRuntimeError,
  Code,
  CodeScannerFrame,
} from 'react-native-vision-camera';
import {Sheet} from '../..';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppText from '../../../../components/app-text';
import {AppIcon} from '../../../../components';
import {launchImageLibrary} from 'react-native-image-picker';
interface Props {
  visible: boolean;
  title: string;
  onClose: () => void;
  onCodeScanned?: (codes: Code[], frame: CodeScannerFrame) => void;
  onCapture?: (photo: string) => void;
}

const ScanQRCodeComponent = ({
  visible,
  title,
  onClose,
  onCodeScanned,
  onCapture,
}: Props) => {
  const camera = React.useRef<Camera>(null);
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const [lastScannedCode, setLastScannedCode] = React.useState<string>('');

  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);

  const handleOpenLibrary = useCallback(async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
      });

      if (result.assets?.[0]?.uri && onCapture) {
        onCapture(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Failed to pick image:', error);
    }
  }, [onCapture]);

  const handleCapture = useCallback(async () => {
    if (device) {
      try {
        const photo = await camera.current?.takePhoto();
        console.log('photo', photo);
        if (photo && onCapture) {
          onCapture(photo.path);
        }
      } catch (error) {
        console.error('Failed to take photo:', error);
      }
    }
  }, [device, onCapture]);

  const handleCodeScanned = useCallback(
    (codes: Code[], frame: CodeScannerFrame) => {
      if (codes.length > 0 && codes[0].value) {
        setLastScannedCode(codes[0].value);
        onCodeScanned?.(codes, frame);
      }
    },
    [onCodeScanned],
  );

  const handlePressQRValue = useCallback(() => {
    if (lastScannedCode) {
      Clipboard.setString(lastScannedCode);
      Alert.alert('Copied to clipboard', lastScannedCode);
    }
  }, [lastScannedCode]);

  const renderContent = () => {
    if (hasPermission === null) {
      return (
        <View style={styles.content}>
          <Text style={styles.text}>Requesting camera permission...</Text>
        </View>
      );
    }

    if (hasPermission === false) {
      return (
        <View style={styles.content}>
          <Text style={styles.text}>No access to camera</Text>
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.content}>
        {device ? (
          <View style={styles.container}>
            {title && <AppText style={styles.title}>{title}</AppText>}
            <View style={styles.cameraContainer}>
              <Camera
                ref={camera}
                style={styles.camera}
                device={device}
                isActive={true}
                photo={true}
                onError={onError}
                codeScanner={{
                  codeTypes: ['qr'],
                  onCodeScanned: handleCodeScanned,
                }}
                onStarted={() => console.log('Camera started!')}
                onStopped={() => console.log('Camera stopped!')}
              />
              <View style={styles.overlay}>
                {lastScannedCode ? (
                  <TouchableOpacity
                    style={styles.codeContainer}
                    onPress={handlePressQRValue}>
                    <AppText style={styles.codeText}>{lastScannedCode}</AppText>
                  </TouchableOpacity>
                ) : null}
                <View style={styles.scanArea} />
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity onPress={handleOpenLibrary}>
                <AppIcon name="library" size={AppTheme.spacing.xl} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={handleCapture}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={styles.text}>No camera device found</Text>
        )}
      </View>
    );
  };

  return (
    <Sheet
      isVisible={visible}
      onClose={onClose}
      snapPoints={[0.9]}
      backgroundColor="#fff">
      <SafeAreaView style={styles.container} edges={['top']}>
        {renderContent()}
      </SafeAreaView>
    </Sheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: AppTheme.palette.background.primary,
    paddingHorizontal: AppTheme.spacing.md,
  },
  cameraContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '55%',
    borderRadius: AppTheme.borderRadius.xl,
    overflow: 'hidden',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  title: {
    ...(AppTheme.typography.families?.bold as any),
    color: AppTheme.palette.text.primary,
    fontSize: AppTheme.typography.sizes.xl,
    textAlign: 'center',
    paddingTop: AppTheme.spacing.md,
    paddingBottom: AppTheme.spacing.lg,
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: AppTheme.palette.text.inverse,
    backgroundColor: 'transparent',
    borderRadius: AppTheme.borderRadius.lg,
    borderStyle: 'dashed',
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
  footer: {
    position: 'relative',
    paddingHorizontal: AppTheme.spacing.lg,
    marginTop: AppTheme.spacing.lg,
    marginBottom: AppTheme.spacing.xl,
    height: 70,
    justifyContent: 'center',
  },
  captureButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: AppTheme.palette.border.medium,
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: AppTheme.palette.text.inverse,
  },
  codeContainer: {
    position: 'absolute',
    bottom: AppTheme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppTheme.palette.background.black50,
    paddingHorizontal: AppTheme.spacing.md,
    paddingVertical: AppTheme.spacing.sm,
    borderRadius: AppTheme.borderRadius.md,
  },
  codeText: {
    color: AppTheme.palette.text.inverse,
    fontSize: AppTheme.typography.sizes.sm,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default ScanQRCodeComponent;
