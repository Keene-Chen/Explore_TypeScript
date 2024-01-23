import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

export interface Result<T = any> {
  code: number;
  data: T;
  message?: string;
}

export class useAxiosApi {
  instance: AxiosInstance;
  baseConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_BASE_URL || '',
    timeout: 5000
  };

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: any) => {
        // 处理 http 常见错误
        let msg = '';
        switch (error.response.status) {
          case 400:
            msg = '请求错误(400)';
            break;
          case 401:
            msg = '未授权，请登录(401)';
            break;
          case 403:
            msg = '拒绝访问(403)';
            break;
          case 404:
            msg = '请求出错(404)';
            break;
          case 408:
            msg = '请求超时(408)';
            break;
          case 500:
            msg = '服务器错误(500)';
            break;
          default:
            msg = `连接出错(${error.response.status})!`;
        }
        console.log(msg);

        return Promise.reject(error.response);
      }
    );
  }

  // 定义请求方法
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
    return this.instance.get(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.delete(url, config);
  }
}

export default new useAxiosApi({});
