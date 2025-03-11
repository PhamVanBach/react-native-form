import React from 'react';
import {ViewProps} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface AppResponsiveViewProps extends ViewProps {
  children: React.ReactNode;
  withSafeArea?: ('top' | 'bottom' | 'right' | 'left')[];
}

const AppResponsiveView = ({
  children,
  withSafeArea = ['top'],
  style,
  ...props
}: AppResponsiveViewProps) => {
  return (
    <SafeAreaView edges={withSafeArea} style={style} {...props}>
      {children}
    </SafeAreaView>
  );
};

export default AppResponsiveView;
