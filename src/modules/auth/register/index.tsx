import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import {Alert, Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import {registerSchema} from '../../../core/common/validations';
import AppForm from '../../../core/components/app-form';
import AppHeader from '../../../core/components/app-header';
import AppTextInput from '../../../core/components/app-text-input';
import {useDatabase} from '../../../database/hooks/useDatabase';

const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const {db, isReady} = useDatabase();

  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: {errors},
  } = useForm<any>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await db.insert('users', {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.error) {
        Alert.alert('Error', response.error.message);
        return;
      }

      Alert.alert('Success', 'Account created successfully', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

  if (!isReady) {
    return <Text>Loading database...</Text>;
  }

  return (
    <SafeAreaView testID="register-screen" style={styles.containerWrapper}>
      <AppHeader title="Register" />
      <AppForm
        register={register}
        setValue={setValue}
        triggerValidation={trigger}
        errors={errors}>
        <AppTextInput name="name" label="Name" />
        <AppTextInput name="email" label="Email" />
        <AppTextInput name="password" label="Password" secureTextEntry={true} />
        <AppTextInput
          name="confirmPassword"
          label="Confirm Password"
          secureTextEntry={true}
        />
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
