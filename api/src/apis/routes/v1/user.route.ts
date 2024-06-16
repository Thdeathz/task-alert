import { UserRole } from '@prisma/client'
import { Router } from 'express'

import { getAllUsers, getCurrentUser, updateUserInfo } from '@/apis/controllers/user.controller'
import { checkHasRole } from '@/apis/middlewares/check-role'
import { verifyAccessToken } from '@/apis/middlewares/verify-jwt'

const router = Router()

router.route('/').get(verifyAccessToken, checkHasRole(UserRole.ADMIN), getAllUsers).put(updateUserInfo)

router.route('/me').get(getCurrentUser)

export default router
