import { BiometricsService } from '../utils/biometrics';

export class AuthService {
  static async signInWithBiometrics() {
    try {
      // Create a payload with timestamp to prevent replay attacks
      const payload = `signin-${Date.now()}`;
      const signature = await BiometricsService.createSignature(payload);

      if (signature) {
        // Send the signature to your backend for verification
        // const response = await api.verify({ signature, payload });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Biometric sign-in failed:', error);
      return false;
    }
  }
}
