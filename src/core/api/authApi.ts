import {ApiService, ApiResponse} from './apiService';

// Define auth response types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  // Add other user fields as needed
}

export interface LoginResponse {
  user: UserProfile;
  tokens: AuthTokens;
}

export interface RegisterResponse {
  user: UserProfile;
  tokens: AuthTokens;
}

export class AuthApi {
  /**
   * Login with email and password
   * @param email - User's email
   * @param password - User's password
   * @returns Promise with login response
   */
  async login(
    email: string,
    password: string,
  ): Promise<ApiResponse<LoginResponse>> {
    return ApiService.post<LoginResponse>('/api/auth/login', {
      email,
      password,
    });
  }

  /**
   * Register a new user
   * @param userData - User registration data
   * @returns Promise with registration response
   */
  async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<ApiResponse<RegisterResponse>> {
    return ApiService.post<RegisterResponse>('/api/auth/register', userData);
  }

  /**
   * Get current user profile
   * @returns Promise with user profile
   */
  async getUserProfile(): Promise<ApiResponse<UserProfile>> {
    return ApiService.get<UserProfile>('/api/auth/profile');
  }

  /**
   * Refresh the authentication token
   * @param refreshToken - The refresh token
   * @returns Promise with new access token
   */
  async refreshToken(
    refreshToken: string,
  ): Promise<ApiResponse<{accessToken: string}>> {
    return ApiService.post<{accessToken: string}>('/api/auth/refreshtoken', {
      refreshToken,
    });
  }

  /**
   * Log out the current user
   * @returns Promise with logout status
   */
  async logout(): Promise<ApiResponse<{success: boolean}>> {
    return ApiService.post<{success: boolean}>('/api/auth/logout');
  }
}
