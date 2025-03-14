import React from 'react';
import {AppTabView} from '../../core/components';
import SafeScreen from '../../core/components/safe-area-screen';
import LoginScreen from './login';
import RegisterScreen from './register';

const tabs = ['login', 'register'];
const routes = tabs.map(tab => ({key: tab, title: tab}));
const sceneProps = {
  register: {
    onSuccess: () => console.log('Registration success'),
  },
  login: {
    onSuccess: () => console.log('Login success'),
  },
};

const AuthScreen = () => {
  const scenes = {
    login: LoginScreen,
    register: RegisterScreen,
  };

  return (
    <SafeScreen>
      <AppTabView
        routes={routes}
        scenes={scenes}
        sceneProps={sceneProps}
        initialIndex={0}
      />
    </SafeScreen>
  );
};

export default AuthScreen;
