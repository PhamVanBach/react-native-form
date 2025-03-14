import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Text, View} from 'react-native';
import {registerSchema} from '../../../core/common/validations';
import AppForm from '../../../core/components/app-form';
import AppTextInput from '../../../core/components/app-text-input';
import {useAppDispatch} from '../../../core/redux/hooks';
import {registerUser} from '../../../core/redux/reducers/authSlice';
import AppTheme from '../../../core/themes/app-themes';
import {useDatabase} from '../../../database/hooks/useDatabase';

interface RegisterScreenProps {
  jumpTo?: (key: string) => void;
}

const RegisterScreen = ({jumpTo}: RegisterScreenProps) => {
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
    // jumpTo?.('login');
  };

  if (!isReady) {
    return <Text>Loading database...</Text>;
  }

  return (
    <View testID="register-screen" style={AppTheme.components.screenContainer}>
      <AppForm
        style={AppTheme.components.formContainer}
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
    </View>
  );
};

export default RegisterScreen;
