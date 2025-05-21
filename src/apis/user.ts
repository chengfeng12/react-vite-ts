// src/apis/user.ts
import request from '../request'

export const getUserInfo = (id: string) => request.get(`/user/${id}`)
import type { ApiResponse, User } from './types'

export const login = (data: { username: string; password: string }): Promise<ApiResponse<User>> =>
  request.post('/auth/login', data)

// 使用：在组件中调用 `login({ username: 'admin', password: '123' })`
