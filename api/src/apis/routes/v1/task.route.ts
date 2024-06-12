import { Router } from 'express'

import { createNewTask, getAllTasks, getTaskDetail, updateNotifyOption } from '@/apis/controllers/task.controller'

const router = Router()

router.route('/').get(getAllTasks).post(createNewTask)

router.route('/:id').get(getTaskDetail).put(updateNotifyOption)

export default router
