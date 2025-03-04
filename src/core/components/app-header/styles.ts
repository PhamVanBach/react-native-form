import { StyleSheet } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    paddingTop: initialWindowMetrics?.insets?.top || 0,
    paddingBottom: initialWindowMetrics?.insets?.bottom || 0,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;
