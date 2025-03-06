// filepath: /Users/bachpham/Desktop/react-native-form/src/core/navigation/index.tsx
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AuthScreen from '../../modules/auth';
import Home from '../../modules/home';
import {navigationRef} from './navigationRef';

const Tab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarButtonTestID: 'home-tab',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AuthScreen}
        options={{
          tabBarButtonTestID: 'profile-tab',
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <MainStack.Navigator
          initialRouteName="Tabs"
          screenOptions={{
            headerShown: false,
            statusBarStyle: 'light',
            animation: 'slide_from_right',
          }}>
          <MainStack.Screen name="Tabs" component={TabStack} />
        </MainStack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default MainNavigator;
