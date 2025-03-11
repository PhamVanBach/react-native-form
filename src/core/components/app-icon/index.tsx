import React from 'react';
import {SvgProps} from 'react-native-svg';
import {Icons, IconNames} from '../../assets/icons';

interface AppIconProps extends SvgProps {
  name: IconNames;
  size?: number;
}

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 24,
  width,
  height,
  ...props
}) => {
  const Icon = Icons[name];

  if (!Icon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <Icon width={width ?? size} height={height ?? size} {...props} />;
};
