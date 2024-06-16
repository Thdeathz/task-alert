'use client'

import { useEffect, useState } from 'react'

import { ITask } from '@/@types/task'

import { socket } from '../connect-socket'

import TaskItem from './task-item'

export default function NotifyTasksList() {
  const [tasks, setTasks] = useState<ITask[]>([])

  const onNewNotifyTask = (data: ITask[]) => {
    setTasks(data)
  }

  useEffect(() => {
    socket.emit('task:notify')

    socket.on('task:get', onNewNotifyTask)

    return () => {
      socket.off('task:get', onNewNotifyTask)
    }
  }, [])

  if (!tasks || tasks.length === 0) {
    return <p className="text-lg font-medium opacity-30">No tasks available</p>
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}
