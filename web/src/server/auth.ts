/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth'

import { ApiResponse } from '@/@types'
import { ILoginResponse } from '@/@types/auth'
import axiosBase from '@/lib/axios-base'

import authConfig from './auth.config'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account && account.provider === 'google') {
        const { data: responseData } = await axiosBase.post<ApiResponse<ILoginResponse>>('/auth/google', {
          token: account.id_token
        })

        if (!responseData) return false

        user.id = responseData.data.user.id
        user.accessToken = responseData.data.accessToken
        user.refreshToken = responseData.data.refreshToken
      }

      return true
    },

    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        accessTokenExpires: token.accessTokenExpires,
        refreshToken: token.refreshToken,
        user: token.user
      }
    }
  },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  ...authConfig
})
