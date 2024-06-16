'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { IUserInfo } from '@/@types/auth'
import { UpdateUserInfo } from '@/schema/task-schema'
import { updateUserInfo } from '@/server/actions/task'

import Loading from '../loading'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

type Props = {
  user: IUserInfo
}

export default function SettingForm({ user }: Props) {
  const [isLoading, startTransition] = useTransition()

  const form = useForm<z.infer<typeof UpdateUserInfo>>({
    resolver: zodResolver(UpdateUserInfo),
    defaultValues: {
      email: user.email,
      phoneNumber: user.phoneNumber
    }
  })

  const onSubmit = async (data: { email: string; phoneNumber: string }) => {
    startTransition(async () => {
      try {
        await updateUserInfo({
          id: user.id,
          email: data.email,
          phoneNumber: data.phoneNumber
        })
        toast.success(
          'User info updated successfully. New mail has been sent to your email address. Please check it out.'
        )
      } catch (error) {
        toast.error('Failed to update user info')
      }
    })
  }

  return (
    <Form {...form}>
      <form className="w-2/3" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="superman@example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="******" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="mt-4" disabled={isLoading}>
          {isLoading ? <Loading /> : 'Update notifications'}
        </Button>
      </form>
    </Form>
  )
}
