import { CalendarIcon } from '@radix-ui/react-icons'
import { VariantProps, cva } from 'class-variance-authority'
import dynamic from 'next/dynamic'

import { ITask } from '@/@types/task'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

import TaskDetail from './task-detail'

const TaskIcon = dynamic(() => import('@/components/home/task-icon'), {
  ssr: false
})

const taskItemVariants = cva('', {
  variants: {
    danger: {
      true: 'bg-[#FFE3E8]',
      false: ''
    }
  },
  defaultVariants: {}
})

interface Props extends VariantProps<typeof taskItemVariants> {
  task: ITask
}

export default function TaskItem({ danger, task }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className={cn(
            taskItemVariants({ danger }),
            'relative cursor-pointer transition-all duration-150 hover:translate-y-[-5px] hover:shadow-md active:scale-95'
          )}
        >
          <TaskIcon className="absolute right-1 top-1" status={danger ? 'danger' : null} />

          <CardHeader className="mb-1.5 pb-0">
            <h3 className="font-medium">#{task.tag}</h3>
          </CardHeader>

          <CardContent className="">
            <p>{task.title}</p>

            <div className="flex items-center justify-start gap-1.5 text-[#64748B]">
              <CalendarIcon />

              <span className="text-sm">{task.dueDate}</span>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[28rem]">
        <TaskDetail taskId={task.id} />
      </DialogContent>
    </Dialog>
  )
}
