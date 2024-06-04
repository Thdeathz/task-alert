/**
 * An array of public routes that are accessible to all users.
 * @type {string[]}
 */
export const publicRoutes: string[] = []

/**
 * An array of authentication routes that are only accessible to unauthenticated users.
 */
export const authRoutes: string[] = ['/login', '/register', '/forgot-password', '/reset-password']

/**
 * An array of protected routes that are only accessible to authenticated users.s
 * @type {string[]}
 */
export const protectedRoutes: string[] = ['/']

/**
 * The prefix for the API routes.
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth'

/**
 * The default redirect path after a user logs in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/'
