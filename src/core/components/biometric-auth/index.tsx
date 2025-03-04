import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { BiometricsService } from '../../utils/biometrics';

interface BiometricAuthProps {
  onSuccess: () => void;
  onFail?: () => void;
  onFallback: () => void;
}

export const BiometricAuth: React.FC<BiometricAuthProps> = ({
  onSuccess,
  onFail,
  onFallback,
}) => {
  const [isBiometricsAvailable, setIsBiometricsAvailable] = useState(false);

  useEffect(() => {
    checkBiometrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkBiometrics = async () => {
    const available = await BiometricsService.isBiometricsAvailable();
    setIsBiometricsAvailable(available);
    if (!available) {
      onFallback();
    }
  };

  const handleAuthentication = async () => {
    try {
      const success = await BiometricsService.authenticateWithFallback(
        onFallback,
      );
      if (success) {
        onSuccess();
      }
    } catch (error) {
      onFail?.();
    }
  };

  if (!isBiometricsAvailable) {
    return null;
  }

  return (
    <View>
      <Button
        title="Authenticate with Biometrics"
        onPress={handleAuthentication}
      />
    </View>
  );
};
