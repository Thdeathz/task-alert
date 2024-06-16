'use server'

import { revalidateTag } from 'next/cache'
import * as z from 'zod'

import { ApiResponse } from '@/@types'
import { INotifyOption, ITask, ITaskDetail } from '@/@types/task'
import fetchBase from '@/lib/fetch-base'
import { CreateTaskSchema } from '@/schema/task-schema'

export const getAllTasks = async () => {
  try {
    const { data: response } = await fetchBase<ApiResponse<ITask[]>>({
      method: 'GET',
      endpoint: '/tasks',
      tags: ['tasks']
    })

    return response
  } catch (error) {
    return []
  }
}

export const getTaskDetail = async (id: string) => {
  try {
    const { data: response } = await fetchBase<ApiResponse<ITaskDetail>>({
      method: 'GET',
      endpoint: `/tasks/${id}`
    })

    return response
  } catch (error) {
    return null
  }
}

export const updateNotifyOption = async (
  id: string,
  notifyOption: string[],
  notifyAt: { value: number; unit: string }
) => {
  try {
    const { data: response } = await fetchBase<ApiResponse<ITaskDetail>>({
      method: 'PUT',
      endpoint: `/tasks/${id}`,
      body: JSON.stringify({ notifyOption, notifyAt })
    })

    return response
  } catch (error) {
    return null
  }
}

interface CreateNewTaskProps extends z.infer<typeof CreateTaskSchema>, INotifyOption {
  type: string
}

export const createNewTask = async (data: CreateNewTaskProps) => {
  const { data: response } = await fetchBase<ApiResponse<null>>({
    method: 'POST',
    endpoint: '/tasks',
    body: JSON.stringify(data)
  })

  revalidateTag('tasks')

  return response
}

export const updateUserInfo = async (data: { id: string; email: string; phoneNumber: string }) => {
  const { data: response } = await fetchBase<ApiResponse<null>>({
    method: 'PUT',
    endpoint: `/users`,
    body: JSON.stringify({
      id: data.id,
      email: data.email,
      phoneNumber: data.phoneNumber
    })
  })

  revalidateTag('me')

  return response
}
