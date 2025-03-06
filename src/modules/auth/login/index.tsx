import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import {loginSchema} from '../../../core/common/validations';
import AppForm from '../../../core/components/app-form';
import AppHeader from '../../../core/components/app-header';
import AppTextInput from '../../../core/components/app-text-input';
import {Authentication} from '../../../core/components/authentication';
import {useAppDispatch} from '../../../core/redux/hooks';
import {login} from '../../../core/redux/reducers/authSlice';
import {useDatabase} from '../../../database/hooks/useDatabase';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {isReady} = useDatabase();

  const {
    control,
    handleSubmit,
    register,
    trigger,
    formState: {errors},
  } = useForm<any>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: 'bachne@gmail.com',
      password: '123456',
    },
  });

  const handleAuthSuccess = () => {
    navigation.navigate('Home');
  };

  const handleAuthFail = () => {
    console.log('Authentication failed');
  };

  const onSubmit = (data: {email: string; password: string}) => {
    dispatch(login(data));
  };

  if (!isReady) {
    return <Text>Loading database...</Text>;
  }

  return (
    <SafeAreaView testID="login-screen" style={styles.containerWrapper}>
      <AppHeader title="Login" />
      <AppForm
        control={control}
        register={register}
        triggerValidation={trigger}
        errors={errors}>
        <AppTextInput name="email" label="Email" />
        <AppTextInput name="password" label="Password" secureTextEntry={true} />
      </AppForm>

      <Authentication
        onAuthSuccess={handleAuthSuccess}
        onAuthFail={handleAuthFail}
      />
      <Button testID="submit" title="Submit" onPress={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  containerWrapper: {backgroundColor: '#181e34', flex: 1},
  container: {
    justifyContent: 'center',
    backgroundColor: '#181e34',
  },
  backgroundColor: {flex: 1, backgroundColor: '#181e34'},
  formContainer: {
    padding: 8,
  },
  button: {
    backgroundColor: 'red',
  },
});
