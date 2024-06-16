/* eslint-disable no-new */

'use client'

import React, { useEffect } from 'react'
import { toast } from 'sonner'

import { socket } from './connect-socket'

export default function NotifyAlert({ children }: { children: React.ReactNode }) {
  const requestPermission = () => {
    if (!('Notification' in window)) return

    if (Notification.permission === 'granted') return

    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        toast.success('Notification permission granted.', {
          id: 'notify-permission'
        })
      }
    })
  }

  const pushNotification = (title: string) => {
    if (!('Notification' in window)) return

    if (Notification.permission === 'granted') {
      new Notification(title)
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(title)
        }
      })
    }
  }

  useEffect(() => {
    requestPermission()

    socket.on('task:new', ({ id, title }: { id: string; title: string }) => {
      toast.info(`Task ${title} will be due soon.`, {
        id
      })

      pushNotification(`Task ${title} will be due soon.`)
    })
  }, [])

  return children
}
