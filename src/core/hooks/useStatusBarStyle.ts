import {useCallback} from 'react';
import {StatusBarStyle} from 'react-native';

export const useStatusBarStyle = () => {
  const getStatusBarStyle = useCallback(
    (backgroundColor: string): StatusBarStyle => {
      // Convert hex to RGB
      const hex = backgroundColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);

      // Calculate relative luminance
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      return luminance > 0.5 ? 'dark-content' : 'light-content';
    },
    [],
  );

  return {getStatusBarStyle};
};
