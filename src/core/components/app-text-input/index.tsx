import * as React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextStyle,
  TextInputProps,
} from 'react-native';
import {FieldError} from 'react-hook-form';
import AppTheme from '../../themes/app-themes';

interface Props extends TextInputProps {
  name: string;
  label?: string;
  containerStyle?: any;
  labelStyle?: TextStyle;
  error?: FieldError | undefined;
}

const AppTextInput = React.forwardRef<any, Props>(
  (props, ref): React.ReactElement => {
    const {
      label,
      containerStyle = {},
      labelStyle,
      error,
      ...inputProps
    } = props;

    return (
      <View style={containerStyle}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <TextInput
          id={props.name}
          testID={props.name}
          autoCapitalize="none"
          ref={ref}
          style={[styles.input, error && styles.inputError]}
          {...inputProps}
        />
        <Text style={styles.textError}>{error && error.message}</Text>
      </View>
    );
  },
);

export default AppTextInput;

const styles = StyleSheet.create({
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: AppTheme.spacing.sm,
    paddingVertical: AppTheme.spacing.sm,
    paddingLeft: AppTheme.spacing.sm,
    fontSize: AppTheme.typography.sizes.md,
    height: AppTheme.spacing.xxxl,
    color: AppTheme.palette.text.primary,
    borderColor: AppTheme.palette.border.medium,
  },
  inputError: {
    borderColor: AppTheme.palette.status.error,
  },
  label: {
    paddingVertical: AppTheme.spacing.sm,
    fontSize: AppTheme.typography.sizes.md,
    fontWeight: 'bold',
    color: AppTheme.palette.text.secondary,
  },
  textError: {
    color: AppTheme.palette.status.error,
    fontSize: AppTheme.typography.sizes.sm,
  },
});
