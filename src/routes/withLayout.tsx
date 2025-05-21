import { LazyExoticComponent, ComponentType } from 'react'
import RootLayout from '@/components/Layouts/RootLayout'
import { useLocation } from 'react-router-dom'

type WithLayoutProps = {
  [key: string]: unknown
}

export const withLayout = (
  Component: ComponentType<WithLayoutProps> | LazyExoticComponent<ComponentType<WithLayoutProps>>
) => {
  return (props: WithLayoutProps) => {
    const { pathname } = useLocation()
    console.log(useLocation(), 'useLocation()')
    const needsLayout = !['/login', '/fullscreen'].includes(pathname)
    return needsLayout ? (
      <RootLayout>
        <Component {...props} />
      </RootLayout>
    ) : (
      <Component {...props} />
    )
  }
}
