import HomeSvg from './home.svg';
import ProfileSvg from './profile.svg';
import TrackingSvg from './tracking.svg';
import CameraSvg from './camera.svg';
import LibrarySvg from './library.svg';
export const Icons = {
  home: HomeSvg,
  profile: ProfileSvg,
  tracking: TrackingSvg,
  camera: CameraSvg,
  library: LibrarySvg,
} as const;

export type IconNames = keyof typeof Icons;
