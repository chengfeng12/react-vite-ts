import type { AppRouteObject } from '@/types/react-router'
import '@/routes/types'
import { withLayout } from './withLayout'
import { lazy, Suspense } from 'react'

const LazyHome = withLayout(lazy(() => import('@/pages/Home')))
const LazyAbout = lazy(() => import('@/pages/About'))

import NotFound from '@/pages/NotFound'

const routes: AppRouteObject[] = [
  {
    path: '/',
    element: <LazyHome />, // 默认使用带布局的根路由
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyHome />
          </Suspense>
        ),
        meta: {
          title: '首页',
          requiresAuth: true
        }
      }
      // 其他需要布局的路由...
    ]
  },
  {
    path: '/about',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyAbout />
      </Suspense>
    )
  },
  {
    path: '*',
    element: <NotFound />
  }
]

export default routes
