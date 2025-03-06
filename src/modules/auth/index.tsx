import React from 'react';
import {AppTabView} from '../../core/components';
import LoginScreen from './login';
import RegisterScreen from './register';
import {SafeAreaView} from 'react-native-safe-area-context';

const AuthScreen = () => {
  const routes = [
    {key: 'login', title: 'Login'},
    {key: 'register', title: 'Register'},
  ];

  const scenes = {
    login: LoginScreen,
    register: RegisterScreen,
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['top']}>
      <AppTabView routes={routes} scenes={scenes} initialIndex={0} />;
    </SafeAreaView>
  );
};

export default AuthScreen;
