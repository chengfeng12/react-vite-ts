// src/types/react-router.d.ts
import { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom'

type CustomMeta = {
  title?: string
  requiresAuth?: boolean
  noLayout?: boolean
}

declare module 'react-router-dom' {
  interface IndexRouteObject {
    meta?: CustomMeta
  }

  interface NonIndexRouteObject {
    meta?: CustomMeta
  }
}

// 导出给业务代码使用
export type AppRouteObject = IndexRouteObject | NonIndexRouteObject
