import { FiFilter } from 'react-icons/fi'

import { ITask } from '@/@types/task'

import { ScrollArea } from '../ui/scroll-area'

import CreateTaskModal from './create-task-modal'
import TaskItem from './task-item'

type Props = {
  tasks: ITask[]
}

export default function TasksList({ tasks }: Props) {
  return (
    <div className="relative min-h-content w-[23rem] pb-6">
      <div className="sticky top-0 z-10 flex justify-between bg-[#f1f4f9] pb-2 pt-6">
        <div className="flex justify-center gap-2 text-xl font-semibold">
          <h1>Tasks</h1>

          <CreateTaskModal />
        </div>

        <FiFilter className="text-2xl" />
      </div>

      {tasks.length === 0 ? (
        <div className="flex-center h-full w-full">
          <p className="text-lg font-medium opacity-30">No tasks available</p>
        </div>
      ) : (
        <ScrollArea>
          <div className="space-y-3 overflow-y-auto">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
