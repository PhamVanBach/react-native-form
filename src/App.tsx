import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import { registerSchema } from './core/common/validations';
import AppForm from './core/components/app-form';
import AppTextInput from './core/components/app-text-input';

export default () => {
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

  const onSubmit = (data: FormData) => {
    Alert.alert('data', JSON.stringify(data));
  };

  return (
    <SafeAreaView style={styles.containerWrapper}>
      <Text testID="greeting">Register</Text>
      <AppForm
        register={register}
        setValue={setValue}
        triggerValidation={trigger}
        errors={errors}>
        <AppTextInput name="name" label="Name " />
        <AppTextInput name="password" label="Password" secureTextEntry={true} />
        <AppTextInput name="email" label="Email" />
      </AppForm>
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
};

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
