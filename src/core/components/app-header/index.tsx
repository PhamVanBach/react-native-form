import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import AppTheme from '../../themes/app-themes';

const AppHeader = ({title}: {title: string}) => {
  return (
    <View style={AppTheme.components.headerContainer}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default AppHeader;
