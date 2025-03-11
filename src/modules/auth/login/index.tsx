import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Text, View} from 'react-native';
import {loginSchema} from '../../../core/common/validations';
import AppForm from '../../../core/components/app-form';
import AppTextInput from '../../../core/components/app-text-input';
import {Authentication} from '../../../core/components/authentication';
import {useAppDispatch} from '../../../core/redux/hooks';
import {login} from '../../../core/redux/reducers/authSlice';
import AppTheme from '../../../core/themes/app-themes';
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
    <View style={AppTheme.components.screenContainer}>
      <AppForm
        style={AppTheme.components.formContainer}
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
    </View>
  );
};

export default LoginScreen;
