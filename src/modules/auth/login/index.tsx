import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Button, SafeAreaView, StyleSheet } from 'react-native';
import { registerSchema } from '../../../core/common/validations';
import AppForm from '../../../core/components/app-form';
import AppHeader from '../../../core/components/app-header';
import AppTextInput from '../../../core/components/app-text-input';

const LoginScreen = () => {
  //   const navigation = useNavigation<any>();
  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = () => {
    // navigation.navigate('Home');
  };

  return (
    <SafeAreaView testID="login-screen" style={styles.containerWrapper}>
      <AppHeader title="Login" />
      <AppForm
        register={register}
        setValue={setValue}
        triggerValidation={trigger}
        errors={errors}>
        <AppTextInput name="name" label="Name " />
        <AppTextInput name="password" label="Password" secureTextEntry={true} />
        <AppTextInput name="email" label="Email" />
      </AppForm>
      <Button testID="submit" title="Submit" onPress={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
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
