'use client'

import { CgDanger } from 'react-icons/cg'
import { FaBell } from 'react-icons/fa6'

import { cn } from '@/lib/utils'

type Props = {
  status?: 'warning' | 'danger' | null
  className?: string
}

export default function TaskIcon({ status, className }: Props) {
  if (status === 'warning')
    return (
      <div className={cn('h-4 w-4 rounded-md bg-yellow-500', className)}>
        <FaBell />
      </div>
    )

  if (status === 'danger')
    return (
      <div className={cn('flex-center h-10 w-10 rounded-md bg-[#FF5474] text-[1.675rem]', className)}>
        <CgDanger />
      </div>
    )

  return null
}
