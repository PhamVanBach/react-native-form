import React from 'react';
import {StatusBarStyle, StyleSheet, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppTheme from '../../themes/app-themes';
import AppStatusBar from '../status-bar';

interface SafeScreenProps extends ViewStyle {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  barStyle?: StatusBarStyle;
}

/**
 * A component that provides safe area insets and status bar configuration
 * to render content properly with a translucent status bar.
 */
const SafeScreen: React.FC<SafeScreenProps> = ({
  children,
  style,
  backgroundColor = AppTheme.palette.background.primary,
  barStyle = 'dark-content',
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor},
        // Add padding for the status bar
        {paddingTop: insets.top},
        style,
      ]}>
      <AppStatusBar
        translucent
        backgroundColor="transparent"
        barStyle={barStyle}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SafeScreen;
