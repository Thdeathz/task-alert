import type { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

import taskService from '@/apis/services/task.service'
import makeResponse from '@/apis/utils/make-response'

/**
 * @desc Get all tasks
 * @route GET /tasks
 * @access Private
 */
export const getAllTasks: RequestHandler = async (req, res) => {
  const tasks = await taskService.getAllTasks()

  return res.status(StatusCodes.OK).json(makeResponse.defaultResponse('Get all tasks success', StatusCodes.OK, tasks))
}

/**
 * @desc Get task detail
 * @route GET /tasks/:id
 * @access Private
 */
export const getTaskDetail: RequestHandler = async (req, res) => {
  const { id } = req.params
  const task = await taskService.getTaskDetail(id)

  return res.status(StatusCodes.OK).json(makeResponse.defaultResponse('Get task detail success', StatusCodes.OK, task))
}

/**
 * @desc Update notify option
 * @route PUT /tasks/:id
 * @access Private
 */
export const updateNotifyOption: RequestHandler = async (req, res) => {
  const { id } = req.params
  const { notifyOption, notifyAt } = req.body
  const updatedTask = await taskService.updateNotifyOption(id, notifyOption, notifyAt)

  return res
    .status(StatusCodes.OK)
    .json(makeResponse.defaultResponse('Update notify option success', StatusCodes.OK, updatedTask))
}

/**
 * @desc Create new task
 * @route POST /tasks
 * @access Private
 */
export const createNewTask: RequestHandler = async (req, res) => {
  const { title, tag, type, dueDate, description, notifyOption, notifyAt } = req.body
  const newTask = await taskService.createNewTask({ title, tag, type, dueDate, description, notifyOption, notifyAt })

  return res
    .status(StatusCodes.CREATED)
    .json(makeResponse.defaultResponse('Create new task success', StatusCodes.CREATED, newTask))
}
