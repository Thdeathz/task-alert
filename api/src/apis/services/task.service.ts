import { NotificationType, TaskType } from '@prisma/client'

import prisma from '@/apis/databases/init.prisma'
import HttpError from '@/apis/utils/http-error'

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
}

const createNewTask = async ({ title, tag, type, dueDate, description }: CreateNewTaskProps) => {
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
      tag: {
        create: {
          title: tag,
          slug: tag.toLowerCase().replace(' ', '-'),
        },
      },
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  })

  return newTask
}

export default {
  getAllTasks,
  getTaskDetail,
  updateNotifyOption,
  createNewTask,
}
