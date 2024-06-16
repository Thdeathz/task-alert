'use server'

import { ApiResponse } from '@/@types'
import { IUser } from '@/@types/user'
import axiosAuth from '@/lib/axios-auth'
import fetchBase from '@/lib/fetch-base'

export const getAllUsers = async () => {
  const { data: response } = await axiosAuth.get<ApiResponse<IUser[]>>('/users')

  return response.data
}

export const getCurrentUser = async () => {
  const { data: response } = await fetchBase<ApiResponse<IUser>>({
    method: 'GET',
    endpoint: '/users/me',
    tags: ['me']
  })

  return response
}
