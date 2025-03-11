import {StyleSheet} from 'react-native';
import AppTheme from '../../themes/app-themes';

const styles = StyleSheet.create({
  text: {
    fontSize: AppTheme.typography.sizes.lg,
    fontWeight: 'bold',
    color: AppTheme.palette.text.primary,
    textAlign: 'center',
  },
});

export default styles;
