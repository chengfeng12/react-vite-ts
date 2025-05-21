import Header from '@/components/Layouts/Header'
import Footer from '@/components/Layouts/Footer'
import { ReactNode } from 'react'

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Header />
      <main className={'container mx-auto p-4'}>{children}</main>
      <Footer />
    </>
  )
}
