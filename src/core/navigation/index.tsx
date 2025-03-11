/* eslint-disable react/no-unstable-nested-components */
import {BlurView} from '@react-native-community/blur';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AuthScreen from '../../modules/auth';
import Home from '../../modules/home';
import {IconNames} from '../assets/icons';
import {AppIcon} from '../components';
import AppTheme from '../themes/app-themes';
import {navigationRef} from './navigationRef';
import TrackingScreen from '../../modules/tracking';

const Tab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();

function CustomTabBar({state, navigation}: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBarWrapper, {bottom: insets.bottom}]}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={20}
        reducedTransparencyFallbackColor={AppTheme.palette.background.secondary}
      />
      <View style={styles.tabBarContainer}>
        {state.routes.map((route: any, index: any) => {
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              style={styles.tabItem}
              onPress={onPress}>
              <View
                style={[
                  styles.iconContainer,
                  isFocused && styles.focusedIconContainer,
                ]}>
                {getTabBarIcon(route.name, isFocused)}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function getTabBarIcon(routeName: string, focused: boolean) {
  const iconColor = focused
    ? AppTheme.palette.text.primary
    : AppTheme.palette.text.secondary;

  const icons: Record<string, IconNames> = {
    Home: 'home',
    Tracking: 'tracking',
    Profile: 'profile',
  };

  const iconName = icons[routeName] || 'home';
  return <AppIcon name={iconName} color={iconColor} />;
}

const TabStack = () => {
  return (
    <Tab.Navigator
      tabBar={(props: any) => <CustomTabBar {...props} />}
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
        name="Tracking"
        component={TrackingScreen}
        options={{
          tabBarButtonTestID: 'profile-tab',
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
      <StatusBar translucent backgroundColor="transparent" />
      <NavigationContainer ref={navigationRef}>
        <MainStack.Navigator
          initialRouteName="Tabs"
          screenOptions={{
            headerShown: false,
            statusBarTranslucent: true,
            statusBarStyle: 'dark',
            animation: 'slide_from_right',
          }}>
          <MainStack.Screen name="Tabs" component={TabStack} />
        </MainStack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    left: 70,
    right: 70,
    bottom: 0,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: AppTheme.palette.border.medium,
  },
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: AppTheme.palette.background.blur,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusedIconContainer: {
    backgroundColor: AppTheme.palette.background.primary,
  },
});
