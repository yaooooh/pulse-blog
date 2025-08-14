import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults, Method } from 'axios';

class Request {
  instance: AxiosInstance | null = null

  constructor(baseConfig?: CreateAxiosDefaults) {
    if (!this.instance) {
      this.instance = axios.create(baseConfig);
    }
    this.instance.interceptors.response.use((value) => {
      return value.data;
    }, (error) => {
      throw error;
    })
  }

  request<T>(path: string, method: Method, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    if (!this.instance) {
      throw new Error('Request instance must be created before using.');
    }
    return this.instance.request<T>({
      url: path,
      method,
      ...options
    });
  }

  get<T, D = any>(path: string, params?: D, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request(path, 'GET', Object.assign({}, options, { params }));
  }

  post<T, D = any>(path: string, data?: D, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request(path, 'POST', Object.assign({}, options, { data }));
  }

  put<T, D = any>(path: string, data?: D, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request(path, 'PUT', Object.assign({}, options, { data }));
  }

  delete<T>(path: string, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request(path, 'DELETE', options);
  }
}

export default Request;
