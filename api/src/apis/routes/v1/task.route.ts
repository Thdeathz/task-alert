import { Router } from 'express'

import { getAllTasks, getTaskDetail, updateNotifyOption } from '@/apis/controllers/task.controller'

const router = Router()

router.route('/').get(getAllTasks)

router.route('/:id').get(getTaskDetail).put(updateNotifyOption)

export default router
