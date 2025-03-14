import React from 'react';
import {StatusBar, StatusBarProps} from 'react-native';
import AppTheme from '../../themes/app-themes';

type StatusBarType = 'light' | 'dark' | 'primary';

interface AppStatusBarProps extends Omit<StatusBarProps, 'barStyle'> {
  type?: StatusBarType;
  barStyle?: any;
}

/**
 * A custom StatusBar component that applies consistent styling
 * across the app based on the theme.
 */
const AppStatusBar: React.FC<AppStatusBarProps> = ({
  type = 'dark',
  barStyle,
  backgroundColor,
  translucent = true,
  ...props
}) => {
  // Get the status bar style from the theme based on type
  const themeStyle = AppTheme.palette.statusBar[type];

  return (
    <StatusBar
      translucent={translucent}
      backgroundColor={backgroundColor || themeStyle.backgroundColor}
      barStyle={barStyle || themeStyle.barStyle}
      {...props}
    />
  );
};

export default AppStatusBar;
