/**
 * @file useAxiosApi.ts
 * @desc axios 封装
 * @author KeeneChen <keenechen@qq.com>
 * @since  2024.01.30-14:30:52
 */

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

/**
 * 定义通用响应结构,用于封装 API 返回的数据
 */
export interface Result<T = any> {
  code: number;
  data: T; // 数据部分
  message?: string; // 可选的错误信息或提示信息
}

/**
 * 创建一个基于 Axios 的类,提供请求方法及错误处理功能。
 */
export class useAxiosApi {
  // 初始化 Axios 实例并设置基本配置项
  instance: AxiosInstance;
  baseConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_BASE_URL || '', // 设置基础 URL
    timeout: 5000 // 设置请求超时时间
  };

  /**
   * 构造函数,接收额外的 Axios 配置项并创建实例。
   * @param config 自定义 Axios 请求配置对象
   */
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create({ ...this.baseConfig, ...config }); // 合并配置并创建 Axios 实例

    // 添加请求拦截器
    this.instance.interceptors.request.use(
      (requestConfig: AxiosRequestConfig) => {
        // 在这里可以添加全局请求前的处理逻辑,如统一添加 token 等操作
        return requestConfig;
      },
      (error) => {
        // 若请求拦截器中出现错误,直接返回 Promise.reject
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器,处理常见的 HTTP 错误码
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 对于成功的响应,直接返回原始响应对象
        return response;
      },
      (error: any) => {
        // 对于错误的响应,处理并记录错误信息
        let errorMessage: string;

        // 根据 HTTP 状态码生成相应的错误消息
        switch (error.response?.status) {
          case 400:
            errorMessage = '请求错误(400)';
            break;
          case 401:
            errorMessage = '未授权,请登录(401)';
            break;
          case 403:
            errorMessage = '拒绝访问(403)';
            break;
          case 404:
            errorMessage = '请求出错(404)';
            break;
          case 408:
            errorMessage = '请求超时(408)';
            break;
          case 500:
            errorMessage = '服务器错误(500)';
            break;
          default:
            errorMessage = `连接出错(${error.response.status})!`;
        }

        console.log(errorMessage);

        // 返回 Promise.reject,以便外部能捕获到此错误
        return Promise.reject(error.response);
      }
    );
  }

  /**
   * 发送任意类型的 HTTP 请求
   * @param config Axios 请求配置对象
   * @returns Axios 响应结果
   */
  public request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.request<T>(config);
  }

  /**
   * 发送 GET 请求
   * @param url 请求的 URL
   * @param config 自定义 Axios 请求配置（可选）
   * @returns 包含 Result 类型数据的 Axios 响应结果
   */
  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
    return this.instance.get<Result<T>>(url, config);
  }

  /**
   * 发送 POST 请求
   * @param url 请求的 URL
   * @param data 要发送的数据（可选）
   * @param config 自定义 Axios 请求配置（可选）
   * @returns 包含 Result 类型数据的 Axios 响应结果
   */
  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.post<Result<T>>(url, data, config);
  }

  /**
   * 发送 PUT 请求
   * @param url 请求的 URL
   * @param data 要更新的数据（可选）
   * @param config 自定义 Axios 请求配置（可选）
   * @returns 包含 Result 类型数据的 Axios 响应结果
   */
  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.put<Result<T>>(url, data, config);
  }

  /**
   * 发送 DELETE 请求
   * @param url 请求的 URL
   * @param config 自定义 Axios 请求配置（可选）
   * @returns 包含 Result 类型数据的 Axios 响应结果
   */
  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.delete<Result<T>>(url, config);
  }
}

// 创建默认的 AxiosApiHelper 单例对象
export default new useAxiosApi({});
