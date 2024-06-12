'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { Button } from '../ui/button'
import { DialogFooter } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

export default function CreateTaskForm() {
  const [taskType, setTaskType] = useState<string>('DAILY')
  const form = useForm({
    defaultValues: {
      title: '',
      tag: '',
      type: '',
      dueDate: '',
      description: ''
    }
  })

  const onSubmit = async () => {
    // console.log(taskType, data)
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

        <DialogFooter>
          <Button type="submit" className="mt-4">
            {/* {isPending ? <Loading /> : 'Login'} */}
            Add new
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
