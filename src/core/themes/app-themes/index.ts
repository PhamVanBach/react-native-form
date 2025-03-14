import {Platform} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';

export const palette = {
  // Primary colors
  primary: '#181E34',
  secondary: '#F8F3E9',
  accent: '#FFB74D',

  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F8F8',
    tertiary: '#F0F0F0',
    screen: '#fff4e6',
    blur: '#efefef',
    black50: 'rgba(0, 0, 0, 0.5)',
    transparent: 'transparent',
  },

  // Status colors
  status: {
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
    info: '#2196F3',
    transit: '#000000',
  },

  // Text colors
  text: {
    primary: '#000000',
    secondary: '#666666',
    tertiary: '#999999',
    inverse: '#FFFFFF',
  },

  // Border colors
  border: {
    light: '#F0F0F0',
    medium: '#E0E0E0',
    dark: '#CCCCCC',
  },

  // Status bar
  statusBar: {
    light: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
    dark: {
      backgroundColor: 'transparent',
      barStyle: 'dark-content',
    },
    primary: {
      backgroundColor: '#181E34',
      barStyle: 'light-content',
    },
  },
};

// Rest of your theme remains the same
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    loose: 1.8,
  },
  families: Platform.select({
    ios: {
      regular: {
        fontFamily: 'System',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500',
      },
      semibold: {
        fontFamily: 'System',
        fontWeight: '600',
      },
      bold: {
        fontFamily: 'System',
        fontWeight: '700',
      },
    },
    android: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
      semibold: {
        fontFamily: 'sans-serif',
        fontWeight: '600',
      },
      bold: {
        fontFamily: 'sans-serif',
        fontWeight: '700',
      },
    },
  }),
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Component-specific themes
export const components = {
  container: {
    flex: 1,
    backgroundColor: palette.background.primary,
  },
  card: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: palette.background.primary,
    ...shadows.sm,
  },
  button: {
    primary: {
      backgroundColor: palette.primary,
      color: palette.text.inverse,
      borderRadius: borderRadius.full,
      padding: spacing.md,
    },
    secondary: {
      backgroundColor: palette.secondary,
      color: palette.text.primary,
      borderRadius: borderRadius.full,
      padding: spacing.md,
    },
  },
  input: {
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: palette.background.secondary,
    padding: spacing.md,
    fontSize: typography.sizes.md,
  },
  bottomTab: {
    height: 64,
    backgroundColor: palette.background.primary,
    borderTopColor: palette.border.light,
    activeColor: palette.primary,
    inactiveColor: palette.text.tertiary,
  },
  trackingCard: {
    backgroundColor: palette.background.secondary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginVertical: spacing.sm,
  },
  statusBadge: {
    transit: {
      backgroundColor: '#000000',
      color: '#FFFFFF',
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.full,
    },
  },
  screenContainer: {
    flex: 1,
    backgroundColor: palette.background.primary,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: initialWindowMetrics?.insets.bottom || spacing.lg,
  },
  formContainer: {
    gap: spacing.md,
  },
  headerContainer: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
};

const AppTheme = {
  palette,
  spacing,
  borderRadius,
  typography,
  shadows,
  components,
};

export default AppTheme;
