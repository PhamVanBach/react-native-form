import React from 'react';
import {StyleSheet, Text} from 'react-native';
import SafeScreen from '../../core/components/safe-area-screen';
import AppTheme from '../../core/themes/app-themes';

const Home = () => {
  return (
    <SafeScreen style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Welcome to the app!</Text>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: AppTheme.palette.background.screen,
  },
  title: {
    fontSize: AppTheme.typography.sizes.xxl,
    fontWeight: 'bold',
    color: AppTheme.palette.text.primary,
    marginTop: AppTheme.spacing.lg,
  },
  subtitle: {
    fontSize: AppTheme.typography.sizes.md,
    color: AppTheme.palette.text.secondary,
    marginTop: AppTheme.spacing.sm,
  },
});

export default Home;
