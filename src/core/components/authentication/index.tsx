import React, { useState } from 'react';
import { View } from 'react-native';
import { BiometricAuth } from '../biometric-auth';
import { LockScreen } from '../lock-screen';

interface AuthenticationProps {
  onAuthSuccess: () => void;
  onAuthFail?: () => void;
}

export const Authentication: React.FC<AuthenticationProps> = ({
  onAuthSuccess,
  onAuthFail,
}) => {
  const [showLockScreen, setShowLockScreen] = useState(false);

  const handleBiometricFallback = () => {
    setShowLockScreen(true);
  };

  const handleLockScreenSuccess = () => {
    setShowLockScreen(false);
    onAuthSuccess();
  };

  const handleCancel = () => {
    setShowLockScreen(false);
    onAuthFail?.();
  };

  if (showLockScreen) {
    return (
      <LockScreen onSuccess={handleLockScreenSuccess} onCancel={handleCancel} />
    );
  }

  return (
    <View>
      <BiometricAuth
        onFallback={handleBiometricFallback}
        onSuccess={onAuthSuccess}
        onFail={onAuthFail}
      />
    </View>
  );
};
