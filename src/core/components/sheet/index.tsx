import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View, Dimensions, BackHandler } from 'react-native';
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
//   interpolate,
//   Extrapolate,
// } from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

interface SheetProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  snapPoints?: number[];
  backgroundColor?: string;
}

export const Sheet: React.FC<SheetProps> = ({
  children,
  isVisible,
  onClose,
  snapPoints = [0.9],
  backgroundColor = '#fff',
}) => {
  // const translateY = useSharedValue(0);
  // const context = useSharedValue({ y: 0 });
  // const active = useSharedValue(false);

  // useEffect(() => {
  //   if (isVisible) {
  //     translateY.value = withSpring(-SCREEN_HEIGHT * snapPoints[0], {
  //       damping: 50,
  //     });
  //   } else {
  //     translateY.value = withSpring(0, {
  //       damping: 50,
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isVisible, snapPoints]);

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => {
  //       if (isVisible) {
  //         onClose();
  //         return true;
  //       }
  //       return false;
  //     },
  //   );

  //   return () => backHandler.remove();
  // }, [isVisible, onClose]);

  // const gesture = Gesture.Pan()
  //   .onStart(() => {
  //     context.value = { y: translateY.value };
  //     active.value = true;
  //   })
  //   .onUpdate(event => {
  //     translateY.value = event.translationY + context.value.y;
  //     translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
  //   })
  //   .onEnd(() => {
  //     active.value = false;
  //     if (translateY.value > -SCREEN_HEIGHT * 0.3) {
  //       onClose();
  //     } else {
  //       translateY.value = withSpring(-SCREEN_HEIGHT * snapPoints[0], {
  //         damping: 50,
  //       });
  //     }
  //   });

  // const rBottomSheetStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ translateY: translateY.value }],
  //   };
  // });

  // const rBackdropStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: interpolate(
  //       translateY.value,
  //       [0, -SCREEN_HEIGHT * 0.5],
  //       [0, 0.5],
  //       Extrapolate.CLAMP,
  //     ),
  //   };
  // });

  // const handleBackdropPress = useCallback(() => {
  //   onClose();
  // }, [onClose]);

  // if (!isVisible) {
  //   return null;
  // }

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <Animated.View
        style={[styles.backdrop, rBackdropStyle]}
        onTouchEnd={handleBackdropPress}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[styles.sheet, rBottomSheetStyle, { backgroundColor }]}>
          <View style={styles.handle} />
          {children}
        </Animated.View>
      </GestureDetector> */}
    </GestureHandlerRootView>
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
    shadowOffset: {
      width: 0,
      height: -4,
    },
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
