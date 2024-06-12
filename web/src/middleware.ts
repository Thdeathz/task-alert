/* eslint-disable consistent-return */

import { auth } from '@/server/auth'

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}

export default auth(async (req) => {})
