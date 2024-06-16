import * as z from 'zod'

export const CreateTaskSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required'
  }),
  tag: z.string().min(1, {
    message: 'Tag is required'
  }),
  dueDate: z.string().min(1, {
    message: 'Deadline is required'
  }),
  description: z.string().min(1, {
    message: 'Description is required'
  })
})

export const UpdateUserInfo = z.object({
  email: z.string().min(1, {
    message: 'Email is required'
  }),
  phoneNumber: z.string().min(1, {
    message: 'Phone number is required'
  })
})
