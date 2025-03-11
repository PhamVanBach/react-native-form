import {View, Text} from 'react-native';
import React from 'react';
import AppTheme from '../../core/themes/app-themes';

const Home = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppTheme.palette.background.screen,
      }}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
