import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import {Alert, Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import {registerSchema} from '../../../core/common/validations';
import AppForm from '../../../core/components/app-form';
import AppHeader from '../../../core/components/app-header';
import AppTextInput from '../../../core/components/app-text-input';
import {Authentication} from '../../../core/components/authentication';
import {User} from '../../../database/models';
import {useDatabase} from '../../../database/hooks/useDatabase';
const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const {db, isReady} = useDatabase();
  const [users, setUsers] = React.useState<User[]>([]);

  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: {errors},
  } = useForm<any>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  React.useEffect(() => {
    if (!isReady) {
      return;
    }
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const loadUsers = async () => {
    try {
      console.log('Loading users...');
      const response = await db.select('users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleAuthSuccess = () => {
    navigation.navigate('Home');
  };

  const handleAuthFail = () => {
    console.log('Authentication failed');
  };

  const handleDeleteAccount = async () => {
    await db.delete('users', 'id = ?', [users[0].id]);
    await loadUsers();
  };

  const onSubmit = (data: {email: string; password: string}) => {
    if (
      users.some(
        user => user.email === data.email && user.password === data.password,
      )
    ) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Invalid credentials', 'Please try again');
    }
  };

  if (!isReady) {
    return <Text>Loading database...</Text>;
  }

  return (
    <SafeAreaView testID="login-screen" style={styles.containerWrapper}>
      <AppHeader title="Login" />
      <AppForm
        register={register}
        setValue={setValue}
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
      <Button title="Delete Account" onPress={handleDeleteAccount} />
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
