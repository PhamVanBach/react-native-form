import React, {useEffect, useRef} from 'react';
import {
  Animated,
  BackHandler,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

interface SheetProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  gestureEnabled?: boolean;
  snapPoints?: number[];
  backgroundColor?: string;
}

export const Sheet: React.FC<SheetProps> = ({
  children,
  isVisible = false,
  onClose,
  gestureEnabled = true,
  snapPoints = [0.9],
  backgroundColor = '#fff',
}) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => gestureEnabled,
      onMoveShouldSetPanResponder: () => gestureEnabled,
      onPanResponderMove: (_, {dy}) => {
        if (!gestureEnabled) return;
        const newValue = -SCREEN_HEIGHT * snapPoints[0] + dy;
        translateY.setValue(Math.min(Math.max(newValue, -SCREEN_HEIGHT), 0));
      },
      onPanResponderRelease: (_, {dy}) => {
        if (!gestureEnabled) return;
        if (dy > SCREEN_HEIGHT * 0.2) {
          onClose();
        } else {
          Animated.spring(translateY, {
            toValue: -SCREEN_HEIGHT * snapPoints[0],
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: isVisible ? -SCREEN_HEIGHT * snapPoints[0] : SCREEN_HEIGHT,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: isVisible ? 0.5 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isVisible, snapPoints, translateY, opacity]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isVisible) {
          onClose();
          return true;
        }
        return false;
      },
    );
    return () => backHandler.remove();
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      {gestureEnabled && <Animated.View style={[styles.backdrop, {opacity}]} />}
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.sheet, {backgroundColor, transform: [{translateY}]}]}>
        {gestureEnabled && <View style={styles.handle} />}
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  sheet: {
    height: SCREEN_HEIGHT,
    width: '100%',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#00000040',
    alignSelf: 'center',
    marginVertical: 12,
    borderRadius: 2,
  },
});
