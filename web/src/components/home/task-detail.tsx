import { CalendarIcon } from '@radix-ui/react-icons'

import { getTaskDetail } from '@/server/actions/task'

import { Separator } from '../ui/separator'

import NotifyOption from './notify-option'

type Props = {
  taskId: string
}

export default async function TaskDetail({ taskId }: Props) {
  const task = await getTaskDetail(taskId)

  if (!task) {
    return <div>Task not found</div>
  }

  return (
    <div>
      <h3 className="text-base font-medium">#{task.tag}</h3>
      <h5 className="font-medium">{task.title}</h5>

      <div className="my-2 flex items-center justify-start gap-1.5 text-[#64748B]">
        <CalendarIcon />

        <span className="text-sm">{task.dueDate}</span>
      </div>

      <p className="text-[#64748B]">{task.description}</p>

      <Separator className="my-4" />

      <NotifyOption notifyOption={task.notifyOption} notifyAt={task.notifyAt} />
    </div>
  )
}
