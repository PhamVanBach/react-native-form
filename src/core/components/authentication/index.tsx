import React from 'react';
import {View} from 'react-native';
import {useSheetContext} from '../../contexts/SheetContext';
import {ESheetID} from '../../types/sheets';
import {BiometricAuth} from '../biometric-auth';

interface AuthenticationProps {
  onAuthSuccess: () => void;
  onAuthFail?: () => void;
}

export const Authentication: React.FC<AuthenticationProps> = ({
  onAuthSuccess,
  onAuthFail,
}) => {
  const {openSheet, closeSheet} = useSheetContext();

  const onFail = () => {
    onAuthFail?.();
    closeSheet();
  };

  const onSuccess = () => {
    onAuthSuccess?.();
    closeSheet();
  };

  const handleBiometricFallback = () => {
    openSheet(ESheetID.ACTION_BUTTON_SHEET, {
      onSuccess: onSuccess,
      onCancel: onFail,
    });
  };

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
