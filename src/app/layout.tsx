import './globals.css'

import { Navbar } from '@/shared/components/Navbar'
import { Providers } from './providers'

export const metadata = {
  title: 'Ecommerce',
  description: 'Ecommerce base with Next.js, RTK Query & Shadcn',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Providers>
          <Navbar />
          <main className="container mx-auto py-8">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
