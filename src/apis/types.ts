// src/apis/types.ts
export interface ApiResponse<T> {
  code: number
  data: T
  message: string
}

export interface User {
  id: string
  name: string
}

// src/request/types.ts
import type { AxiosRequestConfig } from 'axios'

export interface RequestConfig extends AxiosRequestConfig {
  silent?: boolean // 自定义配置：是否静默处理错误
}
