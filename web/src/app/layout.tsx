import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

import './globals.css'
import Sidebar from '@/components/layout/sidebar'
import Providers from '@/components/providers'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Task alert',
  description: 'Task alert project for HUST ITSS-2 course'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'bg-[#f1f4f9]')}>
        <div className="relative flex h-screen w-screen overflow-y-auto">
          <Sidebar />

          <div className="w-0 shrink grow px-6 pb-6">
            <div className="mx-auto max-w-[1800px]">
              <Providers>{children}</Providers>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
