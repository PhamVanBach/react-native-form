import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

// Initialize outside the class as a singleton
const rnBiometrics = new ReactNativeBiometrics();

export class BiometricsService {
  static async isBiometricsAvailable(): Promise<boolean> {
    try {
      if (!rnBiometrics) {
        console.error('RNBiometrics not initialized');
        return false;
      }

      const { available, biometryType } =
        await rnBiometrics.isSensorAvailable();
      console.log('Biometrics check:', { available, biometryType }); // Debug log

      return (
        available &&
        (biometryType === BiometryTypes.TouchID ||
          biometryType === BiometryTypes.FaceID ||
          biometryType === BiometryTypes.Biometrics)
      );
    } catch (error) {
      console.error('Biometrics check failed:', error);
      return false;
    }
  }

  static async authenticate(): Promise<boolean> {
    try {
      if (!rnBiometrics) {
        console.error('RNBiometrics not initialized');
        return false;
      }

      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Please authenticate',
        cancelButtonText: 'Cancel',
      });
      return success;
    } catch (error) {
      console.error('Authentication failed:', error);
      return false;
    }
  }

  static async createKeys(): Promise<boolean> {
    try {
      if (!rnBiometrics) {
        console.error('RNBiometrics not initialized');
        return false;
      }

      const { publicKey } = await rnBiometrics.createKeys();
      return !!publicKey;
    } catch (error) {
      console.error('Key creation failed:', error);
      return false;
    }
  }

  static async createSignature(payload: string): Promise<string | null> {
    try {
      if (!rnBiometrics) {
        console.error('RNBiometrics not initialized');
        return null;
      }

      const { success, signature } = await rnBiometrics.createSignature({
        promptMessage: 'Sign in',
        payload,
      });
      return success && signature ? signature : null;
    } catch (error) {
      console.error('Signature creation failed:', error);
      return null;
    }
  }

  static async authenticateWithFallback(
    onFallback: () => void,
  ): Promise<boolean> {
    try {
      if (!rnBiometrics) {
        console.error('RNBiometrics not initialized');
        onFallback();
        return false;
      }

      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Please authenticate',
        cancelButtonText: 'Use PIN',
        fallbackPromptMessage: 'Use PIN instead',
      });

      if (!success) {
        onFallback();
      }

      return success;
    } catch (error) {
      console.error('Authentication failed:', error);
      onFallback();
      return false;
    }
  }
}
