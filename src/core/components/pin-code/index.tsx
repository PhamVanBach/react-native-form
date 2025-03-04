import React, { useEffect, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';

interface PinCodeProps {
  onComplete: (code: string) => void;
  length?: number;
  error?: boolean;
}

export const PinCode: React.FC<PinCodeProps> = ({
  onComplete,
  length = 4,
  error = false,
}) => {
  const [code, setCode] = useState<string>('');
  const [shake] = useState(new Animated.Value(0));

  useEffect(() => {
    if (error) {
      shakeAnimation();
      Vibration.vibrate(400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shake, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleNumberPress = (number: string) => {
    const newCode = code + number;
    setCode(newCode);

    if (newCode.length === length) {
      onComplete(newCode);
      setCode('');
    }
  };

  const handleDelete = () => {
    setCode(code.slice(0, -1));
  };

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < length; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            i < code.length && styles.dotFilled,
            error && styles.dotError,
          ]}
        />,
      );
    }
    return dots;
  };

  const renderNumber = (number: string) => (
    <TouchableOpacity
      key={number}
      style={styles.numberButton}
      onPress={() => handleNumberPress(number)}>
      <Text style={styles.numberText}>{number}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.dotsContainer, { transform: [{ translateX: shake }] }]}>
        {renderDots()}
      </Animated.View>

      <View style={styles.keypad}>
        <View style={styles.row}>{['1', '2', '3'].map(renderNumber)}</View>
        <View style={styles.row}>{['4', '5', '6'].map(renderNumber)}</View>
        <View style={styles.row}>{['7', '8', '9'].map(renderNumber)}</View>
        <View style={styles.row}>
          <View style={styles.numberButton} />
          {renderNumber('0')}
          <TouchableOpacity style={styles.numberButton} onPress={handleDelete}>
            <Text style={styles.deleteText}>⌫</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: 8,
  },
  dotFilled: {
    backgroundColor: '#000',
  },
  dotError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FF3B30',
  },
  keypad: {
    width: '80%',
    maxWidth: 300,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  numberButton: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 32,
    color: '#000',
  },
  deleteText: {
    fontSize: 24,
    color: '#000',
  },
});
