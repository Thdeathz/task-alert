'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { INotifyOption } from '@/@types/task'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { CreateTaskSchema } from '@/schema/task-schema'
import { createNewTask } from '@/server/actions/task'

import Loading from '../loading'
import { Button } from '../ui/button'
import { DialogFooter } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { Textarea } from '../ui/textarea'

import NotifyOptionContent from './notify-option-content'

export default function CreateTaskForm() {
  const router = useRouter()
  const [isLoading, startTransition] = useTransition()

  const [taskType, setTaskType] = useState<string>('DAILY')
  const [notifyOption, setNotifyOption] = useState<INotifyOption>({
    notifyOption: ['APP'],
    notifyAt: {
      unit: 'm',
      value: 30
    }
  })
  const form = useForm<z.infer<typeof CreateTaskSchema>>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      title: '',
      tag: '',
      dueDate: '',
      description: ''
    }
  })

  const onSubmit = (data: z.infer<typeof CreateTaskSchema>) => {
    if (!taskType) {
      toast.error('Please pick a task type')
    }

    startTransition(async () => {
      try {
        await createNewTask({
          ...data,
          ...notifyOption,
          dueDate: new Date(data.dueDate).toISOString(),
          type: taskType
        })

        toast.success('New task has been added')
        form.reset()
        router.refresh()
      } catch (error) {
        toast.error('Failed to add new task. Please try again later')
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="urgent task" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-2">
            <FormField
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Select a tag" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => setTaskType(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a task type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Task type</SelectLabel>
                          <SelectItem value="ONETIME">one time</SelectItem>
                          <SelectItem value="DAILY">daily</SelectItem>
                          <SelectItem value="WEEKLY">weekly</SelectItem>
                          <SelectItem value="MONTHLY">monthly</SelectItem>
                          <SelectItem value="YEARLY">yearly</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deadline</FormLabel>
                <FormControl>
                  <Input {...field} type="datetime-local" className="w-min" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="free input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator orientation="horizontal" className="mb-2 mt-4 w-full" />

        <NotifyOptionContent form={notifyOption} setForm={setNotifyOption} />

        <DialogFooter>
          <Button type="submit" className="mt-4">
            {isLoading ? <Loading /> : 'Add new'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
