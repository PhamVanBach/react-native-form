import * as React from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm } from 'react-hook-form';
import AppForm from './core/components/app-form';
import AppTextInput from './core/components/app-text-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from './core/common/validations';
import { useRef } from 'react';

export default () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const scrollViewRef = useRef<any>(null);
  const nameInputPosition = useRef<number>(0);
  const emailInputPosition = useRef<number>(0);
  const passwordInputPosition = useRef<number>(0);

  const onSubmit = (data: FormData) => {
    Alert.alert('data', JSON.stringify(data));
  };

  const onError = (errorValue: any) => {
    var keys = Object.keys(errorValue);

    keys.forEach(function (key) {
      switch (key) {
        case 'name':
          scrollToYOffset(nameInputPosition.current);
          break;
        case 'email':
          scrollToYOffset(emailInputPosition.current);
          break;
        case 'password':
          scrollToYOffset(passwordInputPosition.current);
          break;
        default:
          break;
      }
    });
  };

  const scrollToYOffset = (y: number = 0) => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: 0, y });
      }
    }, 500);
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#181e34' }}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.container}
        style={{ backgroundColor: '#181e34' }}>
        <View style={styles.formContainer}>
          <AppForm register={register} setValue={setValue} errors={errors}>
            <AppTextInput ref={nameInputPosition} name="name" label="Name " />
            <AppTextInput ref={emailInputPosition} name="email" label="Email" />
            <AppTextInput
              ref={passwordInputPosition}
              name="password"
              label="Password"
              secureTextEntry={true}
            />
            <Button title="Submit" onPress={handleSubmit(onSubmit, onError)} />
          </AppForm>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#181e34',
  },
  formContainer: {
    padding: 8,
    flex: 1,
  },
  button: {
    backgroundColor: 'red',
  },
});
