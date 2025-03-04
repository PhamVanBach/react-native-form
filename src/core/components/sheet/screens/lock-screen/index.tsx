import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PinCode} from '../../../pin-code';

interface LockScreenProps {
  onSuccess: () => void;
  onCancel?: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({
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
    <View style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    position: 'relative',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  cancelButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 16,
  },
});
