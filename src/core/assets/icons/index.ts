import HomeSvg from './home.svg';
import ProfileSvg from './profile.svg';
import TrackingSvg from './tracking.svg';

export const Icons = {
  home: HomeSvg,
  profile: ProfileSvg,
  tracking: TrackingSvg,
} as const;

export type IconNames = keyof typeof Icons;
