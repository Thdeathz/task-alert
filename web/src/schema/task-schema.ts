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
