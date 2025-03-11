import React from 'react';
import {AppTabView} from '../../core/components';
import AppResponsiveView from '../../core/components/app-responsive-view';
import LoginScreen from './login';
import RegisterScreen from './register';
import AppTheme from '../../core/themes/app-themes';

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
    <AppResponsiveView
      testID="auth-screen"
      style={AppTheme.components.container}>
      <AppTabView
        routes={routes}
        scenes={scenes}
        sceneProps={sceneProps}
        initialIndex={0}
      />
    </AppResponsiveView>
  );
};

export default AuthScreen;
