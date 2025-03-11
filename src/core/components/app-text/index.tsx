import React from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import AppTheme from '../../themes/app-themes';

interface AppTextProps extends TextProps {
  children: React.ReactNode;
}

const AppText = ({children, ...props}: AppTextProps) => {
  return (
    <Text style={styles.text} {...props}>
      {children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  text: {
    fontSize: AppTheme.typography.sizes.md,
    ...(AppTheme.typography.families?.bold as TextStyle),
    color: AppTheme.palette.text.primary,
  },
});
