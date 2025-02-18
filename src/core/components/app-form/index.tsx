import * as React from 'react';
import { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

interface Props {
  children: JSX.Element | JSX.Element[];
  register: any;
  errors: any;
  setValue: any;
  triggerValidation: any;
}

const AppForm = ({
  register,
  errors,
  setValue,
  children,
  triggerValidation,
}: Props) => {
  const Inputs = React.useRef<Array<TextInput>>([]);
  const InputOffset = React.useRef<any[]>([]);

  const scrollViewRef = React.useRef<any>(null);

  useEffect(() => {
    (Array.isArray(children) ? [...children] : [children]).forEach(child => {
      if (child.props?.name) {
        register(child.props.name);
      }
    });
  }, [children, register]);

  useEffect(() => {
    if (errors && Object.keys(errors).length) {
      const keys = Object.keys(errors);
      const firstError = keys[0];
      const index = (
        Array.isArray(children) ? [...children] : [children]
      ).findIndex((child: any) => child.props.name === firstError);

      if (Inputs.current[index]) {
        scrollToYOffset(InputOffset.current[index]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const scrollToYOffset = (y: number = 0) => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: 0, y });
      }
    }, 500);
  };

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior={'padding'}>
      <ScrollView
        testID="form"
        ref={scrollViewRef}
        contentContainerStyle={styles.container}
        style={styles.backgroundColor}>
        <View style={styles.formContainer}>
          {(Array.isArray(children) ? [...children] : [children]).map(
            (child, i) => {
              return child.props.name ? (
                <View
                  key={`input-${child.props.name}-${i}`}
                  onLayout={({ nativeEvent }: any) => {
                    InputOffset.current[i] = nativeEvent.layout.y;
                  }}>
                  {React.createElement(child.type, {
                    ...{
                      ...child.props,
                      ref: (e: TextInput) => {
                        Inputs.current[i] = e;
                      },
                      onChangeText: (v: string) =>
                        setValue(child.props.name, v, true),
                      onSubmitEditing: () => {
                        Inputs.current[i + 1]
                          ? Inputs.current[i + 1].focus()
                          : Inputs.current[i].blur();
                      },
                      onBlur: () => triggerValidation(child.props.name),
                      blurOnSubmit: false,
                      name: child.props.name,
                      error: errors[child.props.name],
                      key: `input-${child.props.name}-${i}`,
                    },
                  })}
                </View>
              ) : (
                child
              );
            },
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AppForm;

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  containerWrapper: { backgroundColor: '#181e34', flex: 1 },
  container: {
    justifyContent: 'center',
    backgroundColor: '#181e34',
  },
  backgroundColor: { flex: 1, backgroundColor: '#181e34' },
  formContainer: {
    padding: 8,
  },
  button: {
    backgroundColor: 'red',
  },
});
