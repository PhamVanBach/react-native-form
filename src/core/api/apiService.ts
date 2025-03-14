import api from './axios';

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

export class ApiService {
  /**
   * Make a GET request
   * @param url - The endpoint URL
   * @param params - Optional query parameters
   * @returns Promise with the response data
   */
  static async get<T>(url: string, params?: object): Promise<ApiResponse<T>> {
    try {
      const response = await api.get(url, {params});
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Make a POST request
   * @param url - The endpoint URL
   * @param data - The data to send in the request body
   * @param config - Optional axios config
   * @returns Promise with the response data
   */
  static async post<T>(
    url: string,
    data?: any,
    config?: object,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await api.post(url, data, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Make a PUT request
   * @param url - The endpoint URL
   * @param data - The data to send in the request body
   * @param config - Optional axios config
   * @returns Promise with the response data
   */
  static async put<T>(
    url: string,
    data?: any,
    config?: object,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await api.put(url, data, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Make a DELETE request
   * @param url - The endpoint URL
   * @param config - Optional axios config
   * @returns Promise with the response data
   */
  static async delete<T>(
    url: string,
    config?: object,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await api.delete(url, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Make a PATCH request
   * @param url - The endpoint URL
   * @param data - The data to send in the request body
   * @param config - Optional axios config
   * @returns Promise with the response data
   */
  static async patch<T>(
    url: string,
    data?: any,
    config?: object,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await api.patch(url, data, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Upload a file
   * @param url - The endpoint URL
   * @param formData - FormData containing the file(s) to upload
   * @returns Promise with the response data
   */
  static async uploadFile<T>(
    url: string,
    formData: FormData,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      throw error;
    }
  }
}
