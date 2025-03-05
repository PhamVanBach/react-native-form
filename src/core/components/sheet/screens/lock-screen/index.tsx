import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Sheet} from '../..';
import {PinCode} from '../../../pin-code';

interface LockScreenProps {
  visible: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({
  visible = false,
  onSuccess,
  onCancel,
}) => {
  const [error, setError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  const handleComplete = (code: string) => {
    // Replace '1234' with your actual PIN validation logic
    if (code === '1234') {
      setError(false);
      setErrorCount(0);
      onSuccess();
    } else {
      setError(true);
      const newErrorCount = errorCount + 1;
      setErrorCount(newErrorCount);

      if (newErrorCount >= 3) {
        Alert.alert('Too Many Attempts', 'Please try again later', [
          {text: 'OK', onPress: onCancel},
        ]);
      }

      // Reset error state after animation
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <Sheet
      isVisible={visible}
      onClose={onCancel}
      snapPoints={[1]}
      gestureEnabled={false}
      backgroundColor="#fff">
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.title}>Enter PIN</Text>
          {onCancel && (
            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
        <PinCode onComplete={handleComplete} length={4} error={error} />
      </SafeAreaView>
    </Sheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 16,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  cancelButton: {
    position: 'absolute',
    right: 24,
    top: 24,
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 16,
  },
});
