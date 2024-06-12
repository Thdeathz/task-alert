'use client'

import { VariantProps, cva } from 'class-variance-authority'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { cn } from '@/lib/utils'

const sideLinkVariants = cva('rounded-md px-4 py-2 text-2xl transition-all duration-200', {
  variants: {
    active: {
      true: 'bg-slate-900 text-white',
      false: 'hover:bg-slate-100'
    }
  },
  defaultVariants: {
    active: false
  }
})

interface Props extends VariantProps<typeof sideLinkVariants> {
  to: string
  icon: React.ReactNode
}

export default function SideLink({ to, icon }: Props) {
  const pathname = usePathname()
  const isActive = pathname === to

  return (
    <Link href={to} className={cn(sideLinkVariants({ active: isActive }))}>
      {icon}
    </Link>
  )
}
