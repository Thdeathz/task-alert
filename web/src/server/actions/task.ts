'use server'

import { ApiResponse } from '@/@types'
import { ITask, ITaskDetail } from '@/@types/task'
import axiosAuth from '@/lib/axios-auth'

export const getAllTasks = async () => {
  try {
    const { data: response } = await axiosAuth.get<ApiResponse<ITask[]>>('/tasks')

    return response.data
  } catch (error) {
    return []
  }
}

export const getTaskDetail = async (id: string) => {
  try {
    const { data: response } = await axiosAuth.get<ApiResponse<ITaskDetail>>(`/tasks/${id}`)

    return response.data
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
    const { data: response } = await axiosAuth.put<ApiResponse<ITaskDetail>>(`/tasks/${id}`, { notifyOption, notifyAt })

    return response.data
  } catch (error) {
    return null
  }
}
