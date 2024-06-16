import { Task } from '@prisma/client'
import dotenv from 'dotenv'
import type { Socket } from 'socket.io'

import redisService from '@/apis/services/redis.service'

dotenv.config()

const socketEvent = (socket: Socket) => {
  if (process.env.NODE_ENV === 'development') console.log('Socket connected', socket.id)

  socket.on('task:notify', async () => {
    const data = await redisService.get<Task[]>('task', 'list')

    socket.emit('task:get', data)
  })
}

export default socketEvent
