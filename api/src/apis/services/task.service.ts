import { NotificationType, Task, TaskType } from '@prisma/client'
import { scheduleJob } from 'node-schedule'

import { getTime } from '../utils/datetime'

import redisService from './redis.service'

import prisma from '@/apis/databases/init.prisma'
import mailService from '@/apis/services/mail.service'
import HttpError from '@/apis/utils/http-error'
import io from '@/servers/init.socket'

const getAllTasks = async () => {
  const tasks = await prisma.task.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      dueDate: true,
      tag: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      id: 'desc',
    },
  })

  if (!tasks) {
    throw new HttpError(404, 'Tasks not found')
  }

  return tasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    dueDate: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(
      new Date(task.dueDate),
    ),
    tag: task.tag.title,
  }))
}

const getTaskDetail = async (id: string) => {
  const task = await prisma.task.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      type: true,
      dueDate: true,
      notifyOption: true,
      notifyAt: true,
      tag: {
        select: {
          title: true,
        },
      },
    },
  })

  if (!task) {
    throw new HttpError(404, 'Task not found')
  }

  const unit = task.notifyAt?.substring(task.notifyAt?.length - 1)
  const value = task.notifyAt && unit ? parseInt(task.notifyAt.split(unit)[0]) : 0

  return {
    id: task.id,
    title: task.title,
    description: task.description,
    type: task.type,
    dueDate: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(
      new Date(task.dueDate),
    ),
    tag: task.tag.title,
    notifyOption: task.notifyOption,
    notifyAt: {
      value,
      unit,
    },
  }
}

const updateNotifyOption = async (
  id: string,
  notifyOption: NotificationType[],
  notifyAt: { value: number; unit: string },
) => {
  const task = await prisma.task.update({
    where: {
      id,
    },
    data: {
      notifyOption,
      notifyAt: `${notifyAt.value}${notifyAt.unit}`,
    },
  })

  return task
}

type CreateNewTaskProps = {
  title: string
  tag: string
  type: TaskType
  dueDate: string
  description: string
  notifyOption: NotificationType[]
  notifyAt: { value: number; unit: string }
}

const createNewTask = async ({
  title,
  tag,
  type,
  dueDate,
  description,
  notifyAt,
  notifyOption,
}: CreateNewTaskProps) => {
  const user = await prisma.user.findFirst({
    where: {
      role: 'USER',
    },
  })

  if (!user) {
    throw new HttpError(404, 'User not found')
  }

  const newTask = await prisma.task.create({
    data: {
      title,
      description,
      dueDate: new Date(dueDate),
      type,
      notifyOption,
      notifyAt: `${notifyAt.value}${notifyAt.unit}`,
      tag: {
        connectOrCreate: {
          where: {
            slug: tag.toLowerCase().replace(' ', '-'),
          },
          create: {
            title: tag,
            slug: tag.toLowerCase().replace(' ', '-'),
          },
        },
      },
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  })

  const notifyDate = new Date(getTime(newTask.dueDate, notifyAt.value, notifyAt.unit))

  console.log(new Date(newTask.dueDate), notifyDate, notifyAt.value, notifyAt.unit)

  scheduleJob(notifyDate, async () => {
    console.log('notify task', newTask.id)

    const task = await getTaskDetail(newTask.id)

    if (!task) return

    if (task.notifyOption.includes('EMAIL')) {
      // send email
      const user = await prisma.user.findFirst({
        where: {
          role: 'USER',
        },
      })

      if (!user || !user.email) {
        throw new HttpError(404, 'User not found')
      }

      await mailService.taskNotification(user.email, task.title)
    }

    if (task.notifyOption.includes('APP')) {
      const allTask = (await redisService.get<Task[]>('task', 'list')) || []

      await redisService.set('task', 'list', [...allTask, task])

      io.emit('task:list', [...allTask, task])
      io.emit('task:new', {
        id: task.id,
        title: task.title,
      })
    }
  })

  scheduleJob(new Date(newTask.dueDate), async () => {
    const task = await getTaskDetail(newTask.id)

    if (!task) return

    if (task.type === 'ONETIME') {
      const notiTask = await redisService.get<Task[]>('task', 'list')

      if (notiTask && notiTask.find((each) => each.id === task.id)) {
        await redisService.set(
          'task',
          'list',
          notiTask.filter((each) => each.id !== task.id),
        )
      }

      await prisma.task.delete({
        where: {
          id: task.id,
        },
      })
    }
  })

  return newTask
}

export default {
  getAllTasks,
  getTaskDetail,
  updateNotifyOption,
  createNewTask,
}
