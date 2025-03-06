import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import {registerSchema} from '../../../core/common/validations';
import AppForm from '../../../core/components/app-form';
import AppHeader from '../../../core/components/app-header';
import AppTextInput from '../../../core/components/app-text-input';
import {useAppDispatch} from '../../../core/redux/hooks';
import {useDatabase} from '../../../database/hooks/useDatabase';
import {registerUser} from '../../../core/redux/reducers/authSlice';

const RegisterScreen = () => {
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
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: 'Bach Ne',
      email: 'bachne@gmail.com',
      password: '123456',
    },
  });

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    dispatch(registerUser(data));
  };

  if (!isReady) {
    return <Text>Loading database...</Text>;
  }

  return (
    <SafeAreaView testID="register-screen" style={styles.containerWrapper}>
      <AppHeader title="Register" />
      <AppForm
        control={control}
        register={register}
        triggerValidation={trigger}
        errors={errors}>
        <AppTextInput name="name" label="Name" />
        <AppTextInput name="email" label="Email" />
        <AppTextInput name="password" label="Password" secureTextEntry={true} />
      </AppForm>

      <Button
        testID="submit"
        title="Register"
        onPress={handleSubmit(onSubmit)}
      />
      <Button
        title="Already have an account? Login"
        onPress={() => navigation.navigate('Login')}
      />
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  containerWrapper: {
    backgroundColor: '#181e34',
    flex: 1,
  },
});
